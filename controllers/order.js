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


// ------------------------פונקציה להוספת הזמנה----------------------------------
export const addOrder = async (req, res) => {
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
export const deleteOrder = async (req, res) => {
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
export const updateOrederSentById = async (req, res) => {
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