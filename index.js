var express = require('express');
var engine = require('ejs-locals');
var app = express();
var url = require('url');

var http = require('http');
var fs = require('fs');

// use ejs-locals for all ejs templates:
app.engine('ejs', engine);

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});


var resumeGDriveFile = 'https://docs.google.com/document/d/10pXXcVl1twKhFq2XKe29PI5z-Z2fyglINwKgA9bKfEQ';
var resumeAsPdfUrl = 'https://docs.google.com/document/export?format=pdf&id=10pXXcVl1twKhFq2XKe29PI5z-Z2fyglINwKgA9bKfEQ';
var resumeAsHtmlUrl = 'https://docs.google.com/document/export?format=html&id=10pXXcVl1twKhFq2XKe29PI5z-Z2fyglINwKgA9bKfEQ';


app.get('/resume/pdf', function (request, response) {
    response.send("downloading resume as pdf");
    //response.download('/')
    //var file = fs.createWriteStream("file.jpg");
    //var pdfReq = http.get(resumeAsPdfUrl, function (pdfResp) {
    //    pdfResp.pipe(file);
    //});
});



app.get('/resume', function (request, response) {
    response.render('pages/resume');
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});