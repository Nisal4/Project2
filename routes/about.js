const express = require('express');
const router = express.Router();


// GET About Page
router.get('/about', function(req, res) {
    res.render('about', { title: 'MoneyMinder' });
});

module.exports = router;