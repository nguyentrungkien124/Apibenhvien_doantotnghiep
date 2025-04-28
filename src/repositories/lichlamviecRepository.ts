import { injectable } from 'tsyringe';
import { Database } from '../config/database';

@injectable()
export class LichLamViecRepository{
    constructor(private db:Database){}
    async getLichLamViecByBacSiID(id:any):Promise<any>{
        try{
            const sql = 'CALL GetLichLamViecByBacSiID(?)';
            const [results] = await  this.db.query(sql,[id]);
            return results;
        }catch(error:any){
            throw new Error(error.message)
        }
    }
    async getLichLamViecByBacSiAndDate(bac_si_id:number, ngay_lam_viec:string, pageIndex:number, pageSize:number ){
        try{
            const sql = 'CALL GetLichLamViecByBacSiAndDate(?,?,?,?)';
            const [results] = await this.db.query(sql, [bac_si_id, ngay_lam_viec, pageIndex, pageSize]);
            return results;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    

    async createLichLamViecBacSi(lichlamviec:any):Promise<any>{
        try{
            const sql = 'CALL CreateLichLamViec(?,?,?,?,?,?)';
            await this.db.query(sql,[lichlamviec.bac_si_id,lichlamviec.ngay_lam_viec,lichlamviec.gio_bat_dau,lichlamviec.gio_ket_thuc,lichlamviec.trang_thai,lichlamviec.ghi_chu]);
            return true;
        }catch(error:any){
            throw new Error(error.message);
        }
    }
}