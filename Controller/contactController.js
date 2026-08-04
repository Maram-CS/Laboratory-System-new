import contactModel from "../Module/contactModel.js";

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

export default createContact;