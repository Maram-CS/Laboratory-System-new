import {infoLabModel , createInfoLab } from "../Module/infoLabModel.js";
import config_DB from "../Configuration/ConfigDB.js";

const getInfoLab = async (req,res) => {
    try {
        // Get lab information
        const labInfo = await infoLabModel();

        // Get contact messages
        const sql = "SELECT * FROM CONTACTS ORDER BY created_at DESC";
        const [msgs] = await config_DB.execute(sql);
                console.log("PATH:", req.path);
        console.log("MSGS LENGTH:", msgs.length);

        // Count today's messages
        const today = new Date();

        const todayCount = msgs.filter(msg => {
            const msgDate = new Date(msg.created_at);
            return msgDate.toDateString() === today.toDateString();
        }).length;
        if(req.path === "/adminDash") {
        return res.render("auth/adminDash", {
            labInfo,
            msgs,
            todayCount
        });
    }
        if(req.path === "/contactUs") {
            return res.render("auth/contactUs", {
                labInfo,
            });
        }

    } catch (err) {
        console.error("Error retrieving admin dashboard:", err);

        return res.status(500).json({
            message: "Internal server error"
        });
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