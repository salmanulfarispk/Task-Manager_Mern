import { timeStamp } from "console";
import mongoose, { Schema } from "mongoose";
import { title } from "process";


const UserSchema= new Schema({
    name : {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    role: {
        type:String,
        required: true,
    },
    email: {
         type: String,
         required: true,
         unique: true
        },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    isActive: { type: Boolean, required: true, default: true },
},
  {
    timestamps: true
  }
);


const User= mongoose.model("User",UserSchema)

module.exports= User