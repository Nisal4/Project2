const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        enum: ['Income', 'Rent/Mortgage', 'Utilities', 'Groceries', 'Eating Out/Restaurants', 
        'Transportation/Gas', 'Phone', 'Streaming Services', 'Insurance', 'Student Loan', 
        'Car Loan', 'Credit Card', 'Memberships', 'Other', 'Savings']
    },
    date: {
        type: Date,
    },
    budgetAmt: {
        type: Number,
        required: true,
    },
    actualAmt: {
        type: Number,
        required: true,
    },
    note: {
        type: String,
        required: true
    }, 
    // Reference Category Schema
    budget: {
        type: Schema.Types.ObjectId,
        ref: 'Budget',
    },
    
});

module.exports = mongoose.model('Category', categorySchema)