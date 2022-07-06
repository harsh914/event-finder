var config = require('../config/settings')

class Event{
	constructor(title, date, type, creat){
		this.title=title;
		this.date = date;
		this.type = type;
		this.creator=creat;
	}
	
	
	saveEvent(callback){
		var ti = this.title;
		var d = this.date;
		var ty = this.type;
		var c = this.creator;
		var sql = "INSERT INTO EVENTS(event_name, event_type, event_date, creator) values (?,?,STR_TO_DATE(?, '%Y-%m-%d'),?)";
		
		
		config.con.query("SELECT * FROM Events where event_name = ? and creator = ? and event_date >= curdate()", [ti, c], function (err, result, fields) {
			if (err) throw err;
			if(result.length!=0)
				return callback(-1);
			else
				config.con.query(sql, [ti, ty, d, c], function (err, result) {
					if (err) throw err;
					else{
						console.log("1 record inserted");
						return callback(0);
					}
				});	
		  });
	}
	
	editEvent(id, callback){
		var ti = this.title;
		var d = this.date;
		var ty = this.type;
		var c = this.creator;
		var sql = "update events set event_name = ?, event_date = ?, event_type = ? where event_id = ?";
		
		
		config.con.query("SELECT * FROM Events where event_name = ? and creator = ? and event_date >= curdate()", [ti, c], function (err, result, fields) {
			if (err) throw err;
			if(result.length!=0)
				return callback(-1);
			else
				config.con.query(sql, [ti, d, ty, id], function (err, result) {
					if (err) throw err;
					else{
						console.log("1 record updated");
						return callback(0);
					}
				});	
		  });
	}
	
	static deleteEvent(id, callback){
		
		var sql = "DELETE from Events where event_id= ?";
		config.con.query(sql, [id], function (err, result) {
			if (err) throw err;
			else{
				console.log("1 record deleted");
				return callback(0);
			}
		});	
		
	}
	
	static addInvited(id, username, callback){
		config.con.query("SELECT * from event_invited where username= ? and event_id = ?", [username, id], function (err, result) {
			if (err) throw err;
			else if (result.length!=0){
				return callback(-1);
			}
			else{
				config.con.query("SELECT * from rsvpd_guests where username= ? and event_id = ?", [username, id], function (err, result) {
					if (err) throw err;
					else if (result.length!=0){
						return callback(-1);
					}
					else{
						var sql = "INSERT INTO event_invited values(?, ?)";
						config.con.query(sql, [username, id], function (err, res) {
							if (err) throw err;
							else{
								console.log("1 record inserted");
								return callback(0);
							}
						});	
					}
				});	
			}
		});	
	}
	
	
	static getDetails(id, callback){
		var sql="select user_name, users.username from rsvpd_guests join users on users.username = rsvpd_guests.username where event_id = ?";
		
		config.con.query(sql, [id], function (err, res) {
			if (err) throw err;
			else{
				return callback(res);
			}
		});	
		
	}
}


module.exports = {
	Event: Event
};