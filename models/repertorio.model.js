import { pool } from "../connection/connection.js";


const agregar = async (cancion) => {
    const query = {
        text: 'INSERT INTO canciones(titulo, artista, tono) VALUES($1, $2, $3) RETURNING *;',
        values: [cancion.titulo, cancion.artista, cancion.tono]
    };
    const {rows} = await pool.query(query);
    return rows
}

const lista = async() => {
    const query = {
        text: 'SELECT * FROM canciones;'
    };
    const {rows} = await pool.query(query);
    return rows
}

const editar = async (cancionEdit) => {
    const query = {
        text: 'UPDATE canciones SET titulo= $1, artista = $2, tono = $3 WHERE id = $4 RETURNING *',
        values: [cancionEdit.titulo, cancionEdit.artista, cancionEdit.tono, cancionEdit.id]
    };
    const {rows} = await pool.query(query);
    return rows;
}

const eliminar = async (id) => {
    const query = {
        text: 'DELETE FROM canciones WHERE ID = $1 RETURNING *',
        values: [id]
    };
    const {rows} = await pool.query(query);
    return rows;
}
export const models = {
    agregar,
    lista,
    editar,
    eliminar
}