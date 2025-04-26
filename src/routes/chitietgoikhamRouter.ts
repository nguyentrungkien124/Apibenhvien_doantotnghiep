import { Router } from 'express';
import { container } from 'tsyringe';

import { ChiTietGoiKhamController } from '../controllers/chitietgoikhamController';
import { UploadMultiService } from '../services/upload-multiService';
const chiTietGoiKhamRouter = Router();
const uploadMultiService = container.resolve(UploadMultiService);
const chitietgoikhamController = container.resolve(ChiTietGoiKhamController);
chiTietGoiKhamRouter.get('/getall', chitietgoikhamController.getChiTietGoiKhamAll.bind(chitietgoikhamController));
chiTietGoiKhamRouter.post('/themchitietgoikham',uploadMultiService.multerMultiUpload,chitietgoikhamController.createChiTietGoiKham.bind(chitietgoikhamController));
chiTietGoiKhamRouter.put('/suachitietgoikham',uploadMultiService.multerMultiUpload,chitietgoikhamController.updateChiTietGoiKham.bind(chitietgoikhamController));
chiTietGoiKhamRouter.get('/chitietgoikhambyid/:id',chitietgoikhamController.getChiTietGoiKhamByID.bind(chitietgoikhamController));
chiTietGoiKhamRouter.delete('/xoachitietgoikham/:id',chitietgoikhamController.deleteChiTietGoiKham.bind(chitietgoikhamController));
chiTietGoiKhamRouter.get('/getcmgoikham/:goi_kham_id/:pageIndex/:pageSize',chitietgoikhamController.getCMGoiKham.bind(chitietgoikhamController));
export default chiTietGoiKhamRouter;