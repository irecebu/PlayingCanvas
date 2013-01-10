var fs = require('fs')
	, express = require('express')
	, stylus = require('stylus')
	, http = require('http')
	, render = require('./render');
	
var app = express();
app.configure(function () {
	app.set('views',__dirname);
	app.set('view engine', 'jade');
	app.use(stylus.middleware(
		{src : __dirname}
	));
	
	app.use(express.static(__dirname));
	app.use(express.bodyParser());
});

// app.use('images', __dirname);


app.get('/balls', function (req, res) {
	console.log('request for balls:');
	res.render('ball', {title: 'title', scripts : ['jquery-latest.min.js' , 'balls.js', 'Circle.js']});
});

app.get('/wheel', function (req, res) {
	console.log('request for wheel');
	res.render('wheel', {title: 'title', scripts:['jquery-latest.min.js','wheel.js', 'Circle.js', 'Line.js']});
});
app.get('/test', function (req, res) {
	console.log('request for test');
	res.render('test', {title : 'title', scripts:['jquery-latest.min.js', 'test.js']});
});
app.get('/shooting', function (req, res) {
	console.log('request for shoot');
	res.render('shooting', {title : 'title', scripts:['jquery-latest.min.js', 'shooting.js', 'Line.js']});
});
app.get('/render', function (req, res) {
	console.log('request for shoot');
	res.render('render', {title : 'title', scripts :[]});
});
app.post('/render', function (req, res) {
	var json = req.body['json'];
	render.render(json);
	console.log('RENDER-POST received');
});
console.log('server listening to 8081');
app.listen(8081);
