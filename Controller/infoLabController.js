import {infoLabModel , createInfoLab } from "../Module/infoLabModel.js";
import config_DB from "../Configuration/ConfigDB.js";

const getInfoLab = async (req,res) => {
    try{
        const labInfo = await infoLabModel();
        if(!labInfo){
            return res.status(404).json({ message:" Lab information not found" });
        }else{
            res.render("auth/contactUs",{labInfo});
        }
    }catch(err){
        console.error(err);
        return res.status(500).json({message:" server error"});
    }
};

const crateLabInfo = async (req,res) => {
    try {
        const { phone,email,address,opening_hours,map_query } = req.body;
        const result = await createInfoLab(phone,email,address,opening_hours,map_query);
        if(result.affectedRows === 0){
            return res.status(400).json({ message: "Failed to create lab info" });
        }else {
            res.status(200).json({ message: "Lab info created successfully", result: result.insertId });
        }
    }catch(err) {
        console.error("Error creating lab info:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

const updateLabInfo = async (req,res) => {
    try {
        const { phone,email,address,opening_hours,map_query } = req.body;
        const sql = "UPDATE lab_info SET phone=?, email=?, address=?, opening_hours=?, map_query=? WHERE id=?";
        const [result] = await config_DB.execute(sql, [phone,email,address,opening_hours,map_query,1]);
        if(result.affectedRows === 0){
            return res.status(400).json({ message: "Failed to update lab info" });
        }
        res.status(200).json({ message: "Lab info updated successfully" });
    }catch(err) {
        console.error("Error updating lab info:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};


export { getInfoLab, crateLabInfo , updateLabInfo };