import movieModel from "../models/Movies.js";
import { v2 as cloudinary } from "cloudinary"; // Importar cloudinary
import { config } from "../config.js"; // Importar configuración de Cloudinary

// Configuración de Cloudinary
cloudinary.config({
    cloud_name: config.cloudinary.cloud_name,
    api_key: config.cloudinary.cloudinary_api_key,
    api_secret: config.cloudinary.cloudinary_api_secret
});

const movieController = {};

// Obtener todas las películas
movieController.getMovies = async (req, res) => {
    const movies = await movieModel.find();
    res.json(movies);
};

// Eliminar una película
movieController.deleteMovie = async (req, res) => {
    const deleteMovie = await movieModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Movie deleted" });
};

// Actualizar una película
movieController.updateMovie = async (req, res) => {
    const { titulo, descripcion, director, genero, anio, duracion } = req.body;
    let imageUrl = ""; // Variable para almacenar la URL de la imagen

    // Verificar si hay un archivo de imagen en la solicitud
    if (req.file) {
        // Subir la nueva imagen a Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "movies", // Carpeta donde se guardan las imágenes
            allowed_formats: ["jpg", "png", "jpeg", "gif", "webp", "avif"] // Formatos permitidos
        });

        // Obtener la URL segura de la imagen
        imageUrl = result.secure_url;
    }

    // Actualizar la película en la base de datos
    const updatedMovie = await movieModel.findByIdAndUpdate(
        req.params.id, 
        {
            titulo,
            descripcion,
            director,
            genero,
            anio,
            duracion,
            imagen: imageUrl || undefined // Si hay una imagen, se actualiza, sino, no se toca
        },
        { new: true } 
    );

    res.json({ message: "Movie updated", movie: updatedMovie });
};

// Insertar una nueva película con carga de imagen
movieController.insertMovie = async (req, res) => {
    const { titulo, descripcion, director, genero, anio, duracion } = req.body;
    let imageUrl = ""; // URL por defecto de la imagen

    // Verificar si hay una imagen en la solicitud
    if (req.file) {
        // Subir la imagen a Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "movies", // Carpeta donde se guardan las imágenes
            allowed_formats: ["jpg", "png", "jpeg", "gif", "webp", "avif"] // Formatos permitidos
        });

        // Obtener la URL segura de la imagen
        imageUrl = result.secure_url;
    }

    // Crear un nuevo registro de película con la imagen
    const newMovie = new movieModel({
        titulo,
        descripcion,
        director,
        genero,
        anio,
        duracion,
        imagen: imageUrl // Guardar la URL de la imagen
    });

    await newMovie.save();

    res.json({ message: "Movie saved", movie: newMovie });
};

export default movieController;
