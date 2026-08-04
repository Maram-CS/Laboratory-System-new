import config_DB from "../Configuration/ConfigDB.js";

const infoLabModel = async () => {
    try {
        const sql = "SELECT * FROM lab_info  LIMIT 1";
        const [result] = await config_DB.execute(sql);
        return result[0]; // Return the first row of the result
    } catch (error) {
        console.error("Error fetching lab info:", error);
        throw error;    
    }
};

const createInfoLab = async (phone,email,address,opening_hours,map_query)=>{
    try {
       const sql = "INSERT INTO LAB_INFO (phone,email,address,opening_hours,map_query) VALUES (?,?,?,?,?)";
       const [result] = await config_DB.execute(sql,[phone,email,address,opening_hours,map_query]);
         return result;
    } catch (error) {
        console.error("Error inserting lab info:", error);
        throw error;
    }
};


export  {infoLabModel, createInfoLab};