import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import config_DB from "./Configuration/ConfigDB.js";
import { config } from "dotenv";

config();
const App = express();
const Port = process.env.SERVER_PORT || 3000;

App.use(express.json());
App.use(express.urlencoded({extended : true}));

const __filename = fileURLToPath(import.meta.url); 
const __dirname = dirname(__filename);

App.set("view engine","ejs");
App.set("views", join(__dirname, "/views"));
App.use(express.static(join(__dirname, "/public")));

App.listen(Port,()=>{
    console.log(`Server is running on port: ${Port}`);
})