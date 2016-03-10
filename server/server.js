var morgan = require('morgan');
var body_parser = require('body-parser');
var express = require('express');
var app = express();

app.use(morgan('dev'));
app.use(body_parser.urlencoded({extended : true}));
app.use(body_parser.json());
app.use(express.static('client'));

require('./controllers/routes.js')(app);

app.listen(process.env.PORT || 8080, function() {
  console.log('Express server listening on port 8080');
});

module.exports = app;
