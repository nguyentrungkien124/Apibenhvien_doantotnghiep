import e, { Request, Response } from 'express';
import { injectable, registry } from "tsyringe";
import { NhaPhanPhoiService } from '../services/nhaphanphoiService';
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
  cloud_name: 'dskbumohp',
  api_key: '325888745542338',
  api_secret: 'gcFF6WhzUcoWGrLlOmwevCaiy9A' // Click 'View Credentials' below to copy your API secret
});

@injectable()
export class NhaPhanPhoiController{
    constructor(private nhaPhanPhoiService : NhaPhanPhoiService){}

    async getNhaPhanPhoiAll(req:Request,res:Response):Promise<void>{
        try{
            const data = await this.nhaPhanPhoiService.getNhaPhanPhoiAll();
            if(data && data.length >0){
                res.json(data);
            }else{
                res.json({message:'Không lấy được danh sách'});
            }
        }catch(error:any){
            res.json({message:error.message});
        }
    }

    async createNhaPhanPhoi(req:Request,res:Response):Promise<any>{
        try{
            const nhaphanphoi =  req.body as {ten_nha_phan_phoi:string,dia_chi:string,so_dien_thoai:string,email:string,ghi_chu:string,hinh_anh:string}
            if(Array.isArray(req.files)){
                const result = await cloudinary.uploader.upload(req.files[0].path);
                nhaphanphoi.hinh_anh = result.secure_url;
            }
            const results = await this.nhaPhanPhoiService.createNhaPhanPhoi(nhaphanphoi);
            res.json({message:'Đã thêm nhà phân phối thành công'})
        }
        catch(error:any){
            res.json({message:error.message});
        }
    }
    async updateNhaPhanPhoi(req:Request,res:Response):Promise<any>{
        try{
            const nhaphanphoi = req.body as {id:string,ten_nha_phan_phoi:string,dia_chi:string,so_dien_thoai:string,email:string,ghi_chu:string,hinh_anh:string}
            if(Array.isArray(req.files)){
                const result = await cloudinary.uploader.upload(req.files[0].path);
                nhaphanphoi.hinh_anh = result.secure_url;
            }
            const results = await this.nhaPhanPhoiService.updateNhaPhanPhoi(nhaphanphoi);
            res.json({message:'Đã sủa nhà phân phối thành công'})
        }
        catch(error:any){
            res.json({message:error.message});
        }
    }
    async deleteNhaPhanPhoi(req:Request,res:Response):Promise<any>{
        try{
            const id = req.params.id;
            const results = await this.nhaPhanPhoiService.deleteNhaPhanPhoi(id);
            res.json({message:'Đã xóa bài viết thành công',success:true})

        }catch(error:any){
            res.json({message:error.message,success:false});
        }
    }
    async getNhaPhanPhoiByID(req:Request,res:Response):Promise<any>{
        try{
            
            let id = req.params.id;
            const nhaphanphoi = await this.nhaPhanPhoiService.getNhaPhanPhoiByID(id);
            if(nhaphanphoi){
                res.json(nhaphanphoi);
            }else{
                res.json({message:'Bản ghi không tồn tại'});
            }
        }catch(error:any){
            res.json({message:error.message});
        }
    }
}