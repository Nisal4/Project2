const express = require('express');
const router = express.Router();
const budgetsCtrl = require('../controllers/budgets');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// GET /budgets
router.get('/budgets', ensureLoggedIn, budgetsCtrl.index);

// GET /budgets/new
router.get('/budgets/new', ensureLoggedIn, budgetsCtrl.new);

// POST /budgets
router.post('/budgets', ensureLoggedIn, budgetsCtrl.create);

// GET /budgets/:id
router.get('/budgets/:id', ensureLoggedIn, budgetsCtrl.show)

module.exports = router;