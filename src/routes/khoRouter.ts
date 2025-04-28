import { Router } from 'express';
import { container } from 'tsyringe';
import { KhoController } from '../controllers/khoController';
import { UploadMultiService } from '../services/upload-multiService';

const khoRouter = Router();
const uploadMultiService = container.resolve(UploadMultiService);
const khoController = container.resolve(KhoController);
khoRouter.post('/themkho',uploadMultiService.multerMultiUpload,khoController.createKho.bind(khoController));
khoRouter.delete('/xoakho/:kho_id',khoController.deleteKho.bind(khoController));
khoRouter.get('/getall',khoController.getKhoAll.bind(khoController));
khoRouter.get('/getKhoByID/:id',khoController.getKhoByID.bind(khoController));

export default khoRouter;       