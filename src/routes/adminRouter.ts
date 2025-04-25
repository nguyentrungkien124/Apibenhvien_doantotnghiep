import { Router } from 'express';
import { container } from 'tsyringe';
import { UserController } from '../controllers/userController';
import { UploadMultiService } from '../services/upload-multiService';
import { AdminController } from '../controllers/adminController';
const adminRouter = Router();
const adminController = container.resolve(AdminController);
const uploadMultiService = container.resolve(UploadMultiService);
adminRouter.post('/loginadmin', adminController.authenticate.bind(adminController));

export default adminRouter;