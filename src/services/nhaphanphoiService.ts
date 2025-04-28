import { injectable } from 'tsyringe';
import { NhaPhanPhoiRepository } from '../repositories/nhaphanphoiRepository';

@injectable()
export class NhaPhanPhoiService{
    constructor (private nhaPhanPhoiService : NhaPhanPhoiRepository){}
    async getNhaPhanPhoiAll():Promise<any>{
        return this.nhaPhanPhoiService.getNhaPhanPhoiAll()
    }
    async createNhaPhanPhoi(nhaphanphoi:any):Promise<any>{
        return this.nhaPhanPhoiService.createNhaPhanPhoi(nhaphanphoi);
    }
    async updateNhaPhanPhoi(nhaphanphoi:any):Promise<any>{
        return this.nhaPhanPhoiService.updateNhaPhanPhoi(nhaphanphoi);
    }
    async deleteNhaPhanPhoi(id:any):Promise<any>{
        return this.nhaPhanPhoiService.deleteNhaPhanPhoi(id);
    }
    async getNhaPhanPhoiByID(id:any):Promise<any>{
        return this.nhaPhanPhoiService.getNhaPhanPhoiByID(id);
    }
}