import { Router } from "express";
import { container } from "tsyringe";

import { LichLamViecController } from "../controllers/lichlamviecController";

const lichLamViecRouter = Router();
const lichlamviecController = container.resolve(LichLamViecController);

// lichLamViecRouter.get('/getall',lichlamviecController.getNhomBaiVietAll.bind(lichlamviecController));
lichLamViecRouter.post('/themlichlamviec',lichlamviecController.createLichLamViecBacSi.bind(lichlamviecController));
// lichLamViecRouter.put('/suanhombaiviet',lichlamviecController.updateNhomBaiViet.bind(lichlamviecController));
// lichLamViecRouter.delete('/xoanhombaiviet/:id',lichlamviecController.deleteNhomBaiViet.bind(lichlamviecController));
lichLamViecRouter.get('/getlichlamviecbyidbs/:id',lichlamviecController.getLichLamViecByBacSiID.bind(lichlamviecController));
lichLamViecRouter.get('/getLichLamViecByBacSiAndDate/:bac_si_id/:ngay_lam_viec/:pageIndex/:pageSize',lichlamviecController.getLichLamViecByBacSiAndDate.bind(lichlamviecController));
export default lichLamViecRouter;