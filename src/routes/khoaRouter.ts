import { Router } from 'express';
import { container } from 'tsyringe';

import { KhoaController } from '../controllers/khoaController';
import { UploadMultiService } from '../services/upload-multiService';
const khoaRouter = Router();
const uploadMultiService = container.resolve(UploadMultiService);
const khoaController = container.resolve(KhoaController);
khoaRouter.get('/getall', khoaController.getKhoaAll.bind(khoaController));
khoaRouter.post('/themkhoa',uploadMultiService.multerMultiUpload,khoaController.createKhoa.bind(khoaController));
khoaRouter.put('/suakhoa',uploadMultiService.multerMultiUpload,khoaController.updateKhoa.bind(khoaController));
khoaRouter.delete('/xoakhoa/:id',khoaController.deleteKhoa.bind(khoaController));
khoaRouter.get('/getkhoabyid/:id',khoaController.getKhoaByID.bind(khoaController));
// baivietRouter.get('/getbaivietCM/:loai_bai_viet/:pageIndex/:pageSize',baivietController.getBaiVietCM.bind(baivietController));
export default khoaRouter;