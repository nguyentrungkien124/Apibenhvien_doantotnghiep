import { Router } from "express";
import { container } from "tsyringe";
import { NhomBaiVietController } from "../controllers/nhombaivietController";
import { BaiVietController } from "../controllers/baivietController";
const nhomBaiVietRouter = Router();
const nhombaivietController = container.resolve(NhomBaiVietController);

nhomBaiVietRouter.get('/getall',nhombaivietController.getNhomBaiVietAll.bind(nhombaivietController));
nhomBaiVietRouter.post('/themnhombaiviet',nhombaivietController.createNhomBaiViet.bind(nhombaivietController));
nhomBaiVietRouter.put('/suanhombaiviet',nhombaivietController.updateNhomBaiViet.bind(nhombaivietController));
// Route xóa nhiều bản ghi
nhomBaiVietRouter.delete('/xoanhombaiviet', nhombaivietController.deleteNhomBaiViet.bind(nhombaivietController));

// Route xóa đơn lẻ
nhomBaiVietRouter.delete('/xoanhombaiviet/:id', nhombaivietController.deleteNhomBaiViet.bind(nhombaivietController));

nhomBaiVietRouter.get('/getbyid/:id',nhombaivietController.getNhomBaiVietByID.bind(nhombaivietController));
export default nhomBaiVietRouter;