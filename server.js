import Express from 'express';

let app = Express();
let hostname = 'localhost';
let port = 8017;

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

app.listen(port, hostname, (req, res) => {
    console.log(`Running ${hostname}:${port}/`);
});
