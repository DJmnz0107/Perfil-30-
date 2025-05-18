import express from "express";
import moviesController from "../controllers/movieController.js"
import multer from "multer";

const router = express.Router();

//configurar una carpeta en local que guarde el registro de las imagenes subidas

const upload = multer({dest: "public/"})

router.route("/")
.get(moviesController.getMovies)
.post (upload.single("imagen"), moviesController.insertMovie)
router.route("/:id").put(upload.single("imagen"), moviesController.updateMovie)
.delete(moviesController.deleteMovie)



export default router;