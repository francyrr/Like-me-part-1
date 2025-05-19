import express from 'express';
import cors from 'cors';
import postsRoutes from './postRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());


app.use('/posts', postsRoutes);

app.listen(3000, () => {
  console.log('Servidor escuchando en puerto 3000');
});