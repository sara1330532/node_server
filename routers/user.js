import { Router } from "express";
import { addUserSignUp, getAllUsers,payFine, getUserById, getUserByUserNamePasswordLogin, update } from "../controllers/user.js";

const router = Router();

router.get("/",getAllUsers)
router.get("/:id",getUserById)
router.put("/:id",update)
router.put("/pay/:id",payFine)
router.post("/",addUserSignUp)
router.post("/login/",getUserByUserNamePasswordLogin)

export default router;