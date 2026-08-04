import createContact from "../Controller/contactController.js";
import Router from "express";

const contactRouter = Router();

contactRouter.post("/create", createContact);
export default contactRouter;