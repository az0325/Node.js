//Controller

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
/*
-> 다른 기능이나 확장 할 때 사용
app.use((req, res, next) => {
  express.json()(req, res, next);
});
*/
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//get요청 -> app.get()
// app.get('/', (res,req)=> {
//   res.send('Hello Express')
// });

// app.get('/users', (res, req) =>{
//   res.send('Hello users')
// });

//post요청 -> app.post()
//delete 요청 -> app.delete()

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// 500 error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  //req.app.get() -> 라우터(req)에서 app에서만 잠깐 저장하는 목적
  //req.get() -> 모든 요청이 공유

  // render the error page -> error.png
  res.status(err.status || 500);
  res.render('error');
  //res.json() -> 데이터를 JSON으로 주고 받을 때 사용
});

module.exports = app;