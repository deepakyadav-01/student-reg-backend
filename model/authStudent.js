import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
      type: String,
      required:[true,"please emial username"],
    },
    email: {
      type: String,
      required:[true,"please enter your email"],
      unique:[true,"email already exists"]
    },
    password: {
      type: String,
      required:[true,"please enter user password"],
    }

  },{
    timestamps:true,
  });

  export default mongoose.model("authStudent", userSchema);

