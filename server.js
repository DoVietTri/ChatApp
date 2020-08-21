var Express = require('express');
var app = Express();
var hostname = 'localhost';
var port = 8017;

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

app.listen(port, hostname, (req, res) => {
    console.log(`Running ${hostname}:${port}/`);
});
