
import pool from './connection.js';

export const obtenerPosts = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM posts');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener posts' });
  }
};

export const agregarPost = async (req, res) => {
    
  const { titulo, img, descripcion } = req.body;
  console.log("Datos recibidos en POST:", req.body);
  try {
    const result = await pool.query(
      'INSERT INTO posts (titulo, img, descripcion) VALUES ($1, $2, $3) RETURNING *',
      [titulo, img, descripcion]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar post' });
  }
};

export const actualizarLikes = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rowCount === 0) return res.status(404).json({ error: 'Post no encontrado' });
    res.json(result.rows[0]);
  } catch (error) {
     console.error("ERROR en POST /posts:", error); 
    res.status(500).json({ error: 'Error al actualizar likes' });
  }
};

export const eliminarPost = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM posts WHERE id = $1', [id]);
    if (result.rowCount === 0) return res.status(404).json({ error: 'Post no encontrado' });
    res.json({ mensaje: 'Post eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar post' });
  }
};
export const actualizarPost = async (req, res) => {
  const { id } = req.params;
  const { titulo, img, descripcion } = req.body;

  if (!titulo || !img || !descripcion) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    const result = await pool.query(
      'UPDATE posts SET titulo = $1, img = $2, descripcion = $3 WHERE id = $4 RETURNING *',
      [titulo, img, descripcion, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error en PUT /posts/:id", error);
    res.status(500).json({ error: "Error al actualizar el post" });
  }
};

