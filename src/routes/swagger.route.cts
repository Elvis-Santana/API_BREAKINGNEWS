import { Router } from "express";
const swaggerUi =require("swagger-ui-express") ;
const swaggerDocument = require('../swagger.json');
const router = Router();

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));
export default router;
