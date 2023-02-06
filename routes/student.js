
var express = require('express');
const { faqLoader } = require('../helpers/principal-helpers');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
 console.log("student");
});


module.exports = router;
