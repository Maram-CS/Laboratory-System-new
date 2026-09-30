import { Router } from 'express';
import { getAllUsers, updateUser, deleteUser , getUserByEmail, createUser,userLogin } from '../Controller/userController.js';


const userRouter = Router();

userRouter.get("/get", getAllUsers);
userRouter.get("/getByEmail", getUserByEmail);
userRouter.post("/create", createUser);
userRouter.post("/update", updateUser);
userRouter.post("/delete", deleteUser);
userRouter.post("/login",userLogin);

export default userRouter;