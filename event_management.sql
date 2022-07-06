create database event_management;
use event_management;

create table users(
	user_name VARCHAR(50), 
    username VARCHAR(50) primary key, 
    user_password VARCHAR(50)
);

create table events(
	event_id int primary key auto_increment,
    event_name VARCHAR(50),
    event_type VARCHAR(10),
    event_date date,
    creator VARCHAR(50),
    foreign key (creator) references users(username) 
);


create table rsvpd_guests(
    username VARCHAR(50),
    event_id int,
    primary key (event_id, username),
    foreign key(event_id) references Events(event_id) on delete cascade, 
    foreign key(username) references Users(username) on delete cascade
);

create table event_invited(
    username VARCHAR(50),
    event_id int,
    primary key (event_id, username),
    foreign key(event_id) references Events(event_id) on delete cascade, 
    foreign key(username) references Users(username) on delete cascade
);