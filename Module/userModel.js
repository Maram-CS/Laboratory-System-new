import config_DB from "../Configuration/ConfigDB.js";
import bcrypt from "bcrypt";

const userModel = async (userName,email,password,role) => {
    try {

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const  sql = "INSERT INTO USERS (userName,email,password,role) VALUES (?,?,?,?)";
        const [result] =  await config_DB.execute(sql,[userName,email,hashedPassword,role]);
        return result;
    }catch(err) {
        console.error("Error creating user:", err);
        throw err;
    }
};

// ani hna 
const login = async (email,password) => {

    try {
        const userPasswordInDB = "select password,id,role from users where email=?";
        const [result] = await config_DB.execute(userPasswordInDB,[email]);
        if(result.length === 0) {
            return false;
        }else {
        const user = result[0];
        const hashedPassword = user.password;
        const isUserAllowed = await bcrypt.compare(password,hashedPassword);
        if(isUserAllowed) {
            console.log("user is allowed");
            return user;
        }else {
            console.log("user is not allowed");
            throw new Error("your password is not correct");
        }
    }
    }catch(err) {
        console.error(err);
        throw err;
    }
}


export  {userModel,login};


