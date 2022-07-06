var express = require('express');
var router = new express.Router();
var U = require('../model/user');
var E = require('../model/event');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get(["/","/Home"],function (request,response) {	  	
	if(!request.session.user){
		return response.send("You have not logged in");
	}
	else{
		var html = "";
		var currentuser = new U.User("", request.session.user.username, "");
		currentuser.getMyEvents(function(result){
			if(result!=""){
					for( var i = 0; i< result.length; i++){
						html += generateEventHtml(result[i].event_id, result[i].event_name, result[i].event_type);
					}	
					response.render('Home', {content:html});
			}
			else{
				response.render('Home');
			}	
		});
		
	}
	
});


router.get(["/Delete","/Home"],function (request,response){
	var event_id = request.query.id;
	E.Event.deleteEvent(event_id, function(res){
		var currentuser = new U.User("", request.session.user.username, "");
		var html = "";
		console.log("Deleted");
		currentuser.getMyEvents(function(result){
			
			if(result != ""){
				for( var i = 0; i< result.length; i++){
					html += generateEventHtml(result[i].event_id, result[i].event_name, result[i].event_type);
				}	
				response.send(html);
			}
			else{
				response.send("");
			}	
		});
	});
	
	
});


router.post(["/Invite","/Home"],function (request,response){
	var event_id = request.body.id;
	var username = request.body.person;
	
	if(username == request.session.user.username)
		response.send("You cannot invite yourself to an event that you own");
	else{
		U.User.checkUser(username, function(result){
			if(result==0){
				E.Event.addInvited(event_id, username, function(result){
					if(result==0)
						response.send("Invitation sent");
					else
						response.send("This user has already been invited");
				});
				
			}
			else{
				response.send("Could not invite. This user does not have an account");
			}
		});
	}
});


router.get(["/logout","/Home"],function (request,response) {	
	request.session.destroy();
	response.redirect('/Login');
	
});



function generateEventHtml(id, title, type){
	
	var types = ["birthday", "meeting", "presentation", "wedding", "party"];
	var type_images = ["bday.png", "meet.jpg", "present.jpg", "wedding.png", "party.png" ];
	var index = 0;
	for(var i = 0; i<types.length; i++){
		if (types[i] == type){
			index = i;
			break;
		}
	}
	
	var html = '<div class="col-2 pics">';
	html += '<a id="d'+id+'" onclick="deleteEvent(this.id)" href="#"><img src="../static/images/trash.png" style="width: 15px; float:right; display:inline" /></a>'
	html += '<a id="e'+id+'" onclick="editEvent(this.id)" href="#"><img src="../static/images/edit.png" style="width: 15px; float:right; display:inline" /></a>'
	html += '<a id="ed'+id+'" onclick="viewEventDetails(this.id)" href="#" style="color:black">'
	html += '<img src="../static/images/' + type_images[index]+ '" style="height: 230px; width: 100%; max-width: 1000px;" alt="Avatar">'
	html += '<br /><div class="pinfo">' + title + '</div></a>';
    html += '<div class="invite">';
	html += '<a id="i'+ id+'" onclick="inviteUser(this.id)" href="#"> <button class="invitebtn">Invite</button></a></div></div>';
	
	return html;
}




module.exports = router;