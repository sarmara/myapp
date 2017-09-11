var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


//-----------------------------------------
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/mongotest');

/*
// 定义数据模型
// model的第一个参数是集合的名称，
// 第二个参数是集合中的字段名称及类型
var Cat = mongoose.model('cats', { name: String });
var kitty = new Cat({ name: 'hellokitty' });

// 向数据库中保存，添加数据(通过个体，单个实例)
kitty.save(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('保存成功');
  }
});
*/
var Schema = mongoose.Schema;
var CatSchema = new Schema({
  name: String
})
var Cat = mongoose.model('cats', CatSchema);

// 添加功能（通过数据模型添加）
/*
Cat.insertMany(
  [{ name: "cat1" }, { name: "cat2" }],
  function (err, docs) {
    if(err){
      console.log(err);
      return;
    }
    console.log(docs)
  }
)*/

// 修改
/*
Cat.update({name:'小猫'}, {$set: {name: '小猫2'}}, function(err, raw){
  if(err){
    console.log(err);
    return;
  }

  console.log(raw);
})
*/

// 删除
/*
Cat.remove({name:'小猫2'}, function(err){
  if(err){
    console.log(err);
    return;
  }
})
*/

// 添加（通过数据模型添加）
// Cat.create([{ name: "aaaa" }], function (err, result) {
//   console.log(result);
// })

// 查询功能
// find()返回数组
// findOne()返回是对象
Cat.findOne({ name: /小猫/ }, function (err, result) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(result);
})

Cat.find


/**
 * 保存，save(), insertMany(), create()
 * 查询，find(),findOne(),findById()
 * 修改，update, findOneAndUpdate(), findByIdAndUpdate()
 * 删除，remove(), findOneAndRemove(), findByIdAndRemove()
 */





//-----------------------------------------

var index = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs-mate'));
app.locals._layoutFile = 'layout.ejs';

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  console.log('a')
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  console.log('b')
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {
    status: err.status,
    message: "程序出错，请联系管理员ddy_dhj@163.com"
  };

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: "错误页" });
});

/**
 * 如果客户端出错，一定会进入console.log('b')
 * 如果是服务器端出错，console.log('a')不一定能进来
 */

module.exports = app;
