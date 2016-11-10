var express = require('express');
var app = express();
var redis = require('redis');
var os = require("os");
var getenv = require('getenv');

console.log('myapp : start on ' + os.hostname());

//Connect on redis
var client = redis.createClient(getenv('REDIS_PORT'),getenv('REDIS_HOST'));

//event connect redis success
client.on('connect', function(){
    console.log('myapp :connected on redis server');
});

//event connect redis error
client.on("error", function (err) {
    console.log("myapp : connexion au serveur Redis impossible. DEBUG: " + err);
});

app.get('/', function (req, res) {
    res.writeHeader(200, {"Content-Type": "text/html"});
    res.write('Bonjour, je suis ' + os.hostname());
    res.end();
});

// define redirection / to index.html
//app.get('/', function (req, res) {
//    res.redirect('/index.html');
//});

app.use(express.static('htdocs'));

var server = app.listen(80, function () {
    console.log('myapp : running on port 80');
});
