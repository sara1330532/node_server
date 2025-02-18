import { Router } from "express";

import { addOrder,getAllOrders,getOrdersByUserId,updateOrederSentById,deleteOrder} from "../controllers/order.js";

const router = Router();
router.get("/", getAllOrders)
router.get("/byUserId/:userid", getOrdersByUserId)
router.put("/:id", updateOrederSentById)
router.delete("/:id", deleteOrder)
router.post("/", addOrder)

export default router;