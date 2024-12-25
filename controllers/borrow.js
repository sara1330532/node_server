import { bookModel } from "../models/book.js";
import { borrowModel } from "../models/borrow.js"
import { userModel } from "../models/user.js";

export const getAllBorrows = async (req, res) => {

    try {
        let data = await borrowModel.find();
        res.json(data)
    }
    catch (err) {

        res.status(400).json({ title: "error cannot get all", message: err.message })
    }

}
export const getBorrowById = async (req, res) => {
    let { id } = req.params;
    try {
        let data = await borrowModel.findById(id);
        if (!data)
            return res.status(404).json({ title: "error cannot get by id", message: "no  borrow with such id" })
        res.json(data)
    }
    catch (err) {

        res.status(400).json({ title: "error cannot get by id", message: err.message })
    }

}

export const getBorrowsByUserId = async (req, res) => {
    let { userid } = req.params;
    try {
        let data = await borrowModel.find({ userId: userid });
        res.json(data)
    }
    catch (err) {

        res.status(400).json({ title: "error cannot get by id", message: err.message })
    }
}
export const getBorrowsNotBack = async (req, res) => {

    try {
        let data = await borrowModel.find({ isBack: false });
        res.json(data)
    }
    catch (err) {

        res.status(400).json({ title: "error cannot get by id", message: err.message })
    }
}

export const addBorrow = async (req, res) => {
    try {
        let { userId, books } = req.body;
        if (!userId || !books || !books.length)
            return res.status(404).json({ title: "missing required details", message: "userId and books are required" })
        let user = await userModel.findById(userId);
        if (!user)
            return res.status(404).json({ title: "error borrow by userid", message: "no  user with such id" })

        let borrows = await borrowModel.find({ userId: userId, isBack: false, dateToReturn: { $lt: new Date() } })
        if (borrows.length > 0) {
            let numOfBooks = borrows.reduce((prev, item) => { return prev + item.books.length }, 0)


            user.fine = numOfBooks * 5;
            await user.save();

        }
        if (user.fine)
            return res.status(403).json({ title: "you have to pay fine " + user.fine, message: "no permission ,fisrt pay then borrow anoter book" })
        let arr = [];
        books.forEach(async (item) => {
            let b = await bookModel.findById(item.id);
            if (!b)
                return res.status(404).json({ title: "error borrow by userid", message: "wrong book id" })
            arr.push(b);
        })

        let borrow = new borrowModel({ userId: userId, books: arr });
        await borrow.save();
        return res.json(borrow)
    }
    catch (errr) {
        res.status(400).json({ title: "error cannot add borrow", message: errr.message })

    }


}
export const returnBorrow = async (req, res) => {
    let { id } = req.params;
    try {
        let data = await borrowModel.findOneAndUpdate({ _id: id, isBack: false }, { $set: { isBack: true } }, { new: true })//תעדכן ותחזיר את האוייבקט אחרי העדכון
        //מעדכן שההשאלה הוחזרה ומחזיר את אוהבייקט ההשאלה
        if (!data)
            return res.status(403).json({ title: "cannot set back", message: "this borrow not foubd to return maybe its already returnd" })


        return res.json(data);
    }
    catch (errr) {
        res.status(400).json({ title: "error cannot return back borrow", message: errr.message })

    }

}
