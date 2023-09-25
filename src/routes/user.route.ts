import { Router } from "express";
import {create} from '../controllers/user.controller.js'
const route = Router();

route.post('/',create)


export default route;