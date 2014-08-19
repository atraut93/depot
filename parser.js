var apkParser = require('apk-parser'),
    config = require('./config');

var apkParserFunction = function (apkLocation, appName, callback) {
  apkParser(apkLocation, function (err, data) {
    var resultData = {},
      manifest,
      today,
      usesSdk;
    if (err) {
      callback(err, null);
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
      resultData.downloadLink = config.depotBaseUrl + apkLocation;
      callback(null, resultData);
    }
  });
}

module.exports = {
  parseApk: apkParserFunction
};
