import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import clientModel from "../models/Clients.js";
import employeeModel from "../models/Employees.js";
import { sendEmail, HTMLRecoveryEmail } from "../utils/mailRecoveryPassword.js";
import { config } from "../config.js";

// Array de funciones
const RecoveryPasswordController = {};

// Solicitud de código de recuperación
RecoveryPasswordController.requestCode = async (req, res) => {
    const { correo } = req.body;

    try {
        let userFound;
        let userType;

        // Verificamos que el usuario exista
        userFound = await clientModel.findOne({ correo });

        if (userFound) {
            userType = "client";
        } else {
            userFound = await employeeModel.findOne({ correo });
            if (userFound) {
                userType = "employee";
            }
        }

        if (!userFound) {
            return res.json({ message: "User not found" });
        }

        const code = Math.floor(10000 + Math.random() * 90000).toString();

        const token = jsonwebtoken.sign(
            { correo, code, userType, verified: false },
            config.JWT.secret,
            { expiresIn: "20m" }
        );

        res.cookie("tokenRecoveryCode", token, { maxAge: 20 * 60 * 1000 });

        // Enviar el correo
        await sendEmail(
            correo,
            "Password recovery code",
            `Your verification code is: ${code}`,
            HTMLRecoveryEmail(code)
        );

        res.json({ message: "Verification code sent" });
    } catch (error) {
        console.log("error " + error);
    }
};

// Verificar código
RecoveryPasswordController.verifyCode = async (req, res) => {
    const { code } = req.body;

    try {
        const token = req.cookies.tokenRecoveryCode;

        const decoded = jsonwebtoken.verify(token, config.JWT.secret);

        if (decoded.code !== code) {
            return res.json({ message: "Invalid code" });
        }

        const newToken = jsonwebtoken.sign(
            {
                correo: decoded.correo,
                code: decoded.code,
                userType: decoded.userType,
                verified: true
            },
            config.JWT.secret,
            { expiresIn: "20m" }
        );

        res.cookie("tokenRecoveryCode", newToken, { maxAge: 20 * 60 * 1000 });

        res.json({ message: "Code verified successfully" });
    } catch (error) {
        console.log("error " + error);
    }
};

// Cambiar la contraseña
RecoveryPasswordController.newPassword = async (req, res) => {
    const { newPassword } = req.body;

    try {
        const token = req.cookies.tokenRecoveryCode;

        const decoded = jsonwebtoken.verify(token, config.JWT.secret);

        if (!decoded.verified) {
            return res.json({ message: "Code not verified" });
        }

        const { correo, userType } = decoded;

        const hashedPassword = await bcryptjs.hash(newPassword, 10);

        let updatedUser;

        if (userType === "client") {
            updatedUser = await clientModel.findOneAndUpdate(
                { correo },
                { password: hashedPassword },
                { new: true }
            );
        } else if (userType === "employee") {
            updatedUser = await employeeModel.findOneAndUpdate(
                { correo },
                { password: hashedPassword },
                { new: true }
            );
        }

        res.clearCookie("tokenRecoveryCode");

        res.json({ message: "Password updated successfully" });
    } catch (error) {
        console.log("error " + error);
    }
};

export default RecoveryPasswordController;
