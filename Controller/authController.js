import { login } from "../Module/userModel.js";
import config_DB from "../Configuration/ConfigDB.js";
import { config } from "dotenv";
import jwt from "jsonwebtoken";

config();

const secret = process.env.JWT_SECRET;

const createToken =  (id,role) => {
    return jwt.sign({id,role},secret,{expiresIn:"3d"});
}

const userLogin = async (req,res) =>{
    try {
        const {email,password} = req.body;
        const isExist = await login(email,password);
        if(isExist === null){
            return res.status(400).json({message:"password is incorrect"});
        } 
        if(isExist === false){
            return res.status(400).json({message:"there is no user with this email"});
        }
            const token = createToken(isExist.id,isExist.role);
             res.cookie("jwt",token,{httpOnly:true,maxAge:3*24*60*60*1000});
            //res.status(200).json({message:"login successful"});
            if(isExist.role === "admin"){
                return res.redirect("/lab-info/adminDash");
            }
            return res.redirect("/home");
        

    }catch(err) {
        console.error("server error!!!", err);
        return res.status(500).json({message: "Server error"});
    }
}

export default userLogin;