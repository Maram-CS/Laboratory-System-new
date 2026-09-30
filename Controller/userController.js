import config_DB from "../Configuration/ConfigDB.js";
import {userModel,login} from "../Module/userModel.js";
import bcrypt from "bcrypt";

const createUser = async (req,res) => {
    try {
        const { userName,email,password,role } = req.body;
        const result = await userModel(userName,email,password,role);
        if(result.affectedRows === 0){
            res.status(400).json({ message: "Failed to create user" });
            throw new Error("Failed to create user");
        }else {
            res.status(200).json({ message: "User created successfully", result: result });
        }
    }catch(err) {
        res.status(500).json({ message: "Internal server error" });
        console.error("Error creating user:", err);
        throw err;
    }
};

const getAllUsers = async (req,res) => {
    try {
        const sql = "SELECT * FROM USERS";
        const [result] = await config_DB.execute(sql);
        if(result.length === 0) {
            res.status(404).json({ message: "No users found" });
            throw new Error("No users found");
        }else {
            res.status(200).json({ message: "Users retrieved successfully", result: result });
            return result;
        }
    }catch(err) {
        res.status(500).json({ message: "Internal server error" });
        console.error("Error retrieving users:", err);
        throw err;
    }  
};

const getUserByEmail = async (req,res) => {
    try {
        const { email } = req.body;
        const sql = "SELECT * FROM USERS WHERE email=?";
        const [result] = await config_DB.execute(sql,[email]);
        if(result.length === 0) {
            res.status(404).json({ message: "User not found" });
            throw new Error("User not found");
        }else {
            res.status(200).json({ message: "User retrieved successfully", result: result[0] });
            return result[0];
        }
    }catch(err) {
        res.status(500).json({ message: "Internal server error" });
        console.error("Error retrieving user by email:", err);
        throw err;
    }
};

const updateUser = async (req,res) => {
    try {
        const { userName,email,password, role } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const sql = "UPDATE USERS SET userName=?, role=?, email=?, password=? WHERE email=?";
        const [result] = await config_DB.execute(sql, [userName,role,email,hashedPassword,email]);
        if(result.affectedRows === 0){
            res.status(400).json({ message: "Failed to update user" ,user: result   });
            throw new Error("Failed to update user");
        }else {
            res.status(200).json({ message: "User updated successfully" });
            return result;
        }
    }catch(err) {
        res.status(500).json({ message: "Internal server error" });
        console.error("Error updating user:", err);
        throw err;
    }
};

const deleteUser = async (req,res) => {
    try {
        const { email } = req.body;
        const sql = "DELETE FROM USERS WHERE email=?";
        const [result] = await config_DB.execute(sql,[email]);
        if(result.affectedRows === 0){
            res.status(400).json({ message: "Failed to delete user" });
            throw new Error("Failed to delete user");
        }else {
            res.status(200).json({ message: "User deleted successfully" });
            return result;
        }
    }catch(err) {
        res.status(500).json({ message: "Internal server error" });
        console.error("Error deleting user:", err);
        throw err;
    }
};




export { getAllUsers, getUserByEmail, updateUser, deleteUser, createUser };