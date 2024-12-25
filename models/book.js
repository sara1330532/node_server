import mongoose from "mongoose";

/*const authorSchema = mongoose.Schema({

    firstName: String,
    lastName: String,
    address: String
    //כל מה שנבנה עם סכמה מקבל את ה_id באופן אוטומטי
})*/

export const bookSchema = mongoose.Schema({
    name: String,
    categories: [String],
    publishDate: { type: Date, default: new Date() },
    numPages: Number,
    author: {//בצורה כזו לא היה לו מפתח
        firstName: String,
        lastName: String,
        address: String
    }
   // author: authorSchema
})
//שם טבלה לכתוב ביחיד הוא הופך לרבים בעצמו
export const bookModel=mongoose.model("book",bookSchema);
//export const authorModel=mongoose.model("author",authorSchema);