# Event-Management-System
A Web Application for managing events created using NodeJS, ExpressJS and MySQL 

In this application you can:
1) Sign up
2) Login
3) Create a new event 
4) Edit an existing event
5) Delete an existing event
6) Invite other users to your event
7) RSVP to an event
8) View all events to which you are invited
9) View all events to which you have RSVPd
10) View all users who have RSVPd to your event 

## How to run 

The following modules are required:
node
express
body-parser
ajax
mysql2 
session
express-session

Each module can be installed using npm. For example to install node, all you have to do is execute the following command \
 `npm install node`

Next, you have to change the username and password for your MySQL server in the file config>settings.js. \
You also need to create the database for use. The tables required are provided in the event_management.sql file. Create the database and tables before running the application. 

Finally, go to the project directory and run the following command: \
`node main.js`

Then open the browser and go to localhost:8888

The user interface is shown below:

![1](https://user-images.githubusercontent.com/68266703/121804351-54b46500-cc5f-11eb-85dd-9248b4def69c.png)


A walkthrough of the application:


https://user-images.githubusercontent.com/68266703/121805058-e07bc080-cc62-11eb-90ce-81d3ca948f6a.mp4



