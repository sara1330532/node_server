import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role:{type: String,default:"USER" },


})

export const userModel = mongoose.model("user", userSchema);
