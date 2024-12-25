import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectToDB } from "./config/DB.js";
import bookRouter from "./routers/book.js";
import userRouter from "./routers/user.js";
import borrowRouter from "./routers/borrow.js";
import logToFile from "./middlewares/logTOFilrMiddleware.js";

dotenv.config();
connectToDB();
const app = express();

app.use(cors())
app.use(express.json())
app.use(logToFile)

app.use("/api/books", bookRouter)
app.use("/api/user", userRouter)
app.use("/api/borrow", borrowRouter)


let port = process.env.PORT;
app.listen(port, "localhost", () => {
    console.log("app is runnig on port " + port)
})

