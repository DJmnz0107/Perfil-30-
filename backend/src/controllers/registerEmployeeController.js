import employeeModel from "../models/Employees.js"; // Importar modelo de la BD
import bcryptjs from "bcryptjs"; // Encriptar contraseña

const registerEmployeeController = {};

registerEmployeeController.register = async (req, res) => {
    // Obtener los datos del cuerpo de la solicitud
    const { nombre, correo, contrasena, telefono, direccion, puesto, fecha_contratacion, salario, DUI } = req.body;

    // Validación de entrada
    if (!nombre || !correo || !contrasena || !telefono || !direccion || !puesto || !fecha_contratacion || !salario || !DUI) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // 1- Verificar si el empleado ya existe
        const employeeExist = await employeeModel.findOne({ correo });

        if (employeeExist) {
            return res.status(400).json({ message: "Employee already exists" });
        }

        // 2- Encriptar la contraseña
        const passwordHash = await bcryptjs.hash(contrasena, 10);

        // 3- Crear el nuevo empleado
        const newEmployee = new employeeModel({
            nombre,
            correo,
            contrasena: passwordHash,
            telefono,
            direccion,
            puesto,
            fecha_contratacion,
            salario,
            DUI: DUI || null // Si DUI es nulo o no se proporciona, se guarda como null
        });

        // 4- Guardar el nuevo empleado en la base de datos
        await newEmployee.save();

        // 5- Responder con éxito
        res.status(201).json({ message: "Employee registered successfully" });

    } catch (error) {
        console.log("Error: " + error);
        res.status(500).json({ message: "Sign up error", error: error.message || error });
    }
};

export default registerEmployeeController;
