
import { Router } from "express";

import {createAppointmentController,getMyAppointments,getAppointmentsForAdmin,changeAppointmentStatus} from "../Controller/appointmentController.js";

import authRequest from "../middleware/authmiddleware.js";

const appointmentRouter = Router();

appointmentRouter.post("/create",authRequest,createAppointmentController);

appointmentRouter.get("/my",authRequest,getMyAppointments);

appointmentRouter.get("/all",authRequest,getAppointmentsForAdmin);

appointmentRouter.post("/updateStatus",authRequest,changeAppointmentStatus);

export default appointmentRouter;
