import { injectable } from 'tsyringe';
import { ChiTietGoiKhamRepository } from '../repositories/chitietgoikhamRepository';

@injectable()
export class ChiTietGoiKhamService{
    constructor(private chiTietGoiKhamService:ChiTietGoiKhamRepository){}
    async getChiTietGoiKhamAll():Promise<any>{
        return this.chiTietGoiKhamService.getChiTietGoiKhamAll();
    }
    async createChiTietGoiKham(chitietgoikham:any):Promise<any>{
        return this.chiTietGoiKhamService.createChiTietGoiKham(chitietgoikham);

    }
    async updateChiTietGoiKham(chitietgoikham:any):Promise<any>{
        return this.chiTietGoiKhamService.updateChiTietGoiKham(chitietgoikham);
    }
    async getChiTietGoiKhamByID(id:any):Promise<any>{
        return this.chiTietGoiKhamService.getChiTietGoiKhamByID(id);
    }
    async deleteChiTietGoiKham(id:any):Promise<any>{
        return this.chiTietGoiKhamService.deleteChiTietGoiKham(id);
    }
    async getCMGoiKham(goi_kham_id:number,pageIndex:number,pageSize:number):Promise<any>{
        return this.chiTietGoiKhamService.getCMGoiKham(goi_kham_id,pageIndex,pageSize);
    }
}
