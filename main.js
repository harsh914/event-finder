var express = require('express');
var app = new express();
var http = require('http').Server(app);
var session = require('express-session')

app.engine('html',require('./controller/templateengine'));
app.set('views','./view');
app.set('view engine','html');

app.use(session({secret:"827897wkdkh", resave:false, saveUninitialized:true}));

app.use('/', require('./controller/login'));
app.use('/SignUp', require('./controller/signup'));
app.use('/Home', require('./controller/home'));
app.use('/CreateEvent', require('./controller/create'));
app.use('/InvitedEvents', require('./controller/invited'));
app.use('/RSVPd', require('./controller/rsvpd'));
app.use('/EventDetails', require('./controller/eventdetails'));
app.use('/Edit', require('./controller/edit'));
app.use('/static', express.static('static'));

http.listen(8888, function() {
   console.log('listening on *:8888');
});