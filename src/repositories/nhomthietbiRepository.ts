import { injectable } from 'tsyringe';
import { Database } from '../config/database';

@injectable()
export class NhomThietBiRepository{
    constructor(private db:Database){}
    async getNhomThietBiAll():Promise<any>{
        try{
            const sql = 'CALL GetAllNhomThietBi()';
            const [results] = await this.db.query(sql,[]);
            return results;
        }catch(error:any){
            throw new Error(error.message)
        }
    }
    async createNhomThietBi(nhomthietbi:any):Promise<any>{
        try{
            const sql = 'CALL CreateNhomThietBi(?,?)';
            await this.db.query(sql,[nhomthietbi.ten_nhom,nhomthietbi.trang_thai]);
            return true;
        }catch(error:any){
            throw new Error(error.message)
        }
    }
    async updateNhomThietBi(nhomthietbi:any):Promise<any>{
        try{
            const sql = 'CALL UpdateNhomThietBi(?,?,?)';
            await this.db.query(sql,[nhomthietbi.id,nhomthietbi.ten_nhom,nhomthietbi.trang_thai]);
            return true;
        }catch(error:any){
            throw new Error(error.message)
        }
    }
    async deleteNhomThietBi(id:any):Promise<any>{
        try{
            const sql = 'CALL DeleteNhomThietBi(?)';
            await this.db.query(sql,[id]);
            return true;
        }catch(error:any){
            throw new Error(error.message)
        }

    }
    async getNhomThietBiByID(id:any):Promise<any>{
        try{
            const sql = 'CALL GetNhomThietBiByID(?)';
            const [results] = await this.db.query(sql,[id]);
            return results;
        }catch(error:any){
            throw new Error(error.message)
        }
    }
}