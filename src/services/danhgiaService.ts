import { injectable } from 'tsyringe';
import { DanhGiaRepository } from '../repositories/danhgiaRepository';

@injectable()
export class DanhGiaService{
    constructor(private danhGiaService: DanhGiaRepository){

    }
    // async getBacSiAll():Promise<any>{
    //     return this.bacSiService.getBacSiAll();
    // }
    async createDanhgia(danhgia:any):Promise<any>{
        return this.danhGiaService.createDanhgia(danhgia);
    }
   
}