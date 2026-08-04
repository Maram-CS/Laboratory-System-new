import { Router } from "express";
import { getInfoLab, crateLabInfo, updateLabInfo  } from "../Controller/infoLabController.js";

const infoLabRouter = Router();

infoLabRouter.get("/get",getInfoLab);
infoLabRouter.post("/create",crateLabInfo);
infoLabRouter.put("/update",updateLabInfo);

export default infoLabRouter ;