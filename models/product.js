import mongoose from "mongoose";

export const productSchema = mongoose.Schema({
    name: String,
    description: String,
    IssueDate: { type: Date, default: new Date() },
    Image: String,
    cost: Number,
    city: String,
    address: String,
    date:"",
    dayOnweek:"",
    hour:"",
    categories: [String],

})


export const productModel = mongoose.model("product", productSchema);
