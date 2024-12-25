
import { bookModel } from "../models/book.js"
export const getAllBooks = async (req, res) => {

    try {

        let data = await bookModel.find();
        res.json(data);
    } catch (err) {
        console.log("err");
        res.status(400).json({ title: "error cannot get all", message: "somethongs wrong" })
    }

}

export const getById = async (req, res) => {

    let { id } = req.params;
    try {

        let data = await bookModel.findById(id);
        if (!data)
            return res.status(404).json({ title: "error cannot get by id", message: "not valid  id parameter found" })
        res.json(data);
    } catch (err) {
        console.log("err");
        res.status(400).json({ title: "error cannot get by id", message: "somethongs wrong" })
    }

}

export const deleteById = async (req, res) => {


    let { id } = req.params;
    try {

        let data = await bookModel.findByIdAndDelete(id);
        if (!data)
            return res.status(404).json({ title: "error cannot get by id", message: "not valid  id parameter found" })
        res.json(data);
    } catch (err) {
        console.log("err");
        res.status(400).json({ title: "error cannot get by id", message: "somethongs wrong" })
    }

}
export const updateById = async (req, res) => {


    let { id } = req.params;

    if (req.body.name && req.body.name.length < 2 || req.body.numPages && req.body.numPages < 2)
        return res.status(404).json({ title: "wrong name or numPages", message: "wrong data" })
    try {

        let data = await bookModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!data)
            return res.status(404).json({ title: "error cannot update by id", message: "not valid  id parameter found" })
        res.json(data);
    } catch (err) {
        console.log("err");
        res.status(400).json({ title: "error cannot update by id", message: "somethongs wrong" })
    }

}
export const add = async (req, res) => {



    if (!req.body.name || !req.body.numPages)
        return res.status(404).json({ title: "missing name or numPages", message: "missing data" })
    if (req.body.name.length < 2 || req.body.numPages < 2)
        return res.status(404).json({ title: "wrong name or numPages", message: "wrong data" })
    try {

        let newBook = new bookModel(req.body)
        let data = await newBook.save();


        res.json(data);
    } catch (err) {
        console.log("err");
        res.status(400).json({ title: "error cannot add by id", message: "somethongs wrong" })
    }

}