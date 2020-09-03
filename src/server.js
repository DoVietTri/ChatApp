import express from 'express';
import ConnectDB from './config/connectDB';
import configViewEngine from './config/viewEngine';
import initRoutes from './routes/web';
import bodyParser from 'body-parser';
import connectFlash from 'connect-flash';
import configSession from './config/session';
import passport from 'passport';

//Init app
let app = express();

//Connect to MongoDB
ConnectDB();

//Config session
configSession(app);

//Config view engine 
configViewEngine(app);

//Enable post data for request
app.use(bodyParser.urlencoded({extended: true}));

//Enable flash message
app.use(connectFlash());

//confing passport js
app.use(passport.initialize());
app.use(passport.session());

//Define routes web
initRoutes(app);

app.listen(process.env.APP_PORT, process.env.APP_HOSTNAME, (req, res) => {
    console.log(`Running ${process.env.APP_HOSTNAME}:${process.env.APP_PORT}/`);
});
