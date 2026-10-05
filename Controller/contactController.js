import contactModel from "../Module/contactModel.js";
import configDB from "../Configuration/ConfigDB.js";

const  createContact = async (req, res) => {
    try{
        const { full_name, phone, email, subject, message } = req.body;
        const result = await contactModel(full_name, phone, email, subject, message);
        if(result.affectedRows === 0){
            return res.status(400).json({ message: "Failed to create contact" });
        }else {
            res.status(200).json({ message: "Contact created successfully", result: result.insertId });
        }
    }catch(err) {
        console.error("Error creating contact:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getContacts = async (req,res) => {
    try {
        const sql = "SELECT * FROM CONTACTS";
        const [result] = await configDB.execute(sql);
        if(result.length === 0){
            return res.status(400).json({message:"filed operation"});
        }
        const msgs = result;
        const today = new Date();
        const todayCount = msgs.filter(msg => {
            const msgDate = new Date(msg.created_at);
            return msgDate.toDateString() === today.toDateString();
        }).length;
        res.render("auth/adminDash",{msgs,todayCount});

    }catch(err) {
        console.error("Error retrieving contacts:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}

export  {createContact, getContacts};