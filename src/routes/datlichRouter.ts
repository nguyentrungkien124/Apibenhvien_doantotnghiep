import { Router } from "express";
import { container } from "tsyringe";
import { DatLichController } from "../controllers/datlichController";
const datLichRouter = Router();
const datLichController = container.resolve(DatLichController);


datLichRouter.post('/them',datLichController.createDatLich.bind(datLichController));
// datLichRouter.post('/send-test-email', datLichController.testEmail.bind(datLichController));
datLichRouter.put('/suatrangthailichkham',datLichController.updateTrangThaiLichKham.bind(datLichController));
datLichRouter.put('/updateDaThanhToan',datLichController.UpdateDaThanhToan.bind(datLichController));
datLichRouter.put('/tuchoikham',datLichController.TuChoiKham.bind(datLichController));
datLichRouter.post('/HuyPhieuKham',datLichController.HuyPhieuKham.bind(datLichController));
datLichRouter.get('/getLichKhamByBacSi/:bac_si_id/:pageIndex/:pageSize',datLichController.getLichKhamByBacSi.bind(datLichController));
datLichRouter.get('/getLichKhamByNguoiDung/:nguoi_dung_id/:pageIndex/:pageSize',datLichController.GetLichKhamByNguoiDung.bind(datLichController));
datLichRouter.post('/createphong',datLichController.createJitsiMeetLink.bind(datLichController));
export default datLichRouter;