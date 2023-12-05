const Category = require('../models/category');
const Budget = require('../models/budget')

module.exports = {
    index,
    new: newCategory,
    create,
    delete: deleteCategory,
    edit,
    update,
};


async function update(req, res) {
    try {
        const budgetId = req.params.id
        const budget = await Budget.findById(budgetId)
        const category = await Category.updateOne({_id: req.params.catId}, req.body);
        res.redirect(`/budgets/${budgetId}/categories`);
    } catch (err) {
        console.log(err)
    }
}


async function edit(req, res) {
    try {
        const budgetId = req.params.id
        const budget = await Budget.findById(budgetId)
        const category = await Category.findById(req.params.catId);
        res.render('categories/edit', {title: 'MoneyMinder', category, budgetId})
    } catch (err) {
        console.log(err)
    }
}


async function deleteCategory(req, res) {
    try {
        const budgetId = req.params.id
        const budget = await Budget.findById(budgetId)
        const category = await Category.findByIdAndDelete(req.params.catId);
        res.redirect(`/budgets/${budgetId}/categories`)
    } catch(err) {
        console.log(err)
    }
}


async function create(req, res) {
    const budgetId = req.params.id
    req.body.budget = budgetId
    try{
        const category = await Category.create(req.body)
        res.redirect(`/budgets/${budgetId}/categories`)
    } catch (err) {
        res.render('categories/new', {title: 'MoneyMinder', errorMsg: err.message, budgetId})
    }
}


async function newCategory(req, res) {
    const budgetId = req.params.id
    const budget = await Budget.findById(budgetId)
    res.render('categories/new', {title: 'MoneyMinder', errorMsg: '', budgetId: budgetId, budget: budget})
}


async function index(req, res) {
    const budgetId = req.params.id
    const budget = await Budget.findById(budgetId)
    const categories = await Category.find({budget: budgetId}).sort({date: 1});
    res.render('categories/index', {title: 'MoneyMinder', categories, budgetId: budgetId})
}