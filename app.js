var createError = require('http-errors');
var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var indexRouter = require('./routes/index');
var restRouter = require('./api');

var app = express();

//Configurations
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({
  extended: false
}));
app.use("/static", express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views', 'layouts'));
app.engine('hbs', exphbs.engine({
  partialsDir: path.join(__dirname, 'views', 'layouts'),
  defaultLayout:  path.join(__dirname, 'views', 'layouts', 'main.hbs'),
  extname: 'hbs',
  //new configuration parameter
  partialsDir: path.join(__dirname, 'views', 'partials')
}));

//Routes
app.use('/', indexRouter);
app.use('/api', restRouter);

// Error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Server
app.listen(3000, () => {
  console.log("Server running on port 3000");
})

module.exports = app;