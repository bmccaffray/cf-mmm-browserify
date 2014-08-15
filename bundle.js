(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (process){
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
}).call(this,require("JkpR2F"))
},{"./mean":2,"./median":3,"./mode":4,"JkpR2F":5}],2:[function(require,module,exports){
module.exports = function mean(arr){
	var mean = 0;
	for(var i = 0; i < arr.length; i++){
	    mean += arr[i];
	}
	mean /= arr.length;
	//console.log("Mean: " + mean);
	return mean;
}
},{}],3:[function(require,module,exports){
module.exports = function median(arr){
	if((arr.length % 2) == 0){
		var median = 0, medianMin = 0, medianMax = 0;
	    medianMin = arr.length/2;
	    medianMax = arr.length/2 + 1;
	    median = (arr[medianMin] + arr[medianMax])/2;
	} else {
	    median = arr[Math.floor(arr.length/2)];
	}
	//console.log("Median: " + median);
	return median;
}
},{}],4:[function(require,module,exports){
module.exports = function mode(arr){
	var mode = 0;
	var modeNum;
	var count = 0;
	var maxCount = 0;
	for(var i = 0; i < arr.length; i++){
	    if(arr[i] == (arr[i+1])){
	        count++;
	        if(count > maxCount){
	            modeNum = arr[i];
	            maxCount = count;
	        }
	    } else {
	        count = 0;
	    }
	}
	if(modeNum){
		mode = modeNum;
	} else {
		mode = 'no mode';
	}
	//console.log("Mode: " + mode);
	return mode;
}
},{}],5:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}]},{},[1]);