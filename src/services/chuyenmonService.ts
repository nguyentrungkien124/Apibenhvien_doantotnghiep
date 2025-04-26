import { injectable } from 'tsyringe';
import { ChuyenMonRepository } from '../repositories/chuyenmonRepository';

@injectable()
export class ChuyenMonService{
    constructor(private chuyenMonService: ChuyenMonRepository){

    }
    async getChuyenMonAll():Promise<any>{
        return this.chuyenMonService.getChuyenMonAll();
    }
    async createChuyenMon(chuyenmon:any):Promise<any>{
        return this.chuyenMonService.createChuyenMon(chuyenmon);
    }
    async updateChuyenMon(chuyenmon:any):Promise<any>{
        return this.chuyenMonService.updateChuyenMon(chuyenmon);
    }
    async deleteChuyenMon(id:any):Promise<any>{
        return this.chuyenMonService.deleteChuyenMon(id);
    }
    async getChuyenMonByID(id:any):Promise<any>{
        return this.chuyenMonService.getChuyenMonByID(id);
    }
}