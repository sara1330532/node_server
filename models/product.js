import mongoose from "mongoose";

export const productSchema = mongoose.Schema({
    name: String,
    description:String,
    SerialNumber:Number,
    IssueDate: { type: Date, default: new Date() },
    Image:String,
    cost:Number,
    DepartureTime:Number,
    city:String,
    categories: [String],

})


export const productModel=mongoose.model("product",productSchema);
