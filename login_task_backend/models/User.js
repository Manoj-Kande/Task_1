const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  f_sno: { type: Number, required: true, unique: true },
  f_userName: { type: String, required: true },
  f_Pwd: { type: String, required: true },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;