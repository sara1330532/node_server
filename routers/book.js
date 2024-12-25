import { Router } from "express";
import { add, deleteById, getAllBooks, getById, updateById } from "../controllers/book.js";

const router = Router();
router.get("/", getAllBooks)
router.get("/:id", getById)
router.delete("/:id", deleteById)
router.put("/:id", updateById)
router.post("/", add)

export default router;