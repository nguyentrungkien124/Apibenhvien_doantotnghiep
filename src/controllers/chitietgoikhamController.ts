import { Request, Response } from 'express';
import { injectable, registry } from "tsyringe";

import { ChiTietGoiKhamService } from '../services/chitietgoikhamService';
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
  cloud_name: 'dskbumohp',
  api_key: '325888745542338',
  api_secret: 'gcFF6WhzUcoWGrLlOmwevCaiy9A' // Click 'View Credentials' below to copy your API secret
});

@injectable() 
export class ChiTietGoiKhamController{
    constructor(private chiTietGoiKhamService: ChiTietGoiKhamService){}
    async getChiTietGoiKhamAll(req:Request,res:Response){
        try{
            const data = await this.chiTietGoiKhamService.getChiTietGoiKhamAll();
            if(data && data.length>0){
                res.json(data);
            }else{
                res.json({message:'Không lấy được danh sách'});
            }
        }catch(error:any){
            res.json({message:error.message});
        }
    }
    async createChiTietGoiKham(req:Request,res:Response){
        try{
            let chitietgoikham = req.body as {goi_kham_id:string,ten_chi_tiet:string,mo_ta:string,gia:string,gia_giam:string,hinh_anh:string};
            if(Array.isArray(req.files)){
                const result = await cloudinary.uploader.upload(req.files[0].path);
                chitietgoikham.hinh_anh = result.secure_url;
            }
            const results = await this.chiTietGoiKhamService.createChiTietGoiKham(chitietgoikham);
            res.json({message:'Đã thêm chi tiết gói khám thành công'});
        }catch(error:any){
            res.json({message:error.message});
        }
    }
    async updateChiTietGoiKham(req:Request,res:Response){
        try{
            let chitietgoikham = req.body as {id:string,goi_kham_id:string,ten_chi_tiet:string,mo_ta:string,gia:string,gia_giam:string,hinh_anh:string};
            if(Array.isArray(req.files)){
                const result = await cloudinary.uploader.upload(req.files[0].path);
                chitietgoikham.hinh_anh = result.secure_url;
            }
            const results = await this.chiTietGoiKhamService.updateChiTietGoiKham(chitietgoikham);
            res.json({message:'Đã sửa chi tiết gói khám thành công'});
        }catch(error:any){
            res.json({message:error.message});
        }
    }
    async getChiTietGoiKhamByID(req:Request,res:Response):Promise<any>{
        try{
            const id = req.params.id;
            const chitietgoikham = await this.chiTietGoiKhamService.getChiTietGoiKhamByID(id);
            if(chitietgoikham){
                res.json(chitietgoikham);
            }else{
                res.json({message:'Bản ghi không tồn tại'});
            }
        }catch(error:any){
            res.json({message:error.message});
        }
        
    }
    async deleteChiTietGoiKham(req:Request,res:Response):Promise<any>{
        try{
            const id = req.params.id;
            const results = await this.chiTietGoiKhamService.deleteChiTietGoiKham(id);
            res.json({message:'Đã xóa chi tiết gói khám thành công',success:true});
        }catch(error:any){
            res.json({message:error.message,success:false});
        }

    }
    async getCMGoiKham(req:Request,res:Response):Promise<any>{
       try{
        const goi_kham_id = parseInt(req.params.goi_kham_id);
        const pageIndex = parseInt(req.params.pageIndex, 10);
        const pageSize = parseInt(req.params.pageSize, 10);

        if (isNaN(goi_kham_id) || isNaN(pageIndex) || isNaN(pageSize)){
            res.status(400).json({message:'Thông tin đầu vào không hợp lệ'});
            return;
        }
        const chitietgoikham = await this.chiTietGoiKhamService.getCMGoiKham(goi_kham_id,pageIndex,pageSize)

        if(chitietgoikham){
            res.json(chitietgoikham);
        }else{
            res.json({message:'Bản ghi không tồn tại'});
        }
       }catch(error:any){
        res.json({messaage:error.messaage});
       }
    
    }
}
