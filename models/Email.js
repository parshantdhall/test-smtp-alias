const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmailSchema = new Schema({
    realEmail: {
        type: String,
        required: true,
    },
    alias: {
        type: String,
        required: true,
        unique: true,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    services:[
        {type: mongoose.Types.ObjectId, ref: "ConnectedService"}
    ],
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Email', EmailSchema);
