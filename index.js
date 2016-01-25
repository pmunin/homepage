var express = require('express');
var engine = require('ejs-locals');
var app = express();
var url = require('url');

var http = require('http');
var https = require('https');
var fs = require('fs');

// use ejs-locals for all ejs templates:
app.engine('ejs', engine);

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');



//Shared link = https://drive.google.com/open?id=0Bxp4SNNLrAEEQy1hVXdha0E1SUU
var resumeGDriveFile = 'https://docs.google.com/document/d/10pXXcVl1twKhFq2XKe29PI5z-Z2fyglINwKgA9bKfEQ';
var resumeAsPdfUrl = 'https://docs.google.com/document/export?format=pdf&id=10pXXcVl1twKhFq2XKe29PI5z-Z2fyglINwKgA9bKfEQ';
var resumeAsHtmlUrl = 'https://docs.google.com/document/export?format=html&id=10pXXcVl1twKhFq2XKe29PI5z-Z2fyglINwKgA9bKfEQ';


//var resumeAsPdfUrl = 'https://docs.google.com/document/export?format=pdf&id=0Bxp4SNNLrAEEQy1hVXdha0E1SUU';


app.get(['/resume/pdf','/resume/DownloadPdf'], function (request, response) {
    var pdfReq = https.get(resumeAsPdfUrl, function (pdfResp) {
        response.writeHead(200, 
        {
            'Content-Type': 'application/pdf', 
            'Content-Disposition': 'filename="SrDeveloperResume.pdf"'
            //'Content-Disposition': 'attachment;filename = "SrDeveloperResume.pdf"'
        });
        pdfResp.pipe(response);
    });
});
app.get(['/resume/word','/resume/DownloadWord'], function (request, response) {
    var pdfReq = https.get('https://docs.google.com/document/export?format=docx&id=10pXXcVl1twKhFq2XKe29PI5z-Z2fyglINwKgA9bKfEQ', function (pdfResp) {
        response.writeHead(200, 
        {
            'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
            'Content-Disposition': 'filename="SrDeveloperResume.docx"'
            //'Content-Disposition': 'attachment;filename = "SrDeveloperResume.pdf"'
        });
        pdfResp.pipe(response);
    });
});
app.get(['/resume/rtf'], function (request, response) {
    var pdfReq = https.get('https://docs.google.com/document/export?format=rtf&id=10pXXcVl1twKhFq2XKe29PI5z-Z2fyglINwKgA9bKfEQ', function (pdfResp) {
        response.writeHead(200, 
        {
            'Content-Type': 'application/rtf', 
            'Content-Disposition': 'filename="SrDeveloperResume.rtf"'
            //'Content-Disposition': 'attachment;filename = "SrDeveloperResume.rtf"'
        });
        pdfResp.pipe(response);
    });
});
app.get(['/resume/printable'], function (request, response) {
    var pdfReq = https.get('https://docs.google.com/document/export?format=html&id=10pXXcVl1twKhFq2XKe29PI5z-Z2fyglINwKgA9bKfEQ', function (pdfResp) {
        response.writeHead(200,
        {
            'Content-Type': 'text/html', 
            'Content-Disposition': 'filename="SrDeveloperResume.html"'
            //'Content-Disposition': 'attachment;filename = "SrDeveloperResume.pdf"'
        });
        pdfResp.pipe(response);
    });
});
app.get(['/resume'], function (request, response) {
    //check user-agent
    //if it 's crawler/bot/searchengine - then return SEO optimized page with content of resume (Html version from gdrive)
    //if it's regular request - return view with embedded google docs
    response.render('pages/resume');
});
app.get('/contact', function (request, response) {
    response.render("pages/contact");
});

app.get(['/', '/about'], function(request, response) {
    response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});