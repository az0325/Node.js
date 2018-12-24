var express = require('express');
var User = require('../schemas/user');

var router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await User.find();
    res.render('mongoose', { users });
  } catch (error) {
    console.error(err);
    next(err);
  }
});

module.exports = router;