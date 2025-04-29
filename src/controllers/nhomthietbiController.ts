import { Request, Response } from 'express';
import { injectable } from "tsyringe";
import { NhomThietBiService } from '../services/nhomthietbiService';
import { isElementAccessExpression } from 'typescript';

@injectable()
export class NhomThietBiController{
    constructor(private nhomThietBiService: NhomThietBiService){}

    async getNhomThietBiAll(req:Request,res:Response):Promise<void>{

        try{
            const data = await this.nhomThietBiService.getNhomThietBiAll();
            if(data && data.length>0){
                res.json(data);
            }else{
                res.json({message:'không có danh sách trong dữ liệu '});
            }
        }catch(error:any){
            res.json({message:error.message});
        }
    }
    async createNhomThietBi(req:Request, res:Response):Promise<void>{
        try{
            let nhomthietbi = req.body  as {ten_nhom:string,trang_thai:string};
            const results = await this.nhomThietBiService.createNhomThietBi(nhomthietbi);
            res.json({message:'Đã thêm thành công nhóm thiết bị',results:true})
        }catch(error:any){
            res.json({message:error.message});
        }
    }
    async updateNhomThietBi(req:Request, res:Response):Promise<void>{
        try{
            let nhomthietbi =req.body as {id:string,ten_nhom:string,trang_thai:string};
            const results = await this.nhomThietBiService.updateNhomThietBi(nhomthietbi);
            res.json({message:'Đã sửa thành công nhóm thiết bị',results:true})
        }catch(error:any){
            res.json({message:error.message});
        }
    }
    async deleteNhomThietBi(req:Request,res:Response):Promise<void>{
        try{
            let id =req.params.id;
            const results = await this.nhomThietBiService.deleteNhomThietBi(id);
            res.json({message:'Đã xóa nhóm thiết bị thành công',success:true});

        }catch(error:any){
            res.json({message:error.message,success:false})
        }
    }
    async getNhomThietBiByID(req:Request,res:Response):Promise<void>{
        try{
            let id = req.params.id;
            const nhomthietbi = await this.nhomThietBiService.getNhomThietBiByID(id);
            if(nhomthietbi){
                res.json(nhomthietbi);
            }else{
                res.json({message:'Bản ghi không tồn tại'});

            }
        }catch(error:any){
            res.json({message:error.message});
        }
    }
}