const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FolioSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })


module.exports = mongoose.model("Folio", FolioSchema);