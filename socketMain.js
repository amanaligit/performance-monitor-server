const mongoose = require('mongoose');
// require('dotenv').config();
const uri = process.env.DATABASE_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const Machine = require("./models/Machine");


function socketMain(io, socket) {
    let macA;
    console.log("Socket connected with ID: ", socket.id);

    socket.on('clientAuth', key => {
        if (key === 'alsdjfhaklsdjfh237845239q') {
            socket.join('clients');
        }
        else if (key === 'askgjhasdfil935871893') {
            socket.join('ui');
            Machine.find({}, (err, docs) => {
                docs.forEach(m => {
                    m.isActive = false;
                    io.to('ui').emit('data', m);
                })
            })
        }
        else {
            //an invalid client has joined. GoodBye
            socket.disconnect(true);
        }
    })

    socket.on('disconnect', () => {
        Machine.find({ macA: macA }, (err, docs) => {
            if (docs.length) {
                docs[0].isActive = false;
                io.to('ui').emit('data', docs[0]);
            }
        })
    })

    //if machine is new, add it to the database
    socket.on('initPerfData', async data => {
        macA = data.macA
        const mongooseResponse = await checkAndAdd(data);
        console.log(mongooseResponse);
    })


    socket.on('perfData', data => {
        io.to('ui').emit('data', data);
    })

}

function checkAndAdd(data) {
    return new Promise((resolve, reject) => {
        Machine.findOne({ macA: data.macA }, (err, doc) => {
            if (err) {
                throw err;
                reject(err);
            }
            else if (doc === null) {
                //the record of this machine is not in the db, so add it!;
                let newMachine = new Machine(data);
                newMachine.save();
                resolve('added');
            }
            else {
                resolve('found');
            }
        })
    })
}

module.exports = socketMain;