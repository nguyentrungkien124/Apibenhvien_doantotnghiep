import { injectable } from 'tsyringe';
import { Database } from '../config/database';

@injectable()
export class DanhGiaRepository{
    constructor(private db: Database){}
    // async getBacSiAll():Promise<any>{
    //     try{
    //         const sql = 'CALL GetBacSiAll()';
    //         const [results] = await this.db.query(sql,[]);
    //         return results;
    //     }catch(error:any){
    //         throw new Error(error.message);
    //     }
    // }

    async createDanhgia(danhgia:any):Promise<any>{
        try{
            const sql = 'CALL ThemDanhGia(?,?,?,?,?)';
            await this.db.query(sql,[danhgia.datlich_id,danhgia.nguoi_dung_id,danhgia.bac_si_id,danhgia.so_sao,danhgia.nhan_xet]);
            return true;
        }catch(error:any){
            throw new Error(error.message);
        }
    }
   
    
}