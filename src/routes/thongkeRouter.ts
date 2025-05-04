import { Router } from "express";
import { container } from "tsyringe";
import { ThongkeController } from "../controllers/thongkeController";

const thongkeRouter = Router();
const thongkeController = container.resolve(ThongkeController);

thongkeRouter.get('/GetTop10Doctors',thongkeController.GetTop10Doctors.bind(thongkeController));


export default thongkeRouter;   