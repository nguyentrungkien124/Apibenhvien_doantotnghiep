import { injectable } from 'tsyringe';
import { TrangThietBiRepository } from '../repositories/thietbiRepository';

@injectable()
export class TrangThietBiService{
    constructor(private trangThietBiService: TrangThietBiRepository){}
    async getTrangThietBiAll():Promise<any>{
        return this.trangThietBiService.getTrangThietBiAll();
    }
    async createTrangThietBi(trangthietbi:any):Promise<any>{
        return this.trangThietBiService.createTrangThietBi(trangthietbi);
    }
    async updateTrangThietBi(trangthietbi:any):Promise<any>{
        return this.trangThietBiService.updateTrangThietBi(trangthietbi);
    }
    async deleteTrangThietBi(id:any):Promise<any>{
        return this.trangThietBiService.deleteTrangThietBi(id);
    }
    async getTrangThietBiByID(id:any):Promise<any>{
        return this.trangThietBiService.getTrangThietBiByID(id);
    }
}