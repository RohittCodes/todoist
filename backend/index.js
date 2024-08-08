import express from "express";
import connectDB from "./db.js";
import auth from "./routes/auth.js";
import user from "./routes/user.js";
import task from "./routes/tasks.js";
import cors from "cors";

import * as dotenv from "dotenv";
dotenv.config();

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/tasks", task);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});