var fs = require('fs')
	, express = require('express')
	, stylus = require('stylus')
	, http = require('http');
	
var app = express();

app.set('views',__dirname);
app.set('view engine', 'jade');
app.use(stylus.middleware(
	{src : __dirname}
));
app.use(express.static(__dirname));
app.use(express.bodyParser());


app.get('/balls', function (req, res) {
	console.log('request for balls:');
	res.render('ball',{title: 'title', scripts : ['jquery-latest.min.js' , 'canvas.js', 'Circle.js']});
});

console.log('server listening to 8081');
app.listen(8081);
