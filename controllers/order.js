import { productModel } from "../models/product.js";
import {  orderModel } from "../models/order.js"
import { userModel } from "../models/user.js";


//--------------------שליפת כל ההזמנות-----------------
export const getAllOrders = async (req, res) => {

    try {
        let data = await orderModel.find();
        res.json(data)
    }
    catch (err) {

        res.status(400).json({ title: "error cannot get all", 
        message: "something wrong by getting all orders" })
    }

}

//--------------------שליפת הזמנה לפי קוד----------------
export const getOrdersByUserId = async (req, res) => {
    let { id } = req.params;
    try {
        let data = await orderModel.findById(id);
        if (!data)
            return res.status(404).json({ title: "error cannot get by id", message: "no  borrow with such id" })
        res.json(data)
    }
    catch (err) {

        res.status(400).json({ title: "error cannot get by id", message: err.message })
    }

}

//--------------------הוספת הזמנה------------------------
export const addOrder = async (req, res) => {
    try {
        let { userId,products  } = req.body;
        if (!userId || !products || !products.length)
            return res.status(404).json({ title: "missing required details", message: "userId and products are required" })
        let user = await userModel.findById(userId);
        if (!user)
            return res.status(404).json({ title: "error order by userid", message: "no  user with such id" })

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

        let order = new orderModel({ userId: userId, books: arr });
        await borrow.save();
        return res.json(borrow)
    }
    catch (errr) {
        res.status(400).json({ title: "error cannot add borrow", message: errr.message })

    }
}

// ------------------------פונקציה להוספת הזמנה----------------------------------
export const add = async (req, res) => {
    const { userId, addressSent ,products } = req.body;
  
    if (! userId|| !addressSent ||! products||!products.length>0) {
      return res.status(400).json({ title: 'Missing data', message: 'userId,addressSent,products  are required' });
    }
  
    try {
      const newOrder = new orderModel(req.body);
      const savedOrder = await newOrder.save();
      res.json(savedOrder);
    } catch (err) {
      res.status(400).json({ title: 'Error adding order', message: err.message });
    }
  };

//----------------מחיקת הזמנה לפי קוד רק אם לא נשלחה---------------------
export const deleteOrderById = async (req, res) => {
    try {
      const order = await orderModel.findById(req.params.id);
      if (!order) return res.status(404).json({ title: 'Order not found', message: 'Invalid ID' });
      if (order.isSent) {
        return res.status(400).json({ title: 'Cannot delete', message: 'Order already send' });
      }
      await orderModel.findByIdAndDelete(req.params.id);
      res.json({ message: 'Order deleted successfully' });
    } catch (err) {
      res.status(400).json({ title: 'Error deleting order', message: err.message });
    }
  };

//-----------------עדכון הזמנה ושליחתה---------------------
export const updateOrder = async (req, res) => {
    let { id } = req.params;
    try {
        let data = await orderModel.findOneAndUpdate({ userId: id, isSent: false }, { $set: { isSent: true } }, { new: true })//תעדכן ותחזיר את האוייבקט אחרי העדכון
        if (!data)
            return res.status(403).json({ title: "cannot sent order", message: "this order not found to sent maybe its already send" })
        return res.json(data);
    }
    catch (errr) {
        res.status(400).json({ title: "error cannot sent order", message: err.message })

    }
}