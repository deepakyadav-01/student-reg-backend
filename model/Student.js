import mongoose from "mongoose";

const Schema = mongoose.Schema;

const studentSchema = new Schema({
  fullname: {
    type: String,
  },
  dob: {
    type: Date,
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
  },
  mobileno: {
    type: Number,
  },
  gender: {
    type: String,
  },
  address: {
    type: String,
  },
});

export default mongoose.model("Student", studentSchema);

