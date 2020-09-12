import express from 'express';
import ConnectDB from './config/connectDB';
import configViewEngine from './config/viewEngine';
import initRoutes from './routes/web';
import bodyParser from 'body-parser';
import connectFlash from 'connect-flash';
import session from './config/session';
import passport from 'passport';
import http from 'http';
import socketio from 'socket.io';
import initSockets from './sockets/index';
import cookieParser from 'cookie-parser';
import configSocketIo from './config/socketio';
//Init app
let app = express();

//init server with socket.io & express app
let server = http.createServer(app);
let io = socketio(server);

//Connect to MongoDB
ConnectDB();

//Config session
session.config(app);

//Config view engine 
configViewEngine(app);

//Enable post data for request
app.use(bodyParser.urlencoded({extended: true}));

//Enable flash message
app.use(connectFlash());

//use cookie parser
app.use(cookieParser());

//confing passport js
app.use(passport.initialize());
app.use(passport.session());

//Define routes web
initRoutes(app);

//Config for socket.io
configSocketIo(io, cookieParser, session.sessionStore);

//init all sockets
initSockets(io);

server.listen(process.env.APP_PORT, process.env.APP_HOSTNAME, (req, res) => {
    console.log(`Running ${process.env.APP_HOSTNAME}:${process.env.APP_PORT}/`);
});


// import pem from 'pem';
// import https from 'https';

// pem.createCertificate({ days: 1, selfSigned: true }, function (err, keys) {
//     if (err) {
//       throw err
//     }

//     //Init app
//     let app = express();

//     //Connect to MongoDB
//     ConnectDB();

//     //Config session 
//     configSession(app);

//     //Config view engine 
//     configViewEngine(app);

//     //Enable post data for request
//     app.use(bodyParser.urlencoded({extended: true}));

//     //Enable flash message
//     app.use(connectFlash());

//     //confing passport js
//     app.use(passport.initialize());
//     app.use(passport.session());

//     //Define routes web
//     initRoutes(app);
   
//     https.createServer({ key: keys.serviceKey, cert: keys.certificate }, app).listen(process.env.APP_PORT, process.env.APP_HOSTNAME, (req, res) => {
//         console.log(`Running ${process.env.APP_HOSTNAME}:${process.env.APP_PORT}/`);
//     });
// });

