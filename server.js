import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config({ path: ".env.local" });

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

import toDosRouter from "./routes/todos.js";
app.use("/todos", toDosRouter);

app.listen(process.env.PORT || port, () => {
  console.log(`App is running at port: ${port}`);
});
