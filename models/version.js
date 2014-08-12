var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var versionSchema = new Schema({
  name: String,
  package: String,
  versionCode: String,
  versionName: String,
  minSdkVersion: String,
  targetSdkVersion: String,
  releaseDate: Date,
  releaseNotes: String,
  downloadLink: String,
});
 
module.exports = mongoose.model('Version', versionSchema);
