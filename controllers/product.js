import { productModel } from "../models/product.js";


//-------------פונקציה לשליפת כל המוצרים---------------

export const getAllproducts = async (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;
        try {
            const products = await productModel
                .find()
                .skip((page - 1) * limit)  // דילוג על הכרטיסים הקודמים
                .limit(limit);  // הגבלת מספר הכרטיסים
            res.json(products);
        } catch (err) {
            res.status(500).json({ message: "שגיאה בשליפת המוצרים" });
        }
}

//---------------פונקציה לשליפת מוצר לפי קוד----------------

export const getById = async (req, res) => {

    let { id } = req.params;
    try {

        let data = await productModel.findById(id);
        if (!data)
            return res.status(404).json({ title: "error cannot get by id", message: "not valid  id parameter found" })
        res.json(data);
    } catch (err) {
        console.log("err");
        res.status(400).json({ title: "error cannot get by id", message: "somethongs wrong by getting by id" })
    }

}

//---------------פונקציה למחיקת מוצר לפי קוד----------------
export const deleteById = async (req, res) => {


    let { id } = req.params;
    try {

        let data = await productModel.findByIdAndDelete(id);
        if (!data)
            return res.status(404).json({ title: "error cannot get by id", message: "not valid  id parameter found" })
        res.json(data);
    } catch (err) {
        console.log("err");
        res.status(400).json({ title: "error cannot get by id", message: "somethongs wrong" })
    }

}

//------------------פונקציה לעדכון מוצר לפי קוד--------------------
export const updateById = async (req, res) => {


    let { id } = req.params;

    if ((req.body.name && req.body.name.length < 2 || req.body.cost && req.body.cost < 50)||
    req.body.city&&req.body.city.length<2)
        return res.status(404).json({ title: "wrong name or numPages", message: "wrong data" })
    try {

        let data = await productModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!data)
            return res.status(404).json({ title: "error cannot update by id", message: "not valid  id parameter found" })
        res.json(data);
    } catch (err) {
        console.log("err");
        res.status(400).json({ title: "error cannot update by id", message: "somethongs wrong" })
    }

}

//-------------------------פונקציה להוספת מוצר------------------------
export const add = async (req, res) => {


    if ((!req.body.name || !req.body.cost)||(!req.body.city))
        return res.status(404).json({ title: "missing name or cost,city", message: "missing data" })
    if ((req.body.name.length < 2 || req.body.cost <50)||(req.body.city.length<2))
        return res.status(404).json({ title: "wrong name or cost,city", message: "wrong data" })
    try {

        let newProduct = new productModel(req.body)
        let data = await newProduct.save();
        res.json(data);
    } catch (err) {
        console.log("err");
        res.status(400).json({ title: "error cannot add by id", message: "somethongs wrong by adding product" })
    }

}