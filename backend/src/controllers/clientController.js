/*
nombre
correo
contraseña
telefono
direccion
DUI
*/

const clientController = {};

import clientsModel from "../models/Clients.js";

clientController.getClients = async (req, res) => {

    const clients = await clientsModel.find();
    res.json(clients)
}


clientController.deleteClients = async (req, res) => {

    const deleteClient = await clientsModel.findByIdAndDelete(req.params.id);

    res.json({message:"Cliente eliminado"});

}

clientController.updateClient = async (req, res) => {
    const {name, email, password, telephone, address, dui } = req.body;

    const updateClient = await clientsModel.findByIdAndUpdate(
        req.params.id, 
        {name, email, password, telephone, address, dui}, {new:true});

    res.json({message: "Cliente actualizado"});
}

export default clientController;
