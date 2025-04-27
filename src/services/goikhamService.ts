import { injectable } from 'tsyringe';
import { GoiKhamRepository } from '../repositories/goikhamRepository';

@injectable()
export class GoiKhamService{
    constructor(private goiKhamService: GoiKhamRepository)
    {}
    async getGoiKhamAll():Promise<any>{
        return this.goiKhamService.getGoiKhamAll();
    }
    async createGoiKham(goikham:any):Promise<any>{
        return this.goiKhamService.createGoiKham(goikham);
    }
    async updateGoiKham(goikham:any):Promise<any>{
        return this.goiKhamService.updateGoiKham(goikham);
    }
    async deleteGoiKham(id:any):Promise<any>{
        return this.goiKhamService.deleteGoiKham(id);
    }
    async getKhoiKhamByID(id:any):Promise<any>{
        return this.goiKhamService.getGoiKhamByID(id);
    }
}