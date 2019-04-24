const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        match: /\S+@\S+\.\S+/        
    },
    contact: {
        type: Number,
        required: true        
    }
});

module.exports = mongoose.model('model', StudentSchema, 'users');

