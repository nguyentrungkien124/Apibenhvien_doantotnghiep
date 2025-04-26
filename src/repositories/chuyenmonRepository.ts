import { injectable } from 'tsyringe';
import { Database } from '../config/database';

@injectable()
export class ChuyenMonRepository{
    constructor(private db:Database){}
    async getChuyenMonAll():Promise<any>{
        try{
            const sql = 'CALL GetChuyenMonAll()';
            const [results] = await this.db.query(sql,[]);
            return results;
        }catch(error:any){
            throw new Error(error.message);
        }
    }
    async createChuyenMon(chuyenmon:any):Promise<any>{
        try{
            const sql = 'CALL CreateChuyenMon(?)';
            await this.db.query(sql,[chuyenmon.ten_chuyen_mon]);
            return true;
        }catch(error:any){
            throw new Error(error.message)
        }
    }
    async updateChuyenMon(chuyenmon:any):Promise<any>{
        try{
            const sql = 'CALL UpdateChuyenMon(?,?)';
            await this.db.query(sql,[chuyenmon.id,chuyenmon.ten_chuyen_mon]);
            return true;
        }catch(error:any){
            throw new Error(error.message);
        }
    }
    async deleteChuyenMon(id:any):Promise<any>{
        try{
            const sql = 'CALL DeleteChuyenMon(?)';
            await this.db.query(sql,[id]);
            return true;
        }catch(error:any){
            throw new Error(error.message);
        }
    }
    async getChuyenMonByID(id:any):Promise<any>{
        try{
            const sql = 'CALL GetChuyenMonByID(?)';
            const [results] = await this.db.query(sql,[id]);
            return results;
        }catch(error:any){
            throw new Error(error.message);
        }
    }
}