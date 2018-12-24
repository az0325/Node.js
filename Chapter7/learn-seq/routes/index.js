var express = require('express');
var router = express.Router();
const { User } = require('../models')

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.render('sequelize', { users });
  } catch (error) {
    console.log(err);
    next(err);
  }
});

module.exports = router;