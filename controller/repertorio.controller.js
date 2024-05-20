import { models } from "../models/repertorio.model.js";


const agregarCancion = async (req, res) => {
    try {
        const {titulo, artista, tono} = req.body;
        const nuevaCancion = {titulo, artista, tono};
        const cancion = await models.agregar(nuevaCancion);
        return res.json({cancion});
    } catch (error) {
        console.log(error);
    }
}

const listaCanciones = async ( req, res) => {
    try {
        const lista = await models.lista();
        return res.json({lista});
    } catch (error) {
        console.log(error);
    }
}

const editarCancion = async(req, res) => {
    try {
        const id = req.params.id
        const {titulo, artista, tono} = req.body;
        const cancionEditada = {id, titulo, artista, tono};
        const cancion = await models.editar(cancionEditada);
        res.json({cancion, status: 'edited'})
    } catch ( error){
        console.log(error);
    }
}

const eliminarCancion = async(req, res) => {
    try {
        const id = req.params.id;
        const cancion = await models.eliminar(id);
        res.json({cancion, status: 'deleted'})
    } catch( error ){
        console.log(error);
    }
}

export const controller = {
    agregarCancion,
    listaCanciones,
    editarCancion,
    eliminarCancion
}