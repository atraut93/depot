var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var projectSchema = new Schema({
  name: String,
  versions: [ mongoose.Schema.Types.ObjectId ]
});
 
module.exports = mongoose.model('Project', projectSchema);
