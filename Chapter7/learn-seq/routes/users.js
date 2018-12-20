var express = require('express');
var router = express.Router();
var { User } = require('../models');

/* GET users listing. */
router.get('/', (req, res, next) => {
  // res.send('respond with a resource');
  User.findAll()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.err(err);
      next(err);
    })
});

//사용자 등록
//POST /users
router.post('/', (res, req, next) => {
  console.log(req.body);
  User.create({
    name: req.body.name,
    age: req.body.age,
    married: req.body.married,
  })
    .then((result) => {
      console.log(result);
      res.status(201).json(result);
    })
    .catch((err) => {
      conosle.log(err);
      next(err);
    });
});

module.exports = router;
