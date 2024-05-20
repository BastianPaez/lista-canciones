import { Router } from "express";
import { controller } from "../controller/repertorio.controller.js";


const router = Router();


router.post('/cancion', controller.agregarCancion);
router.get('/canciones', controller.listaCanciones);
router.put('/cancion/:id', controller.editarCancion);
router.delete('/cancion/:id', controller.eliminarCancion)


export default router;  