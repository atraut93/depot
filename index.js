var multiparty = require('multiparty'),
    http = require('http'),
    util = require('util'),
    apkParser = require('apk-parser'),
    path = require('path');

http.createServer(function(req, res) {
  if (req.url === '/upload' && req.method === 'POST') {
    // parse a file upload
    var form = new multiparty.Form();

    form.parse(req, function(err, fields, files) {
      res.setHeader('content-type', 'text/json');
      uploadedFile = files.upload[0];
      filePath = path.resolve(uploadedFile.path);
      if (path.extname(filePath) !== '.apk') {
        res.end("{\"error\": \"the file must be an apk\"}");
      } else {
        parseApk(filePath, fields.name[0], function(data) {
          res.end(data);
        });
      }
    });

    return;
  }

  // show a file upload form
  res.writeHead(200, {'content-type': 'text/html'});
  res.end(
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="name" placeholder="App Name"><br>'+
    '<input type="file" name="upload" accept="application/vnd.android.package-archive"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
  );
}).listen(8080);

var parseApk = function parseApk(fileName, appName, callback) {
  apkParser(fileName, function(err, data) {
    var resultData = {},
      manifest,
      today,
      usesSdk;
    if (err) {
      callback(err.toString());
    } else {
      resultData.name = appName;
      manifest = data.manifest[0];
      if (manifest['@android:versionCode']) {
        resultData.versionCode = '' + manifest['@android:versionCode'];
      }
      if (manifest['@android:versionName']) {
        resultData.versionNumber = manifest['@android:versionName'];
      }
      if (manifest['@package']) {
        resultData.package = manifest['@package'];
      }
      if (manifest['uses-sdk']) {
        usesSdk = manifest['uses-sdk'][0];
        resultData.minSdkVersion = '' + usesSdk['@android:minSdkVersion'];
        resultData.targetSdkVersion = '' + usesSdk['@android:targetSdkVersion'];
      }
      today = new Date();
      resultData.releaseDate = today.toISOString();
      resultData.releaseNotes = '';
      resultData.downloadLink = /*'http://depot.location.com/app/projectId/' +*/ fileName;
      callback(JSON.stringify(resultData));
    }
  });
}
