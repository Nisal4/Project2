const Budget = require('../models/budget');
const Category = require('../models/category');
const User = require('../models/user');

module.exports = {
    index,
    new: newBudget,
    create,
    show,
}

async function show(req, res) {
    try {
        const budget = await Budget.findById(req.params.id)
        const category = await Category.find({budget: budget._id})
        res.render('budgets/show', {title: 'MoneyMinder', budget: budget, category})
    } catch(err) {
        console.log(err)
    }
}

async function create(req, res) {
    try {
        const budgetData = {
            ...req.body,
            user: req.user._id
        }
        const budget = await Budget.create(budgetData)
        res.redirect('/budgets')
    } catch(err) {
        res.render('budgets/new', {title: 'MoneyMinder', errorMsg: err.message})
    }
}

async function newBudget(req, res) {
    res.render('budgets/new', {title: 'MoneyMinder', errorMsg: ''})
}

async function index(req, res) {
    const loggedInUserId = req.user.id;
    const userBudgets = await Budget.find({user: loggedInUserId})
    res.render('budgets/index', {title: 'MoneyMinder', budgets: userBudgets })
}