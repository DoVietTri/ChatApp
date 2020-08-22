import express from 'express';
import ConnectDB from './config/connectDB';
import configViewEngine from './config/viewEngine';
import initRoutes from './routes/web';

//Init app
let app = express();

//Connect to MongoDB
ConnectDB();

//Config view engine 
configViewEngine(app);

//Define routes web
initRoutes(app);

app.listen(process.env.APP_PORT, process.env.APP_HOSTNAME, (req, res) => {
    console.log(`Running ${process.env.APP_HOSTNAME}:${process.env.APP_PORT}/`);
});
