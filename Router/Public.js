import { Router } from "express";

const router = Router();

router.get("/home",(req,res)=>{
    res.render("auth/home");
})

export default router;