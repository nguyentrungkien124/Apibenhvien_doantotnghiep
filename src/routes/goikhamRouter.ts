import { Router } from 'express';
import { container } from 'tsyringe';
import { GoiKhamController } from '../controllers/goikhamController';
import { UploadMultiService } from '../services/upload-multiService';
const goikhamRouter = Router();
const uploadMultiService = container.resolve(UploadMultiService);
const goikhamController = container.resolve(GoiKhamController);
goikhamRouter.get('/getall', goikhamController.getGoiKhamAll.bind(goikhamController));
goikhamRouter.post('/themgoikham',uploadMultiService.multerMultiUpload,goikhamController.createGoiKham.bind(goikhamController));
goikhamRouter.put('/suagoikham',uploadMultiService.multerMultiUpload,goikhamController.updateGoiKham.bind(goikhamController));
goikhamRouter.delete('/xoagoikham/:id',goikhamController.deleteGoiKham.bind(goikhamController));
goikhamRouter.get('/goikhambyid/:id',goikhamController.getGoiKhamByID.bind(goikhamController));
export default goikhamRouter