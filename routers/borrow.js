import { Router } from "express";
import { addBorrow,getAllBorrows,getBorrowById,getBorrowsNotBack,getBorrowsByUserId,returnBorrow} from "../controllers/borrow.js";

const router = Router();
router.get("/", getAllBorrows)
router.get("/byUserId/:userid", getBorrowsByUserId)
router.get("/:id", getBorrowById)
router.get("/notBack", getBorrowsNotBack)
router.put("/:id", returnBorrow)
router.post("/", addBorrow)

export default router;