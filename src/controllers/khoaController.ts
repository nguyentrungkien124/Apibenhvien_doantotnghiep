import { Request, Response } from 'express';
import { injectable, registry } from "tsyringe";
import { KhoaService } from '../services/khoaService';
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
  cloud_name: 'dskbumohp',
  api_key: '325888745542338',
  api_secret: 'gcFF6WhzUcoWGrLlOmwevCaiy9A' // Click 'View Credentials' below to copy your API secret
});

@injectable()
export class KhoaController{
    constructor (private khoaService : KhoaService){}
    async getKhoaAll(req:Request,res:Response):Promise<any>{
        try{
            const data = await this.khoaService.getKhoaAll();
            if(data && data.length > 0 ){
                res.json(data);
            }else{
                res.json({message:"Không lấy được danh sách"})
            }
        }catch(error:any){
            res.json({message:error.message});
        }
    }

    async createKhoa(req:Request, res:Response):Promise<void>{
        try{
            let khoa = req.body as {ten:string, mo_ta:string, hinh_anh:string};
            if(Array.isArray(req.files)){
                const result = await cloudinary.uploader.upload(req.files[0].path)
                khoa.hinh_anh = result.secure_url;
            }
            const results = await this.khoaService.createKhoa(khoa);
            res.json({message:'Đã thêm khoa thành công'})
        }catch(error:any){
            res.json({message: error.message})
        }
    }
    async updateKhoa(req:Request, res:Response):Promise<void>{
        try{
            let khoa = req.body as {id:string, ten:string, mo_ta:string, hinh_anh:string};
            if(Array.isArray(req.files)){
                const result = await cloudinary.uploader.upload(req.files[0].path)
                khoa.hinh_anh = result.secure_url;
            }
            const results = await this.khoaService.updateKhoa(khoa);
            res.json({message:'Đã thêm sửa khoa thành công'})
        }catch(error:any){
            res.json({message: error.message})
        }
    }
    async deleteKhoa(req:Request, res:Response):Promise<void>{
        try{
            let id = req.params.id;
            const results = await this.khoaService.deleteKhoa(id);
            res.json({message:'Đã xóa thành công khoa',success:true});
        }catch(error:any){
            res.json({message:error})
        }
    }
    async getKhoaByID(req:Request, res:Response):Promise<void>{
        try{
            let id = req.params.id;
            const khoa = await this.khoaService.getKhoaByID(id);
            if(khoa){
                res.json(khoa);
            }else{
                res.json({message:'Bản ghi không tồn tại'});
            }
        }catch(error:any){
            res.json({message:error.message});
        }
    }
}