import express from 'express';
import cors from 'cors';
import pool from './connection.js';
const app = express();
app.use(cors());

app.use(express.json());

app.listen(3000, () => {
  console.log('Servidor escuchando en puerto 3000');
});
app.get('/posts', async (req, res)=>{
    try {
    const posts = await pool.query('SELECT * FROM posts')
    res.json(posts.rows);
}
catch (error){
    console.error('Error en GET /posts:', error);
    res.status(500).json({error: 'Error interno del servidor'});

}
});

app.post('/posts', async (req, res)=> {
    const {titulo, img, descripcion}= req.body;
try {
    const result = await pool.query('INSERT INTO posts (titulo, img, descripcion) VALUES ($1, $2, $3) RETURNING *',
        [titulo, img, descripcion]
    );
    res.status(201).json(result.rows[0]);

} catch (error){
    console.error('Error en POST /posts',error);
    res.status(500).json({error: 'Error al agregar post'});

}
});
