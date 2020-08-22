import express from 'express';
import ConnectDB from './config/connectDB';
import ContactModel from './models/contact.model';

let app = express();

//Connect to MongoDB
ConnectDB();

app.get('/test-database', async (req, res) => {
    try {
        let item = {
            userId: '27091999',
            contactId: 'ABC121'
        };
        let contact = await ContactModel.createNew(item);
        res.send(contact);
    } catch (err) {
        console.log(err);
    }
    
});

app.listen(process.env.APP_PORT, process.env.APP_HOSTNAME, (req, res) => {
    console.log(`Running ${process.env.APP_HOSTNAME}:${process.env.APP_PORT}/`);
});
