var express = require('express');
var router = express.Router();
var passport = require('passport');
var request = require('request');
/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(CASTER_LIST);
    res.render('index', {caster_list: CASTER_LIST,session: req.session.passport});
});
router.get('/json', function(req, res, next) {
    res.json(CASTER_LIST);
});

module.exports = router;