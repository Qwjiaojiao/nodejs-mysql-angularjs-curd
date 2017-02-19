var express = require('express');
var url = require('url');

var $ = require('jquery');
var router = express.Router();
var db=require('../database/db.properties');
/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Express hello',name:'李浩然' });
});

router.get('/registerinit', function(req, res, next) {
  res.render('register', { title: 'Express hello',name:'李浩然' });
});
router.post('/register', function(req, res, next) {
   client = db.connect();
  var user = {
         username: req.body.username,
         password: req.body.password,
         title:'lihaoran'
     }
var userAddSql = 'INSERT INTO user(username,password) VALUES(?,?)';
  db._insert(client,userAddSql,user.username,user.password,function(err){
  res.render('index', { title: 'Express hello',name:'李浩然' });
});
});

router.get('/list', function(req, res, next) {
 client = db.connect();
var querysql = 'select id, username,password from user ';
 db._select(client,querysql,function(results){
   var jquerysql = JSON.stringify(results);
console.info(results);
  res.render('success',
  { title: 'Express hello',queryresult:results});
})

});
router.get('/logininit', function(req, res, next) {
  res.render('login', { title: 'Express hello',name:'李浩然' });
});

router.post('/login', function(req, res, next) {
var user = {
         username: req.body.username,
         password: req.body.password,
         title:'lihaoran'
     }
  if('lihaoran'==user.username){
      console.info('login success');
       res.render('index', { title: 'Express hello',name:'李浩然' });
  }else{
     console.info('login fail');
    res.render('index', { title: 'Express hello',name:'李浩然' });
}
});

router.get('/delete', function(req, res, next) {

 client = db.connect();
 // 解析 url 参数
    var params = url.parse(req.url, true).query;
    var uid = params.id;
  db._delete(client,'delete from user where id = '+uid);
  res.render('index', { title: 'Express hello',name:'李浩然' });

});

router.get('/ajax', function(req, res, next) {
 client = db.connect();
var querysql = 'select id, username,password from user ';
 db._select(client,querysql,function(results){
   var jquerysql = JSON.stringify(results);
console.info(results);
  res.send(results);

})

});

module.exports = router;
