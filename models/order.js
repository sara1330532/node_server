import { Schema, model, Types } from "mongoose";
import {  productSchema } from "./product.js";



const orderSchema = Schema({
    date: { type: Date, default: new Date() },
    dateDeadline: {
        type: Date, default: () => {
            const date = new Date();
            date.setDate(date.getDate() + 7);
            return date;
        }
    },
    addressSent:{ type: String, required: true },
    userId: { type: Types.ObjectId, ref: "user",required:true },
    products:{ type:[{product:productSchema,quantity:Number}],required:true},
    isSent: { type: Boolean, default: false},
    finallCost:Number,
    pay:{creditCard:String,
         threeDigit:String,
        validity:String}
})

export const orderModel = model("order", orderSchema);