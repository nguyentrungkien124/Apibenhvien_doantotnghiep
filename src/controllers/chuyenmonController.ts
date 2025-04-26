import { Request, Response } from 'express';
import { injectable } from "tsyringe";
// import { NhomThietBiService } from '../services/nhomthietbiService';
import { isElementAccessExpression } from 'typescript';
import { ChuyenMonService } from '../services/chuyenmonService';

@injectable()
export class ChuyenMonController{
    constructor(private chuyenMonService: ChuyenMonService){

    }
    async getChuyenMonAll(req:Request,res:Response):Promise<void>{
        try{
            const data = await this.chuyenMonService.getChuyenMonAll();
            if(data && data.length>0){
                res.json(data);
            }else{
                res.json({message:'không có danh sách trong csdl'});
            }
        }catch(error:any){
            res.json({message:error.message})
        }
    }
    async createChuyenMon(req:Request, res:Response):Promise<void>{
        try{
            let chuyenmon = req.body as {ten_chuyen_mon:string};
            const results = await this.chuyenMonService.createChuyenMon(chuyenmon);
            res.json({message:'Đã thêm chuyên môn thành công'})
        }catch(error:any){
            res.json({message:error.message});
        }
    }
    
    async updateChuyenMon(req:Request,res:Response):Promise<void>{
        try{
            let chuyenmon = req.body as {id:string,ten_chuyen_mon:string};
            const results = await this.chuyenMonService.updateChuyenMon(chuyenmon);
            res.json({message:'Đã sửa chuyên môn thành công'})
        }catch(error:any){
            res.json({message:error.message});
        }
    }
    async deleteChuyenMon(req:Request,res:Response):Promise<void>{
        try{
            let id = req.params.id;
            const results = await this.chuyenMonService.deleteChuyenMon(id)
            res.json({message:'Đã xóa chuyên môn thành công'})
        }catch(error:any){
            res.json({message:error.message});
        }
    }
    async getChuyenMonByID(req:Request,res:Response):Promise<void>{
        try{
            let id = req.params.id;
            const chuyenmon = await this.chuyenMonService.getChuyenMonByID(id);
            if(chuyenmon){
                res.json(chuyenmon);
            }else{
                res.json({message:'Bản ghi không tồn tại'})
            }
        }catch(error:any){
            res.json({message:error.message});
        }
    }
}