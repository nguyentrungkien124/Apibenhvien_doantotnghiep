import { Router } from "express";
import { container } from "tsyringe";

import { DanhgiaController } from "../controllers/danhgiaController";

const danhGiaRouter = Router();
const danhgiaController = container.resolve(DanhgiaController);

// danhGiaRouter.get('/getall',danhgiaController.get.bind(danhgiaController));
 danhGiaRouter.post('/themdanhgia',danhgiaController.createDanhgia.bind(danhgiaController));

export default danhGiaRouter;