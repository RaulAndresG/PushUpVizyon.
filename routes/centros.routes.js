import { check } from "express-validator";
import { Router } from "express";
import {getCargos, postCargo, deleteCargo, putCargo} from "../controllers/cargo.controllers.js"

const router = Router();

router.get('/',getCargos)

router.post('/',postCargo)

router.delete('/:id',deleteCargo)

router.patch('/:id',putCargo)

export default router;




