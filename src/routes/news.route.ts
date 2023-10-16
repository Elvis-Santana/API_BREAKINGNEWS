import { Router } from "express";
import { create ,findAll, topNews,findById} from "../controllers/news.controller.js";
import {authMeddlere} from '../middlewares/auth.middleware.js';
const router = Router();

router
.post('/',authMeddlere,create)
.get('/',findAll)
.get('/top',topNews)
.get("/:id",findById)

export default router;