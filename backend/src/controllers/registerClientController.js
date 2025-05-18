import bcrypt from "bcryptjs";
import clientsModel from "../models/Clients.js";

const registerClientsController = {};

registerClientsController.register = async (req, res) => {
    // Obtener los datos del cliente desde el cuerpo de la solicitud
    const { nombre, correo, contrasena, telefono, direccion, DUI } = req.body;

    if (!nombre || !correo || !contrasena || !telefono || !direccion || !DUI) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Depuración: Imprimir los datos recibidos
        console.log("Datos recibidos: ", req.body);

        // 1- Verificar si el cliente ya existe
        const existsClient = await clientsModel.findOne({ correo });

        if (existsClient) {
            return res.status(400).json({ message: "Client already exists" });
        }

        // 2- Encriptar la contraseña
        const passwordHash = await bcrypt.hash(contrasena, 10);

        // 3- Guardar el nuevo cliente
        const newClient = new clientsModel({
            nombre,
            correo,
            contrasena: passwordHash,
            telefono,
            direccion,
            DUI: DUI || null // Si DUI es nulo o no se proporciona, se guarda como null
        });

        await newClient.save();

        // 4- Responder con éxito
        res.status(201).json({ message: "Client registered successfully", clientId: newClient._id });
        
    } catch (error) {
        console.error("Error al registrar cliente:", error); // Depuración: mostrar error completo
        res.status(500).json({ message: "Error registering client", error: error.message || error });
    }
};

export default registerClientsController;
