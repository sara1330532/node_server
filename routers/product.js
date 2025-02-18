import { Router } from "express";
import { add, deleteById, getAllproducts, getById, updateById } from "../controllers/product.js";

const router = Router();
router.get("/", getAllproducts)
router.get("/:id", getById)
router.delete("/:id", deleteById)
router.put("/:id", updateById)
router.post("/", add)

export default router;