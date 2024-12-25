import { userModel } from "../models/user.js";

export const getAllUsers = async (req, res) => {
    try {
        let date = await userModel.find();
        res.json(data)
    } catch (err) {
        console.log("err");
        res.status(400).json({ title: "error cannot get all", message: err.message })
    }
}

export const addUserSignUp = async (req, res) => {
    if (!req.body.phone || !req.body.email || !req.body.username || !req.body.password)
        return res.status(404).json({ title: "missing data", message: "missing data" })



    try {

        let newUser = new userModel(req.body)
        let data = await newUser.save();


        res.json(data);
    } catch (err) {
        console.log("err");
        res.status(400).json({ title: "error cannot add ", message: err.message })
    }
}

export const update = async (req, res) => {
    let { id } = req.params;

    if (req.body.password && req.body.password.length < 2)
        return res.status(404).json({ title: "wrong paswword", message: "wrong data" })
    try {

        let data = await userModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!data)
            return res.status(404).json({ title: "error cannot update by id", message: "not valid  id parameter found" })
        res.json(data);
    } catch (err) {
        console.log("err");
        res.status(400).json({ title: "error cannot update by id", message: err.message })
    }

}
export const getUserById = async (req, res) => {

    let { id } = req.params;
    try {

        let data = await userModel.findById(id);
        if (!data)
            return res.status(404).json({ title: "error cannot get by id", message: "not valid  id parameter found" })
        res.json(data);
    } catch (err) {
        console.log("err");
        res.status(400).json({ title: "error cannot get by id", message: err.message })
    }
}

export const getUserByUserNamePasswordLogin = async (req, res) => {
    try {
        let { username, password } = req.body;
        if (!username || !password)
            return res.status(404).json({ title: "missing username or pssword", message: "missing details" })
        let data = await userModel.findOne({ username: username, password: password });
        if (!data)
            return res.status(404).json({ title: "cannot login", message: "no user with such details" })
        res.json(data)
    } catch (err) {
        console.log("err");
        res.status(400).json({ title: "error cannot get by id", message: err.message })
    }
}


export const payFine = async (req, res) => {
    try {
        let {id } = req.params;
        let { sum } = req.body;
        if (!sum)
            return res.status(404).json({ title: "missing payment sum ", message: "missing details" })
        //   let data = await userModel.findByIdAndUpdate(userid, { $inc: { fine: -sum } }, { new: true });
        let data = await userModel.findById(id);


        if (!data)
            return res.status(404).json({ title: "cannot login", message: "no user with such details" })

        if (sum > data.fine)
            return res.status(409).json({ title: "wrong payment", message: "too mach money over " + (sum - data.fine) })
        data.fine -= sum;
        await data.save();
        res.json(data)
    } catch (err) {
        console.log("err");
        res.status(400).json({ title: "error cannot pay fine", message: err.message })
    }
}
