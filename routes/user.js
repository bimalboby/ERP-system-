
var express = require('express');
const { faqLoader } = require('../helpers/admin-helpers');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
 console.log("USER");
});


module.exports = router;
