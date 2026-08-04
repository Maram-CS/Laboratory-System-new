import config_DB from "../Configuration/ConfigDB.js";

const ContactModel = async(full_name,phone,email,subject,message) => {
    try {
        const sql = "INSERT INTO contacts (full_name, phone, email, subject, message) VALUES (?, ?, ?, ?, ?)";
        const [result] = await config_DB.execute(sql, [full_name, phone, email, subject, message]);
        return result;
    } catch (error) {   
        console.error("Error inserting contact:", error);
        throw error;
    }
}
  
export default  ContactModel ;