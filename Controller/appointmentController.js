
import {createAppointment,getPatientAppointments,getAllAppointments,updateAppointmentStatus} from "../Module/appointmentModel.js";

import config_DB from "../Configuration/ConfigDB.js";

const createAppointmentController = async (req, res) => {
    try {
        if (req.role !== "patient") {
            return res.status(403).json({
                message: "Only patients can book appointments"
            });
        }

        const {
            test_id,
            appointment_date,
            appointment_time,
            notes
        } = req.body;

        if (!test_id || !appointment_date || !appointment_time) {
            return res.status(400).json({
                message: "Please fill in all required fields"
            });
        }

        const [tests] = await config_DB.execute(
            "SELECT id FROM tests WHERE id = ? AND is_active = TRUE",
            [test_id]
        );

        if (tests.length === 0) {
            return res.status(404).json({
                message: "Test not found or unavailable"
            });
        }

        const result = await createAppointment(
            req.id,
            test_id,
            appointment_date,
            appointment_time,
            notes
        );

        return res.status(201).json({
            message: "Appointment booked successfully",
            appointmentId: result.insertId
        });

    } catch (error) {
        console.error("Appointment creation error:", error);

        return res.status(500).json({
            message: "Server error"
        });
    }
};

const getMyAppointments = async (req, res) => {
    try {
        if (req.role !== "patient") {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        const appointments = await getPatientAppointments(req.id);

        return res.status(200).json(appointments);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Server error"
        });
    }
};

const getAppointmentsForAdmin = async (req, res) => {
    try {
        if (req.role !== "admin") {
            return res.status(403).json({
                message: "Admin access only"
            });
        }

        const appointments = await getAllAppointments();

        return res.status(200).json(appointments);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Server error"
        });
    }
};

const changeAppointmentStatus = async (req, res) => {
    try {
        if (req.role !== "admin") {
            return res.status(403).json({
                message: "Admin access only"
            });
        }

        const { id, status } = req.body;

        const allowedStatuses = [
            "pending",
            "confirmed",
            "cancelled",
            "completed"
        ];

        if (!id || !allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid appointment ID or status"
            });
        }

        const result = await updateAppointmentStatus(id, status);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Appointment not found"
            });
        }

        return res.status(200).json({
            message: "Appointment status updated successfully"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Server error"
        });
    }
};

export {
    createAppointmentController,
    getMyAppointments,
    getAppointmentsForAdmin,
    changeAppointmentStatus
};
