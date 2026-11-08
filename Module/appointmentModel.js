
import config_DB from "../Configuration/ConfigDB.js";

const createAppointment = async (user_id,test_id,appointment_date,appointment_time,notes) => {
    try {
        const sql = `
            INSERT INTO appointments
            (user_id, test_id, appointment_date, appointment_time, notes)
            VALUES (?, ?, ?, ?, ?)
        `;

        const [result] = await config_DB.execute(sql, [
            user_id,
            test_id,
            appointment_date,
            appointment_time,
            notes || null
        ]);

        return result;
    } catch (error) {
        console.error("Error creating appointment:", error);
        throw error;
    }
};

const getPatientAppointments = async (user_id) => {
    try {
        const sql = `
            SELECT
                a.id,
                a.appointment_date,
                a.appointment_time,
                a.status,
                a.notes,
                t.test_name,
                t.price
            FROM appointments a, tests t
            WHERE a.test_id = t.id
            AND a.user_id = ?
            ORDER BY a.appointment_date DESC, a.appointment_time DESC
        `;

        const [result] = await config_DB.execute(sql, [user_id]);
        return result;

    } catch (error) {
        console.error("Error fetching patient appointments:", error);
        throw error;
    }
};

const getAllAppointments = async () => {
    try {
        const sql = `
            SELECT
                a.id,
                a.appointment_date,
                a.appointment_time,
                a.status,
                u.USERNAME AS patient_name,
                u.EMAIL AS patient_email,
                t.test_name,
                t.price
            FROM appointments a, users u, tests t
            WHERE a.user_id = u.id
            AND a.test_id = t.id
            ORDER BY a.appointment_date DESC, a.appointment_time DESC
        `;

        const [result] = await config_DB.execute(sql);
        return result;

    } catch (error) {
        console.error("Error fetching all appointments:", error);
        throw error;
    }
};

const updateAppointmentStatus = async (id, status) => {
    try {
        const sql = `
            UPDATE appointments
            SET status = ?
            WHERE id = ?
        `;

        const [result] = await config_DB.execute(sql, [status, id]);
        return result;

    } catch (error) {
        console.error("Error updating appointment:", error);
        throw error;
    }
};

export {
    createAppointment,
    getPatientAppointments,
    getAllAppointments,
    updateAppointmentStatus
};
