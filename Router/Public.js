import { Router } from "express";
import { getInfoLab } from "../Controller/infoLabController.js";
import getLabInfo from "../Controller/aboutUsController.js";
import {getUserById} from "../Controller/userController.js";
import authRequest from "../middleware/authmiddleware.js";
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

router.get("/patientDash",authRequest,async(req,res)=>{
    try {
        const user = await getUserById(req.id);
        if(!user) {
            return res.status(404).json({message:"User not found"});
        }
        return res.render("auth/patientDash",{user:user});
        
    }catch(err) {
        console.error("Error retrieving user:", err);
        return res.status(500).json({message: "Server error"});
    }   
});


export default router;