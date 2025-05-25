import { Router } from "express";
import { add, deleteById, getAllproducts, getById, updateById } from "../controllers/product.js";
import {check,checkManager} from "../middlewares/validateToken.js"

const router = Router();

router.get("/", getAllproducts)
router.get("/:id", getById)
router.delete("/:id",checkManager, deleteById)
router.put("/:id", checkManager,updateById)
router.post("/",checkManager, add)

export default router;