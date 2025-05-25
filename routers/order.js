import { Router } from "express";

import { addOrder,getAllOrders,getOrdersByUserId,updateOrederSentById,deleteOrder} from "../controllers/order.js";
import {check,checkManager} from "../middlewares/validateToken.js"

const router = Router();

router.get("/",checkManager, getAllOrders)
router.get("/byUserId/:userid", getOrdersByUserId)
router.put("/:id",checkManager, updateOrederSentById)
router.delete("/:id", deleteOrder)
router.post("/",check, addOrder)

export default router;