const mongoose = require('mongoose');
const {Schema} = mongoose;

const noteSchema = new Schema({
    title:{type: String, required: true},
    description:{type: String, required: true},
    tag:{type:String, default:"general"},
    date:{type: Date, default:Date.now},
    user:{type: mongoose.Schema.Types.ObjectId, ref: 'user'}
})
const note = mongoose.model('note', noteSchema);
module.exports = note;