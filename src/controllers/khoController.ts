import { Request, Response } from 'express';
import { injectable, registry } from "tsyringe";

import { KhoService } from '../services/khoService';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dskbumohp',
  api_key: '325888745542338',
  api_secret: 'gcFF6WhzUcoWGrLlOmwevCaiy9A' // Click 'View Credentials' below to copy your API secret
});

@injectable()
export class KhoController{
    constructor(private khoService: KhoService){}
    async createKho(req:Request,res:Response):Promise<any>{
        try{
            let kho:any={};
            kho.ten_san_pham = req.body.ten_san_pham,
            kho.loai_san_pham = req.body.loai_san_pham,
            kho.so_luong_tong = req.body.so_luong_tong,
            kho.don_vi_tinh = req.body.don_vi_tinh,
            kho.trang_thai = req.body.trang_thai,  
            kho.mo_ta = req.body.mo_ta, 
            kho.hinh_anh = req.body.hinh_anh,
            kho.list_json_chi_tiet_kho = JSON.stringify(req.body.list_json_chi_tiet_kho);
            if (Array.isArray(req.files)) {
                const result = await cloudinary.uploader.upload(req.files[0].path);
                kho.hinh_anh = result.secure_url;
              }
              const results = await this.khoService.createKho(kho);
              res.json({message:'Đã thêm kho thành công'})
        }catch(error:any){
            res.json({message:error.message});
        }

    }
    async deleteKho(req:Request,res:Response):Promise<any>{
        try{
            const kho_id = req.params.kho_id;
            const results = await this.khoService.deleteKho(kho_id);
            res.json({message:'Đã xóa kho thành công',success:true})
        }catch(error:any){
            res.json({message:error.message,success:false});
        }
    }
    
    async getKhoAll(req:Request,res:Response):Promise<any>{
        try{
            const data = await this.khoService.getKhoAll();
            if(data && data.length >0){
                res.json(data);
            }else{
                res.json({message:'không lấy được danh sách'});
            }
        }catch(error:any){
            res.json({message:error.message});
        }
    }
    async getKhoByID(req:Request,res:Response):Promise<void>{
        try{
            let kho_id = req.params.id;
            const kho = await this.khoService.getKhoByID(kho_id);
            if(kho){
                res.json(kho);
            }else{
                res.json({message:'Bản ghi không tồn tại'});
            }
        }catch(error:any){
            res.json({message:error.message});
        }
    }
}