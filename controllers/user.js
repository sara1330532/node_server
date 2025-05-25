import { userModel } from "../models/user.js";
import { generateToken } from "../Utills/jwt.js";

//----------------------שליפת כל המשתמשים--------------
export const getAllUsers = async (req, res) => {
    try {
        let data = await userModel.find().select('-password');
        res.json(data)
    } catch (err) {
        console.log("err");
        res.status(400).json({ title: "error cannot get all", message: "wrong something by getting all users"})
    }
}
//---------------------הוספת משתמש----------------------
export const addUserSignUp = async (req, res) => {
    if (  !req.body.email || !req.body.username || !req.body.password)
        return res.status(404).json({ title: "missing data",
         message: "missing data user name,password or email" })
    if(!(/[a-zA-Z0-9]{5,}/.test(req.body.password)))  
        return res.status(404).json("invalid password have to be 5 digit/letters then !/#/*")   
        try {
            
            let newUser = new userModel(req.body);

            // יצירת טוקן ושמירתו במשתמש
            let token = generateToken(newUser);
            console.log(token)
            newUser.token = token;
    
            let data = await newUser.save();
             data = await userModel.findById(newUser._id).select('-password');
            res.json({ message: "User created successfully", user: data });
           
        } catch (err) {
            console.log("Error occurred during user creation:", err);
            res.status(400).json({ title: "error cannot add", message: err.message });
        }
    }   
//----------------עדכון סיסמת משתמש---------------------
export const updatePassword = async (req, res) => {
    let { id } = req.body;

    if (req.body.password && req.body.password.length < 2)
        return res.status(404).json({ title: "wrong paswword", message: "wrong data" })
    try {

        let data = await userModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!data)
            return res.status(404).json({ title: "error cannot update by id", message: "not valid  id parameter found" })
        res.json(data);
    } catch (err) {
        console.log("err");
        res.status(400).json({ title: "error cannot update by id", 
        message: "something wrong by update password" }) 
       
    }

}
//------------------שליפת משתשמש לפי קוד---------------------------------
export const getUserById = async (req, res) => {

    let { id } = req.params;
    try {

        let data = await userModel.findById(id).select('-password');
        if (!data)
            return res.status(404).json({ title: "error cannot get by id",
             message: "not valid  id parameter found" })
        res.json(data);
    } catch (err) {
        console.log("err");
        res.status(400).json({ title: "error cannot get by id", 
        message: "something wrong by getting user by id" })
    }
}
//-------------------שליפת משתמש לפי שם משתמש וסיסמא-----------------------
export const getUserByUserNamePasswordLogin = async (req, res) => {
    try {
        let { username, password } = req.body;
        if (!username || !password)
            return res.status(404).json({ title: "missing username or pssword", message: "missing details" })
        let data = await userModel.findOne({ username: username, password: password }).select('-password');
        if (!data)
            return res.status(404).json({ title: "cannot login", message: "no user with such details" })
         data.token=generateToken(data)  ; 
         console.log(data.token) 
        res.json(data)
    } catch (err) {
        console.log("err");
        res.status(400).json({ title: "error cannot get by id", message: err.message })
    }
}

// -------------------------עדכון פרטי משתמש חוץ מסיסמא-------------------------
export const update = async (req, res) => {
    let { id } = req.params;

    if (req.body.username && req.body.username.length < 2||req.body.email)
        return res.status(404).json({ title: "missing username or pssword", message: "missing details " })
    try {

        let data = await userModel.findByIdAndUpdate(id, req.body, { new: true }).select('-password');;
        if (!data)
            return res.status(404).json({ title: "error cannot update by id", message: "not valid  id parameter found" })
        res.json(data);
    } catch (err) {
        console.log("err");
        res.status(400).json({ title: "error cannot update by id", 
        message: "something wrong by update details" })
    }
}
//----------------------מחיקת משתמש לפי ID----------------------
export const deleteUser = async (req, res) => {
    let { id } = req.params;

    try {
        let data = await userModel.findByIdAndDelete(id);
        if (!data)
            return res.status(404).json({ title: "error cannot delete", message: "User not found" });

        res.json({ title: "User deleted", message: `User with id ${id} was deleted successfully` });
    } catch (err) {
        console.log("Error deleting user:", err);
        res.status(400).json({ title: "error cannot delete", message: "Something went wrong while deleting the user" });
    }
};
