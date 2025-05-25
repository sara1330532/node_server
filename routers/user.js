import { Router } from "express";
import { addUserSignUp, getAllUsers,updatePassword, getUserById, getUserByUserNamePasswordLogin, update,deleteUser } from "../controllers/user.js";
import { check } from "../middlewares/validateToken.js";

const router = Router();

router.get("/",getAllUsers)
router.get("/:id",getUserById)
router.put("/",update)
router.put("/:id",updatePassword)
router.put("/delete/:id",deleteUser)
router.post("/",addUserSignUp)
router.post("/login/",getUserByUserNamePasswordLogin)

export default router;