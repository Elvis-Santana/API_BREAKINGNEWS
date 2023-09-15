import { Router } from "express";
import { soma } from "../controllers/user.controller.js";

const route = Router();

route.get('/soma',soma)


export default route;