import { Router } from "express";
import { container } from "tsyringe";
import { ThongkeController } from "../controllers/thongkeController";

const thongkeRouter = Router();
const thongkeController = container.resolve(ThongkeController);

thongkeRouter.get('/GetTop10Doctors',thongkeController.GetTop10Doctors.bind(thongkeController));

thongkeRouter.get('/ThongKeTrangThietBi',thongkeController.ThongKeTrangThietBi.bind(thongkeController));

thongkeRouter.get('/ThongKeTongSoBacSi',thongkeController.ThongKeTongSoBacSi.bind(thongkeController));

thongkeRouter.get('/ThongKeTongLichHen',thongkeController.ThongKeTongLichHen.bind(thongkeController));
thongkeRouter.get('/ThongKeTongKhachHang',thongkeController.ThongKeTongKhachHang.bind(thongkeController));
export default thongkeRouter;   