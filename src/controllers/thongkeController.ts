import { injectable } from "tsyringe";
import { ThongkeService } from "../services/thongkeService";
import { Request, Response } from 'express';
@injectable() 
export class ThongkeController{
    constructor(private thongkeService:ThongkeService){}
    async GetTop10Doctors(req:Request,res:Response):Promise<void>{
        try{
            const data = await this.thongkeService.GetTop10Doctors();
            if(data && data.length>0){
                res.json(data);
            }else{
                res.json({message:'không tìm thấy dữ liệu'});
            }
        }catch(error:any){
            res.json({message:error.message});
        }
    }
    async ThongKeTrangThietBi(req:Request,res:Response):Promise<void>{
        try{
            const data = await this.thongkeService.ThongKeTrangThietBi();
            if(data && data.length>0){
                res.json(data);
            }else{
                res.json({message:'không tìm thấy dữ liệu'});
            }
        }catch(error:any){
            res.json({message:error.message});
        }
    }
  
}