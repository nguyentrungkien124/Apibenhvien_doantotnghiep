import { injectable } from 'tsyringe';
import { Database } from '../config/database';

@injectable()
export class KhoRepository{
    constructor(private db:Database){}
    async createKho(kho:any):Promise<any>{
        try{
            const sql = 'CALL CreateKho(?,?,?,?,?,?,?,?)';
            await this.db.query(sql,[kho.ten_san_pham,kho.loai_san_pham,kho.so_luong_tong,kho.don_vi_tinh,kho.trang_thai,kho.mo_ta,kho.hinh_anh,kho.list_json_chi_tiet_kho]);
            return true
        }catch(error:any){
            throw new Error(error.message);
        }
    }
    async deleteKho(kho_id:any):Promise<any>{
        try{
            const sql = 'CALL DeleteKho(?)';
            await this.db.query(sql,[kho_id]);
            return true;
        }catch(error:any){
            throw new Error(error.message);
        }
    }
    async getKhoAll():Promise<any>{
        try{
            const sql = 'CALL GetAllKho()'
            const [results] = await this.db.query(sql,[])
            return results;
        }catch(error:any){
            throw new Error(error.message);
        }
    }
    async getKhoByID(kho_id:any):Promise<any>{
        try{
           const sql = 'CALL GetChiTietKhopByID(?)'
           const [results] = await this.db.query(sql,[kho_id]);
            return results;
        }catch(error:any){
            throw new Error(error.message)
        }
    }
}