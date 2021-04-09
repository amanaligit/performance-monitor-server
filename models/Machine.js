const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Machine = new Schema({
    macA: String,
    osType: String,
    upTime: Number,
    freeMem: Number,
    totalMem: Number,
    usedMem: Number,
    memUsage: Number,
    cpuModel: String,
    numCores: Number,
    cpuLoad: Number,
    cpuSpeed: Number
});

module.exports = mongoose.model('Machine', Machine);