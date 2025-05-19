import express from 'express';
import {
  obtenerPosts,
  agregarPost,
  actualizarLikes,
  eliminarPost,
  actualizarPost
} from './postsController.js';

const router = express.Router();

router.get('/', obtenerPosts);
router.post('/', agregarPost);
router.put('/like/:id', actualizarLikes);
router.delete('/:id', eliminarPost);
router.put('/:id', actualizarPost);
export default router;
