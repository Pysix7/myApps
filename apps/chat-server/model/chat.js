const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const chatSchema = new Schema({
    roomId: {
        type: String,
        required: true,
        unique: true
    },
    participants: [String],
}, { timestamps: true });

module.exports = mongoose.model("Chat", chatSchema);
