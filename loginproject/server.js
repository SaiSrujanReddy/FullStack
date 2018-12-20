/**
 * This is the js file acts as server
 */

 //importing the required js file 
 var express=require('express');
 //var routes = require('./routes');
 var http = require('http');
 var path = require('path');
 var bodyParser = require('body-parser');
 var cookieParser = require('cookie-parser')

 //loading the chits 
 var chits=require('./routes/chits');

 var app=express();

//setting the view engine
app.set('port', process.env.PORT || 4300);
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');

//using middleware


//using body parsers
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 


// parse application/json
app.use(bodyParser.json());

//creating the middleware for cookieparser
app.use(cookieParser())

//setting the static path
app.use(express.static(path.join(__dirname,'public')));

app.get('/',chits.sendindex);
//registration url
app.get('/chits/registration',chits.sendregister);
app.post('/chits/registration/send',chits.register);
//login url
app.get('/chits/login',chits.sendlogin);
app.post('/chits/validateUser',chits.validateuser);

app.get('/checking/cookie',chits.checks);



//cheak the validation of registration ajax request
app.get('/new/check',chits.check);

http.createServer(app).listen(app.get('port'),function(){
    console.log('Express server listening on port ' + app.get('port'));
});