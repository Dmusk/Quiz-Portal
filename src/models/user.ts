import mongoose from "mongoose";

//schema
const schema = mongoose.Schema;

const userSchema = new schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    password: {
      type: String,
      required: true,
      unique: true
    },
  },
  {timestamps: true}
)


//model;
const User = mongoose.model("User", userSchema);

export default User;
