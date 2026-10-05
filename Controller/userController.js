import bcrypt from "bcrypt";
import configDB from "../Configuration/ConfigDB.js";
import { userModel, login } from "../Module/userModel.js";

const sendError = (res, statusCode, message, error) => {
  if (error) {
    console.error(message, error);
  }

  return res.status(statusCode).json({ message });
};

const createUser = async (req, res) => {
  try {
    const { userName, email, password, role } = req.body;
    const result = await userModel(userName, email, password, role);

    if (result.affectedRows === 0) {
      return sendError(res, 400, "Failed to create user");
    }

    return res.status(200).json({ message: "User created successfully", result });
  } catch (error) {
    return sendError(res, 500, "Internal server error", error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const sql = "SELECT * FROM USERS";
    const [result] = await configDB.execute(sql);

    if (result.length === 0) {
      return sendError(res, 404, "No users found");
    }

    return res.status(200).json({ message: "Users retrieved successfully", result });
  } catch (error) {
    return sendError(res, 500, "Internal server error", error);
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const sql = "SELECT * FROM USERS WHERE email=?";
    const [result] = await configDB.execute(sql, [email]);

    if (result.length === 0) {
      return sendError(res, 404, "User not found");
    }

    return res.status(200).json({ message: "User retrieved successfully", result: result[0] });
  } catch (error) {
    return sendError(res, 500, "Internal server error", error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { userName, email, password, role } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const sql = "UPDATE USERS SET userName=?, role=?, email=?, password=? WHERE email=?";
    const [result] = await configDB.execute(sql, [userName, role, email, hashedPassword, email]);

    if (result.affectedRows === 0) {
      return sendError(res, 400, "Failed to update user");
    }

    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    return sendError(res, 500, "Internal server error", error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { email } = req.body;
    const sql = "DELETE FROM USERS WHERE email=?";
    const [result] = await configDB.execute(sql, [email]);

    if (result.affectedRows === 0) {
      return sendError(res, 400, "Failed to delete user");
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return sendError(res, 500, "Internal server error", error);
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isExist = await login(email, password);

    if (isExist) {
      return res.status(200).json({ message: "user Exist" });
    }

    return res.status(400).json({ message: "there is no user with this email" });
  } catch (error) {
    return sendError(res, 500, "Server error", error);
  }
};

export { getAllUsers, getUserByEmail, updateUser, deleteUser, createUser, userLogin };