var express = require('express');
var router = express.Router();

/* GET users listing. */
/* 형태 : GET /users/ */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

module.exports = router;