import { injectable } from 'tsyringe';
import { Database } from '../config/database';

@injectable()
export class GoiKhamRepository{
    constructor (private db:Database){}
    async getGoiKhamAll():Promise<any>{
        try{
            const sql = 'CALL GetGoiKhamAll()';
            const [results] = await this.db.query(sql,[]);
            return results;
        }catch(error:any){
            throw new Error(error.message);
        }
    }
    async getGoiKhamByID(id:any):Promise<any>{
        try{
            const sql = 'CALL GetGoiKhamByID(?)';
            const [results] = await this.db.query(sql,[id]);
            return results;
        }catch(error:any){
            throw new Error(error.message)
        }
    }
    async createGoiKham(goikham:any):Promise<any>{
        try{
            const sql = 'CALL CreateGoiKham(?,?,?)';
            await this.db.query(sql,[goikham.ten_goi,goikham.mo_ta,goikham.hinh_anh]);
            return true;
        }catch(error:any){
            throw new Error(error.message)
        }
    }
    async updateGoiKham(goikham:any):Promise<any>{
        try{
            const sql = 'CALL UpdateGoiKham(?,?,?,?)';
            await this.db.query(sql,[goikham.id,goikham.ten_goi,goikham.mo_ta,goikham.hinh_anh])
            return true;
        }catch(error:any){
            throw new Error(error.message)
        }
    }
    async deleteGoiKham(id:any):Promise<any>{
        try{
            const sql = 'CALL DeleteGoiKham(?)';
             await this.db.query(sql,[id]);
             return true;
        }catch(error:any){
            throw new Error(error.message)
        }
    }
}