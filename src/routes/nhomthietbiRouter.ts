import { Router } from "express";
import { container } from "tsyringe";

import { NhomThietBiController } from "../controllers/nhomthietbiController";
const nhomThietBiRouter = Router();
const nhomThietBiController = container.resolve(NhomThietBiController);

nhomThietBiRouter.get('/getall',nhomThietBiController.getNhomThietBiAll.bind(nhomThietBiController));
nhomThietBiRouter.post('/themnhomthietbi',nhomThietBiController.createNhomThietBi.bind(nhomThietBiController));
nhomThietBiRouter.put('/suanhomthietbi',nhomThietBiController.updateNhomThietBi.bind(nhomThietBiController));
nhomThietBiRouter.delete('/xoanhomthietbi/:id',nhomThietBiController.deleteNhomThietBi.bind(nhomThietBiController));
nhomThietBiRouter.get('/getthietbibyid/:id',nhomThietBiController.getNhomThietBiByID.bind(nhomThietBiController));
export default nhomThietBiRouter;