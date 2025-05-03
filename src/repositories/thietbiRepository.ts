import { injectable } from 'tsyringe';
import { Database } from '../config/database';

@injectable()
export class TrangThietBiRepository{
    constructor (private db:Database){}
    async getTrangThietBiAll():Promise<any>{
        try{
            const sql = 'CALL GetAllTrangThietBi()';
            const [results] = await this.db.query(sql,[])
            return results;
        }catch(error:any){
            throw new Error(error.message);
        }
    }
    async createTrangThietBi(trangthietbi:any):Promise<any>{
        try{
            const sql ='CALL CreateTrangThietBi(?,?,?,?,?,?,?)';
            await this.db.query(sql,[trangthietbi.ten_thiet_bi,trangthietbi.hinh_anh,trangthietbi.ma_thiet_bi,trangthietbi.so_luong,trangthietbi.khoa_id,trangthietbi.trang_thai,trangthietbi.nhom_id]);
            return true;
        }catch(error:any){
            throw new Error(error.message);
        }
        
    }
    async updateTrangThietBi(trangthietbi:any):Promise<any>{
        try{
            const sql = 'CALL UpdateTrangThietBi(?,?,?,?,?,?,?,?)';
            await this.db.query(sql,[trangthietbi.id,trangthietbi.ten_thiet_bi,trangthietbi.hinh_anh,trangthietbi.ma_thiet_bi,trangthietbi.so_luong,trangthietbi.khoa_id,trangthietbi.trang_thai,trangthietbi.nhom_id]);
            return true;
        }catch(error:any){
            throw new Error(error.message);
        }
    }
    
    async deleteTrangThietBi(id:any):Promise<any>{
        try{
            const sql = 'CALL DeleteTrangThietBi(?)';
            await this.db.query(sql,[id]);
            return true;
        }catch(error:any){
            throw new Error(error.message);
        }
    }
    async getTrangThietBiByID(id:any):Promise<any>{
        try{
            const sql = 'CALL GetTrangThietBiByID(?)'
            const [results] = await this.db.query(sql,[id])
            return results;
        }catch(error:any){
            throw new Error(error.message)
        }
    }
}