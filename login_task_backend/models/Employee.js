const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const employeeSchema = new mongoose.Schema({
  f_Id: {
    type: Number,
    unique: true,
  },
  f_Name: {
    type: String,
    required: true,
  },
  f_Email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
  },
  f_Mobile: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Mobile number must be 10 digits.'],
  },
  f_Designation: {
    type: String,
    required: true,
  },
  f_gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  f_Course: {
    type: String,
    required: true,
  },
  f_Image: {
    type: String,
    required: true,
  },
  f_Createdate: {
    type: Date,
    default: Date.now,
  },
});

// Add auto-increment plugin to the schema
employeeSchema.plugin(AutoIncrement, { inc_field: 'f_Id' });

const Employee = mongoose.models.Employee || mongoose.model('Employee', employeeSchema);

module.exports = Employee;