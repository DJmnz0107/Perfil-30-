/*
Campos
nombre
correo
contraseña
telefono
direccion
puesto
fecha_contratacion
salario
DUI
*/

const employeeController = {};

import employeeModel from "../models/Employees.js";

employeeController.getEmployees = async (req, res) => {
    const employees = await employeeModel.find();
    res.json(employees);
};

employeeController.deleteEmployee = async (req, res) => {
    const deleteEmployee = await employeeModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Employee deleted" });
};

employeeController.updateEmployee = async (req, res) => {
    const {
        name,
        email,
        password,
        phone,
        address,
        position,
        hire_date,
        salary,
        DUI
    } = req.body;

    const updateEmployee = await employeeModel.findByIdAndUpdate(
        req.params.id, 
        { name, email, password, phone, address, position, hire_date, salary, DUI }, 
        { new: true }
    );

    res.json({ message: "Empleado actualizado" });
};

export default employeeController;

