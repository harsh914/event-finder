var express = require('express');
var router = new express.Router();
var E = require('../model/event');
var event_id;
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get(["/","/Edit"],function (request,response) {	  	
	if(!request.session.user){
		return response.send("You have not logged in");
	}
	else{
		event_id = request.query.id;
		response.render('Edit');
	}
	
});

router.post(["/update","/Edit"],function (request,response) {
	
	var newevent = new E.Event(request.body.name, request.body.date, request.body.type, request.session.user.username);
	var ret = newevent.editEvent(event_id, function(result){
		if(result == 0){
			response.redirect('/Home');
		}
		else{
			var html = "<h3 style=\"text-align:center; color:white\">Event with the same title already exists</h3>";
			response.render('create', {content: html} );
		}
	});
	
});


module.exports = router;