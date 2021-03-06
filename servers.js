// Socket.io server that will service both node
// and react clients
// Req:
// - socket.io
// - socket.io-redis
// - farmhash

// entrypoint for our cluster which will make workers
// and the workers will do the Socket.io handling
//See https://github.com/elad/node-cluster-socket.io

const express = require('express');
const cluster = require('cluster');
const net = require('net');
const socketio = require('socket.io');
const helmet = require('helmet')
const socketMain = require('./socketMain');
const port = process.env.PORT || 8181;
// Brew breaks for me more than it solves a problem, so I 
// installed redis from https://redis.io/topics/quickstart
// have to actually run redis via: $ redis-server (go to location of the binary)
// check to see if it's running -- redis-cli monitor
const io_redis = require('socket.io-redis');
const redis = require('redis');
const hash = require('string-hash-64');

if (cluster.isMaster) {
    // This stores our workers. We need to keep them to be able to reference
    // them based on source IP address. It's also useful for auto-restart,
    // for example.
    setTimeout(() => {

        let workers = [];

        // Helper function for spawning worker at index 'i'.
        let spawn = function (i) {
            workers[i] = cluster.fork();

            // Optional: Restart worker on exit
            workers[i].on('exit', function (code, signal) {
                spawn(i);
            });
        };

        console.log(process.env.WEB_CONCURRENCY)
        // Spawn workers.
        for (var i = 0; i < (process.env.WEB_CONCURRENCY || 1); i++) {
            spawn(i);
        }


        // Helper function for getting a worker index based on IP address.
        // This is a hot path so it should be really fast. The way it works
        // is by converting the IP address to a number by removing non numeric
        // characters, then compressing it to the number of slots we have.
        //
        // Compared against "real" hashing (from the sticky-session code) and
        // "real" IP number conversion, this function is on par in terms of
        // worker index distribution only much faster.
        const worker_index = function (ip, len) {
            return hash(ip) % len; // Farmhash is the fastest and works with IPv6, too
        };


        // in this case, we are going to start up a tcp connection via the net
        // module INSTEAD OF the http module. Express will use http, but we need
        // an independent tcp port open for cluster to work. This is the port that 
        // will face the internet
        const server = net.createServer({ pauseOnConnect: true }, (connection) => {
            // We received a connection and need to pass it to the appropriate
            // worker. Get the worker for this connection's source IP and pass
            // it the connection.
            let worker = workers[worker_index(connection.remoteAddress, process.env.WEB_CONCURRENCY || 1)];
            worker.send('sticky-session:connection', connection);
        });
        server.listen(port);
        console.log(`Master listening on port ${port}`);
    }, 0)
} else {
    // Note we don't use a port here because the master listens on it for us.
    let app = express();
    app.use(express.static(__dirname + '/build'));
    app.use(helmet());

    // Don't expose our internal server to the outside world.
    const server = app.listen(0);
    const io = socketio(server, {
        cors: {
            origin: '*',
        }
    });

    // Tell Socket.IO to use the redis adapter. By default, the redis
    // server is assumed to be on localhost:6379. You don't have to
    // specify them explicitly unless you want to change them.
    // redis-cli monitor
    const pubClient = redis.createClient(process.env.REDIS_URL, {
        tls: {
            rejectUnauthorized: false
        }
    });
    const subClient = pubClient.duplicate();
    io.adapter(io_redis({ pubClient, subClient }));

    // Here you might use Socket.IO middleware for authorization etc.
    // on connection, send the socket over to our module with socket stuff
    io.on('connection', function (socket) {
        socketMain(io, socket);
        console.log(`connected to worker: ${cluster.worker.id}`);
    });


    // Listen to messages sent from the master. Ignore everything else.
    process.on('message', function (message, connection) {
        if (message !== 'sticky-session:connection') {
            return;
        }

        // Emulate a connection event on the server by emitting the
        // event with the connection the master sent us.
        server.emit('connection', connection);

        connection.resume();
    });
}

