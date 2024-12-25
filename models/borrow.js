import { Schema, model, Types } from "mongoose";
import { bookSchema } from "./book.js";

/*const userSmallSchema = mongoose.Schema({
    _id: { type: Types.ObjectId, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
})*/

const borrowSchema = Schema({
    // user: userSmallSchema,
    userId: { type: Types.ObjectId, ref: "user" },
    books: [bookSchema],
    date: { type: Date, default: new Date() },
    dateToReturn: {
        type: Date, default: () => {
            const date = new Date();
            date.setDate(date.getDate() + 7);
            return date;
        }
    },
    isBack: { type: Boolean, default: false }
})

export const borrowModel = model("borrow", borrowSchema);