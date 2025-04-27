import { injectable } from 'tsyringe';
import { Database } from '../config/database';

@injectable()

export class KhoaRepository{
    constructor (private db: Database){

    }
    async getKhoaAll():Promise<any>{
        try{
            const sql = 'CALL GetKhoaAll()'
            const [results] = await this.db.query(sql,[]);
            return results;
        }catch(error:any){
            throw new Error(error.message);
        }
    }
    async getKhoaByID(id:any):Promise<any>{
        try{
            const sql = 'CALL GetKhoaByID(?)'
            const [results] = await this.db.query(sql,[id]);
            return results;
        }catch(error:any){
            throw new Error(error.message);
        }
    }

    async createKhoa(khoa:any):Promise<any>{
        try{
            const sql = 'CALL CreateKhoa(?,?,?)';
            await this.db.query(sql,[khoa.ten, khoa.mo_ta,khoa.hinh_anh]);
            return true;
        }catch(error:any){
            throw new Error(error.message)
        }
    }
    async updateKhoa(khoa:any):Promise<any>{
        try{
            const sql = 'CALL UpdateKhoa(?,?,?,?)';
            await this.db.query(sql,[khoa.id ,khoa.ten, khoa.mo_ta,khoa.hinh_anh]);
            return true;
        }catch(error:any){
            throw new Error(error.message)
        }
    }
    async deleteKhoa(id:any):Promise<any>{
        try{
            const sql = 'CALL DeleteKhoa(?)';
            await this.db.query(sql,[id]);
            return true;
        }catch(error:any){
            throw new Error(error.message)
        }
    }
}