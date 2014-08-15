'use strict';

// var express = require('express');
// var http = require('http');
var mean = require('./mean');
var median = require('./median');
var mode = require('./mode');
// var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res){
    res.send('<form action="/output" method="post"><div><label>Input numbers: (ex. 3 5 7 2 7)</label><input type="text" name="numArray"/><br/></div><div><input type="submit" value="Calculate"/></div></form>');
});

app.post('/output', function(req, res) {
    var numberArray = req.body.numArray;
    numberArray = numberArray.toString().split(' ');

    for(var i = 0; i < numberArray.length; i++){
        numberArray[i] = parseInt(numberArray[i]);
    }

    numberArray.sort(function(a, b){return a-b});

    res.send('numbers: ' + numberArray + '<br/>' + 'mean: ' + mean(numberArray) + '<br/>' + 'median: ' + median(numberArray) + '<br/>' + 'mode: ' + mode(numberArray));
    console.log('numbers inputed: ' + numberArray);
    console.log('mean: ' + mean(numberArray));
    console.log('median: ' + median(numberArray));
    console.log('mode: ' + mode(numberArray));
});

var server = http.createServer(app);

app.set('port', process.env.PORT || 3000);

server.listen(app.get('port'), function() {
  console.log('server running on port ' + app.get('port'));
});