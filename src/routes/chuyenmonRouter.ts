import { Router } from "express";
import { container } from "tsyringe";
import { ChuyenMonController } from "../controllers/chuyenmonController";

const chuyenMonRouter = Router();
const chuyenMonController = container.resolve(ChuyenMonController);

chuyenMonRouter.get('/getall',chuyenMonController.getChuyenMonAll.bind(chuyenMonController));
 chuyenMonRouter.post('/themchuyenmon',chuyenMonController.createChuyenMon.bind(chuyenMonController));
chuyenMonRouter.put('/suachuyenmon',chuyenMonController.updateChuyenMon.bind(chuyenMonController));
chuyenMonRouter.delete('/xoachuyenmon/:id',chuyenMonController.deleteChuyenMon.bind(chuyenMonController));
chuyenMonRouter.get('/getchuyenmonbyid/:id',chuyenMonController.getChuyenMonByID.bind(chuyenMonController));
export default chuyenMonRouter;