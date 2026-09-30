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
        const userPasswordInDB = "select password from users where email=?";
        const [result] = await config_DB.execute(userPasswordInDB,[email]);
        if(result.length === 0) {
            return false;
        }else {

        const hashedPassword = result[0].password;
        const isUserAllowed = await bcrypt.compare(password,hashedPassword);
        if(isUserAllowed) {
            return true;
        }else {
            return false;
        }
    }
    }catch(err) {
        console.error(err);
    }
}


export  {userModel,login};


