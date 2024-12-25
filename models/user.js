import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    fine: { type: Number, default: 0 }


})

export const userModel = mongoose.model("user", userSchema);
