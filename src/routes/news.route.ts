import { Router } from "express";
import {
    create,
    findAll,
    topNews,
    findById,
    searchByTitle,
    byUser,
    update,
    erase,
    likeNews,
    addComment,
    deleteComment,
} from "../controllers/news.controller.js";
import { authMeddlere } from '../middlewares/auth.middleware.js';
const router = Router();

router
    .post('/', authMeddlere, create)
    .get('/', findAll)
    .get('/top', topNews)
    .get('/search', searchByTitle)
    .get('/byUser', authMeddlere, byUser)
    .get("/:id", authMeddlere, findById)
    .patch("/:id", authMeddlere, update)
    .delete("/:id", authMeddlere, erase)
    .patch("/like/:id", authMeddlere, likeNews)
    .patch("/comment/:id", authMeddlere, addComment)
    .patch("/comment/:idNews/:idComment", authMeddlere, deleteComment)


export default router;