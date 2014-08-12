var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var userSchema = new Schema({
  name: String,
  email: {type: String, unique: true},
  password: String,
  admin: Boolean,
  projects: [ mongoose.Schema.Types.ObjectId ]
});
 
module.exports = mongoose.model('User', userSchema);
