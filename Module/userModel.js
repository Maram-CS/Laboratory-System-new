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

export default userModel;


