import { Router } from "express";
import { getInfoLab } from "../Controller/infoLabController.js";

const router = Router();


router.get("/home",(req,res)=>{
    res.render("auth/home");
});

router.get("/AboutUs",(req,res)=>{
    res.render("auth/aboutUs");
});

router.get("/contactUs",getInfoLab);

export default router;