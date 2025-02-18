import { Router } from "express";
import { addUserSignUp, getAllUsers,updatePassword, getUserById, getUserByUserNamePasswordLogin, update } from "../controllers/user.js";

const router = Router();

router.get("/",getAllUsers)
router.get("/:id",getUserById)
router.put("/",update)
router.put("/:id",updatePassword)
router.post("/",addUserSignUp)
router.post("/login/",getUserByUserNamePasswordLogin)

export default router;