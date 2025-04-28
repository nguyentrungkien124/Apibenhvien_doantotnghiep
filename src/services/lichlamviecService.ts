import { injectable } from 'tsyringe';
import { LichLamViecRepository } from '../repositories/lichlamviecRepository';

@injectable()
export class LichLamViecService {
    constructor(private lichLamViecService: LichLamViecRepository ){}

    async getLichLamViecByBacSiID(id:any):Promise<any>{
        return this.lichLamViecService.getLichLamViecByBacSiID(id);
    }
    async createLichLamViecBacSi(lichlamviec:any):Promise<any>{
        return this.lichLamViecService.createLichLamViecBacSi(lichlamviec);
    }
    async getLichLamViecByBacSiAndDate(bac_si_id:number,ngay_lam_viec:string, pageIndex:number, pageSize:number ):Promise<any>{
        return this.lichLamViecService.getLichLamViecByBacSiAndDate(bac_si_id,ngay_lam_viec,pageIndex,pageSize);
    }
}