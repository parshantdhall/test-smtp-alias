const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const serviceSchema = new Schema({
    name: String,
    email: {type: mongoose.Types.ObjectId, ref: "Email"},
    isActive: {
        type: Boolean,
        default: true,
    },
    connectedDate: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('ConnectedService', serviceSchema);
