var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
    res.send('API is working properly');
    console.log(req.body);
  });


module.exports = router;