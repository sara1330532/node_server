import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone:{ type: String, required: false },
    role:{type: String,default:"USER" },
    token: { type: String } 


})

export const userModel = mongoose.model("user", userSchema);
