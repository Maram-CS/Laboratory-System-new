import {createContact,getContacts} from "../Controller/contactController.js";
import Router from "express";

const contactRouter = Router();

contactRouter.post("/create", createContact);
contactRouter.get("/contacts", getContacts);

export default contactRouter;