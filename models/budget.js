const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const budgetSchema = new Schema({
    month: {
        type: String,
        required: true,
        enum: ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December']
    },
    year: {
        type: String,
        required: true,
        enum: ['2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030']
    },
    // Reference User Schema
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Budget', budgetSchema)