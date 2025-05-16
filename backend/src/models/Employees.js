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

import { Schema, model } from "mongoose";

const EmployeeSchema = new Schema({
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
    puesto: {
        type:String,
        required:true
    },
    fecha_contratacion: {
        type:Date,
        required:true
    },
    salario: {
        type:Number,
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

export default model("Empleados",EmployeeSchema);