import { Router } from "express";

const router = Router();

router.get("/home",(req,res)=>{
    res.render("auth/home");
});

router.get("/AboutUs",(req,res)=>{
    res.render("auth/aboutUs");
});

router.get("/contactUs",(req,res)=>{
    res.render("auth/contactUs");
});

export default router;