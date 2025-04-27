import { injectable } from 'tsyringe';
import { KhoaRepository } from '../repositories/khoaRepository';

@injectable()
export class KhoaService{
    constructor(private khoaService: KhoaRepository){}
    async getKhoaAll():Promise<any>{
        return this.khoaService.getKhoaAll();
    }
    async createKhoa(khoa:any):Promise<any>{
        return this.khoaService.createKhoa(khoa);
    }
    async updateKhoa(khoa:any):Promise<any>{
        return this.khoaService.updateKhoa(khoa);
    }
    async deleteKhoa(id:any):Promise<any>{
        return this.khoaService.deleteKhoa(id);
    }
    async getKhoaByID(id:any):Promise<any>{
        return this.khoaService.getKhoaByID(id);
    }
}