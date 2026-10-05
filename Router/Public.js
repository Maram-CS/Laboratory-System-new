import { Router } from "express";
import { getInfoLab } from "../Controller/infoLabController.js";
import getLabInfo from "../Controller/aboutUsController.js";
const router = Router();


router.get("/home",(req,res)=>{
    res.render("auth/home");
});

router.get("/AboutUs",getLabInfo);

router.get("/contactUs",getInfoLab);

router.get("/login",(req,res)=>{
    res.render("auth/login");
});

router.get("/register",(req,res)=>{
    res.render("auth/signUp");
});

router.get("/adminDash",(req,res)=>{
    res.render("auth/adminDash");
});

export default router;