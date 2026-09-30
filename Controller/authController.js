
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
        if(isExist){
            const token = createToken(isExist.id,isExist.role);
            res.cookie("jwt",token,{httpOnly:true,maxAge:3*24*60*60*1000});
            // redirect to the dashboard or send a success response
            res.status(200).json({message:"login successful"});
        }else {
            res.status(400).json({message:"there is no user with this email"});
        }
    }catch(err) {
        console.error("server error!!!");
        return res.status(500).json({message: "Server error"});
    }
}

export default userLogin;