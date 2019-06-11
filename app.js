var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var nunjucks = require( 'nunjucks' );
var dateFilter = require( 'nunjucks-date-filter-local' );
dateFilter.setDefaultFormat( 'DD.MM.YYYY' )

var index = require('./routes/index');

var app = express();

// view engine setup
// Nunjucks setup
var env = nunjucks.configure( 'views', {
  autoescape: true,
  express: app,
  watch: true,
  tags: {
      blockStart: '<@',
      blockEnd: '@>',
      variableStart: '{{',
      variableEnd: '}}',
      commentStart: '{!--',
      commentEnd: '--!}'
    }
}); 
app.set( 'view engine', 'nunjucks' );
env.addFilter( 'date', dateFilter );

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use( logger('dev') );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: false }) );
app.use( cookieParser() );
app.use( express.static( path.join( __dirname, 'public' ) ) );

app.use( '/', index );

const PORT = 5000;

app.listen( PORT, () => {
  console.log( `server running on port ${PORT}` )
});

// catch 404 and forward to error handler
app.use( function( req, res, next ) 
{
  var err = new Error( 'Not Found' );
  err.status = 404;
  next(err);
});

// error handler
app.use( function( err, req, res, next ) 
{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get( 'env' ) === 'development' ? err : {};

  // render the error page
  res.status( err.status || 500 );
  res.render( 'error' );
});

module.exports = app;
