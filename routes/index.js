var express = require('express');
var router = express.Router();
var sqliteTool = require('../util/sqlite-tool');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/cornJobs', async function(req, res, next) {
  var data = await sqliteTool.selectData('cornJobs');
  console.log('data',data)
  res.json(data);
});


module.exports = router;
