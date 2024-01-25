import mongoose from "mongoose";

const Schema = mongoose.Schema;

const studentSchema = new Schema({
  fullname: {
    type: String,
    required:true
  },
  dob: {
    type: Date,
    required:true
  },
  age: {
    type: Number,
    required:true
  },
  email: {
    type: String,
    required:true
  },
  // add len of mn
  mobileno: {
    type: Number,
    required:true,
    minlength: 10,
    maxlength: 10,
  },
  // enum prop use
  gender: {
    type: String,
    required:true,
    enum: ['Male', 'Female', 'Other'],
  },
  address: {
    type: String,
    required:true
  },
});

export default mongoose.model("Student", studentSchema);
