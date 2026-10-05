import { Router } from "express";
import { getInfoLab, crateLabInfo, updateLabInfo  } from "../Controller/infoLabController.js";

const infoLabRouter = Router();


infoLabRouter.get("/adminDash",getInfoLab);
infoLabRouter.get("/contactUs",getInfoLab);
infoLabRouter.post("/create",crateLabInfo);
infoLabRouter.post("/update",updateLabInfo);

export default infoLabRouter ;