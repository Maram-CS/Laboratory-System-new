import { Router } from "express";
import { getInfoLab } from "../Controller/infoLabController.js";
import getLabInfo from "../Controller/aboutUsController.js";
const router = Router();


router.get("/home",(req,res)=>{
    res.render("auth/home");
});

router.get("/AboutUs",getLabInfo);

router.get("/contactUs",getInfoLab);

export default router;