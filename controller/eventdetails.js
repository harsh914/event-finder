
var express = require('express');
var router = new express.Router();
var E = require('../model/event');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());



router.get(["/","/EventDetails"],function (request,response) {	
	var id = request.query.id;
	E.Event.getDetails(id, function(result){
		var html = '<div class="header" style="background-color:white;color:purple; height: 100px; width:50%;margin-left:5%; margin-top:5%">' +
       '<h1 style="float:left; margin-left: 5%; font-size:300%; margin-top:2%">Event name</h1>' +
		'</div><br><br><table class="table" style="margin-left:5%">' +
		'<thead class="thead-dark"><tr><th scope="col">Name</th><th scope="col">Username</th></tr></thead><tbody>';
		console.log(result.length);
		for(var i = 0; i<result.length; i++){
			html += eventDetailsHTML(result[i].user_name, result[i].username);
		}
		
		html+= '</tbody></table>';
		response.render('EventDetails', {content:html});
	});
	
	
});

router.get(["/logout","/EventDetails"],function (request,response) {	
	request.session.destroy();
	response.redirect('/Login');
	
});

function eventDetailsHTML(name, username){
	return "<tr><td>" + name + "</td><td>" + username + "</td></tr>";
}


module.exports = router;