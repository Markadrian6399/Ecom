import express, { response } from "express";
import dotenv from "dotenv";
import productRoute from "./routes/product.js";
import { dbconect } from "./utils/db.js";
import colors from "colors";
import authRoute from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import mailRoute from "./routes/mailRoute.js";

dotenv.config();
dbconect();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const port = process.env.port || 5000;

app.use("/api/sendmail", mailRoute);

app.use("/api/products", productRoute);
app.use("/api/auth", authRoute);

app.listen(port, () =>
  console.log(`server running on port ${port}`.green.underline)
);
