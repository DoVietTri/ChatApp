import express from 'express';
import ConnectDB from './config/connectDB';
import configViewEngine from './config/viewEngine';

//Init app
let app = express();

//Connect to MongoDB
ConnectDB();

//Config view engine 
configViewEngine(app);

app.get('/', (req, res) => {
    res.render('main/master');
});

app.get('/login-register', (req, res) => {
    res.render('auth/loginRegister');
});

app.listen(process.env.APP_PORT, process.env.APP_HOSTNAME, (req, res) => {
    console.log(`Running ${process.env.APP_HOSTNAME}:${process.env.APP_PORT}/`);
});
