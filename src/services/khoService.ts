import { injectable } from 'tsyringe';
import { KhoRepository } from '../repositories/khoRepository';

@injectable()
export class KhoService{
    constructor(private khoService: KhoRepository){}
    async createKho(kho:any):Promise<any>{
        return this.khoService.createKho(kho);
    }
    async deleteKho(kho_id:any):Promise<any>{
        return this.khoService.deleteKho(kho_id);
    }
    async getKhoAll():Promise<any>{
        return this.khoService.getKhoAll();
    }
    async getKhoByID(kho_id:any):Promise<any>{
        return this.khoService.getKhoByID(kho_id);
    }
}