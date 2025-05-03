import { Request, Response } from 'express';
import { injectable } from "tsyringe";
import { TrangThietBiService } from '../services/thietbiService';
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
  cloud_name: 'dskbumohp',
  api_key: '325888745542338',
  api_secret: 'gcFF6WhzUcoWGrLlOmwevCaiy9A' // Click 'View Credentials' below to copy your API secret
});

@injectable()
export class TrangThietBiController{
    constructor(private trangThietBiService: TrangThietBiService){}
    async getTrangThietBiAll(req:Request,res:Response):Promise<any>{
        try{
            const data = await this.trangThietBiService.getTrangThietBiAll();
            if(data && data.length>0){
                res.json(data);
            }else{
                res.json({message:'Không có danh sách trong naytf '})
            }
        }catch(error:any){
            res.json({message:error.message});
        }
    }

    async createTrangThietBi(req:Request,res:Response):Promise<void>{
        try{
            let trangthietbi = req.body as {ten_thiet_bi:string , hinh_anh:string , ma_thiet_bi:string,so_luong:string,khoa_id:string,trang_thai:string,nhom_id:string}
            if (Array.isArray(req.files)){
                const result = await cloudinary.uploader.upload(req.files[0].path);
                trangthietbi.hinh_anh = result.secure_url;
            }
            const results = await this.trangThietBiService.createTrangThietBi(trangthietbi);
            res.json({message:'Đã thêm trang thiết bị thành công'})
        }catch(error:any){
            res.json({message:error.message});
        }
    }

    async updateTrangThietBi(req:Request,res:Response):Promise<void>{
        try{
            let trangthietbi = req.body as {id:string,ten_thiet_bi:string,hinh_anh:string , ma_thiet_bi:string,so_luong:string,khoa_id:string,trang_thai:string,nhom_id:string}
            if(Array.isArray(req.files)){
                const result = await cloudinary.uploader.upload(req.files[0].path);
                trangthietbi.hinh_anh = result.secure_url;
              }
            const results = await this.trangThietBiService.updateTrangThietBi(trangthietbi);
            res.json({message:'Đã sửa trang thiết bị thành công'});
        }catch(error:any){
            res.json({message:error.message});
        }
    }

    async deleteTrangThietBi(req:Request,res:Response):Promise<void>{
        try{
            let id = req.params.id;
            const results = await this.trangThietBiService.deleteTrangThietBi(id);
            res.json({message:'Đã xóa trang thiết bị thành công',success:true})

        }catch(error:any){
            res.json({message:error.message,success:false});
        }
    }
    async getTrangThietBiByID(req:Request,res:Response):Promise<void>{
        try{
            let id = req.params.id;
            const trangthietbi = await this.trangThietBiService.getTrangThietBiByID(id);
            if(trangthietbi){
                res.json(trangthietbi);
            }else{
                res.json({message:'Bản ghi không tồn tại'});
            }
        }catch(error:any){
            res.json({message:error.message});
        }
    }
}