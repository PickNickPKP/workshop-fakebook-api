import express from 'express';
import * as postController from '../controllers/post.controller.js';
import upload from '../middlewares/upload.middleware.js';

const postRoute = express.Router();
// Route to get all posts
postRoute.get('/', postController.getAllPosts);
// Route to create a new post
postRoute.post('/', upload.single('image') ,postController.createPost);
// Route to update a post by ID
postRoute.put('/:id', postController.updatePost);
// Route to delete a post by ID
postRoute.delete('/:id', postController.deletePost);     


export default postRoute;