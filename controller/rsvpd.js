var express = require('express');
var U = require("../model/user");
var router = new express.Router();

router.get(["/","/RSVPd"],function (request,response) {	  	
	if(!request.session.user){
		return response.send("You have not logged in");
	}
	else{
		var html = "";
		var currentuser = new U.User("", request.session.user.username, "");
		currentuser.getRSVPdEvents(function(result){
			if(result!=""){
					for( var i = 0; i< result.length; i++){
						html += generateEventHtml(result[i].event_id, result[i].event_name, result[i].year, result[i].month, result[i].day, result[i].event_type, result[i].creator);
					}	
					response.render('RSVPd', {content:html});
			}
			else{
				response.render('RSVPd');
			}	
		});
		
	}
	
});

router.get(["/logout", "/RSVPd"],function (request,response) {	
	request.session.destroy();
	response.redirect('/Login');
	
});


function generateEventHtml(id, title, year, month, day, type, creator){
	
	var types = ["birthday", "meeting", "presentation", "wedding", "party"];
	var type_images = ["bday.png", "meet.jpg", "present.jpg", "wedding.png", "party.png" ];
	var index = 0;
	for(var i = 0; i<types.length; i++){
		if (types[i] == type){
			index = i;
			break;
		}
	}
	
	var html = '<div class="col-2 pics" style="height:340px">';
	
	html += '<img src="../static/images/' + type_images[index]+ '" style="height: 230px; width: 100%; max-width: 1000px;" alt="Avatar">'
	html += '<br /><div class="pinfo">' + title + '<br> Invited by ' + creator + '<br> Dated: ' + day + '/' + month + '/' + year +'</div>';
    html += '</div>';
	
	return html;
}



module.exports = router;