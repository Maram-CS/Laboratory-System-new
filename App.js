import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";

import router from "./Router/Public.js";
import contactRouter from "./Router/createContact.js";
import infoLabRouter from "./Router/LabIfo.js";
import aboutUsRouter from "./Router/aboutUs.js";
import userRouter from "./Router/users.js";

config();

const app = express();
const port = process.env.SERVER_PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));
app.use(express.static(join(__dirname, "public")));

app.use("/", router);
app.use("/contact", contactRouter);
app.use("/lab-info", infoLabRouter);
app.use("/", aboutUsRouter);
app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});