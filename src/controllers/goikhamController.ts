import { Request, Response } from 'express';
import { injectable, registry } from "tsyringe";
import { GoiKhamService } from '../services/goikhamService';
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
  cloud_name: 'dskbumohp',
  api_key: '325888745542338',
  api_secret: 'gcFF6WhzUcoWGrLlOmwevCaiy9A' // Click 'View Credentials' below to copy your API secret
});

@injectable()
export class GoiKhamController{
    constructor(private goiKhamService:GoiKhamService){}
    async getGoiKhamAll(req:Request, res:Response):Promise<void>{
        try{
            const data = await this.goiKhamService.getGoiKhamAll();
            if(data && data.length >0){
                res.json(data);
            }else{
                res.json({message:'Không lấy được danh sách '});
            }
        }catch(error:any){
            res.json({message:error.message});
        }
    }
    async createGoiKham(req:Request,res:Response):Promise<void>{
        try{
            let goikham = req.body as {ten_goi:string, mo_ta:string, hinh_anh:string}
            if(Array.isArray(req.files)){
                const result = await cloudinary.uploader.upload(req.files[0].path);
                goikham.hinh_anh = result.secure_url;
            }
            const results = await this.goiKhamService.createGoiKham(goikham);
            res.json({message:'Đã thêm gói khám thành công'})
        }catch(error:any){
            res.json({message:error.message});
        }
    }
    async updateGoiKham(req:Request,res:Response):Promise<void>{
        try{
            let goikham = req.body as {ten_goi:string, mo_ta:string, hinh_anh:string}
            if(Array.isArray(req.files)){
                const result = await cloudinary.uploader.upload(req.files[0].path);
                goikham.hinh_anh = result.secure_url;
            }
            const results = await this.goiKhamService.updateGoiKham(goikham);
            res.json({message:'Đã sửa gói khám thành công'})
        }catch(error:any){
            res.json({message:error.message});
        }
    }
    async deleteGoiKham(req:Request,res:Response):Promise<void>{
        try{
            let id = req.params.id;
            const results = await this.goiKhamService.deleteGoiKham(id);
            res.json({message:'Đã xóa thành công gói khám',success:true})
        }catch(error:any){
            res.json({message:error.message,success:false})
        }
    }
    async getGoiKhamByID(req:Request,res:Response):Promise<void>{
        try{
            let id = req.params.id;
            const goikham = await this.goiKhamService.getKhoiKhamByID(id);
            if(goikham){
                res.json(goikham);
            }else{
                res.json({message:'Bản ghi không tồn tại'})
            }
        }catch(error:any){
            res.json({message:error.message}); 
        }
    }
}