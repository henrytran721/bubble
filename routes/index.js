var express = require('express');
var router = express.Router();
var https = require('https');

/* GET home page. */
router.post('/', function(req, response, next) {
    var url = req.body.url;
    https.get(url, (res) => {
      var body = '';
      res.on('data', function(chunk) {
        body += chunk;
      })
      res.on('end', () => {
        var places = JSON.parse(body);
        response.send(places.results);
      })
    })
  });

  router.get('/', function(req, res, next) {
    res.send('hello');
  })

module.exports = router;