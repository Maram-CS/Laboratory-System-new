import jwt from "jsonwebtoken";

const password = process.env.JWT_SECRET;

const authRequest = (req, res, next) => {
    try {
    const token = req.cookies.jwt;
    if(!token) {
        res.status(401).json({message:"unauthorized"});
    }else {
       const decoded =  jwt.verify(token,password);
       if(decoded) {
           req.id = decoded.id;
           req.role = decoded.role;
            next();
       } else {
            res.status(401).json({message:"invalid token"});
       } 
    }   
    }catch(err) {
        console.error("Error verifying token:", err);
        return res.status(401).json({message:"invalid token"});
    }

}

export default authRequest;
