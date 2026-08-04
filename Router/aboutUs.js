import getLabInfo from "../Controller/aboutUsController.js";
import { Router } from "express";

const labInfoRouter = Router();

labInfoRouter.get("/get",getLabInfo);

export default labInfoRouter;