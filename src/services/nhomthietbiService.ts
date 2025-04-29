import { injectable } from 'tsyringe';
import { NhomThietBiRepository } from '../repositories/nhomthietbiRepository';

@injectable()
export class NhomThietBiService{
    constructor(private nhomThietBiService: NhomThietBiRepository){}
    async getNhomThietBiAll():Promise<any>{
        return this.nhomThietBiService.getNhomThietBiAll();
    }
    async createNhomThietBi(nhomthietbi:any):Promise<any>{
        return this.nhomThietBiService.createNhomThietBi(nhomthietbi);
    }
    async updateNhomThietBi(nhomthietbi:any):Promise<any>{
        return this.nhomThietBiService.updateNhomThietBi(nhomthietbi);
    }
    async deleteNhomThietBi(id:any):Promise<any>{
        return this.nhomThietBiService.deleteNhomThietBi(id);
    }
    async getNhomThietBiByID(id:any):Promise<any>{
        return this.nhomThietBiService.getNhomThietBiByID(id);
    }
}