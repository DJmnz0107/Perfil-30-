import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import clientModel from "../models/Clients.js";
import employeeModel from "../models/Employees.js";
import { config } from "../config.js";

// Array de funciones
const loginController = {};

loginController.login = async (req, res) => {
    const { correo, contrasena } = req.body;

    try {
        let userFound;
        let userType;

        // Admin
        if (correo === config.admin.email && contrasena === config.admin.password) {
            userType = "admin";
            userFound = { _id: "admin" };
        } else {
            // Empleado
            userFound = await employeeModel.findOne({ correo });
            userType = "employee";

            // Cliente
            if (!userFound) {
                userFound = await clientModel.findOne({ correo });
                userType = "client";
            }
        }

        if (!userFound) {
            return res.json({ message: "User not found" });
        }

        // Desencriptar contraseña (excepto admin)
        if (userType !== "admin") {
            const isMatch = await bcrypt.compare(contrasena, userFound.contrasena);
            if (!isMatch) {
                return res.json({ message: "Invalid password" });
            }
        }

        // TOKEN
        jsonwebtoken.sign(
            { id: userFound._id, userType },
            config.JWT.secret,
            { expiresIn: config.JWT.expires },
            (error, token) => {
                if (error) {
                    console.log("error " + error);
                    return res.status(500).json({ message: "Token error" });
                }

                res.cookie("authToken", token); // ← esto estaba vacío
                res.json({ message: "Login successful", token });
            }
        );
    } catch (error) {
        console.log("error " + error);
        res.status(500).json({ message: "Server error", error: error.message || error });
    }
};

export default loginController;
