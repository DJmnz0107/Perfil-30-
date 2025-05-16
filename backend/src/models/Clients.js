/*
nombre
correo
contraseña
telefono
direccion
DUI
*/

import { Schema, model } from "mongoose";

const ClientSchema = new Schema({
    nombre: {
        type:String,
        required:true
    },
    correo: {
        type:String,
        required:true
    },
    contrasena: {
        type:String,
        required:true
    },
    telefono: {
        type:String,
        required:true
    },
    direccion: {
        type:String,
        required:true
    },
    DUI: {
        type:String,
        required:true
    }
},
{
    timestamps:true,
    strict:false
}
);

export default model("Clientes", ClientSchema);

