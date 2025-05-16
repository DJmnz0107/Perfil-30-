/*
Campos
titulo
descripcion
director
genero
anio
duracion
imagen
*/

import { Schema, model } from "mongoose";

const MovieSchema = new Schema({
    titulo: {
        type:String,
        required:true
    },
    descripcion: {
        type:String,
        required:true
    },
    director: {
        type:String,
        required:true
    },
    genero: {
        type: [String],  
        required: true
    },
    anio: {
        type:Number,
        required:true
    },
    duracion: {
        type:Number,
        required:true
    },
    imagen: {
        type:String,
        required:true
    }
},
{
    timestamps:true,
    strict:false
}
);

export default model("Peliculas", MovieSchema);

