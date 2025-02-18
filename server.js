import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectToDB } from "./config/DB.js";
import productRouter from "./routers/product.js";
import userRouter from "./routers/user.js";
import orderRouter from "./routers/order.js";

dotenv.config();
connectToDB();
const app = express();

app.use(cors())
app.use(express.json())

app.use("/api/products",productRouter )
app.use("/api/user", userRouter)
app.use("/api/orders", orderRouter)


let port = process.env.PORT;
app.listen(port, () => {
    console.log("app is runnig on port " + port)
})

