import { injectable } from 'tsyringe';
import { Database } from '../config/database';

@injectable()
export class NhaPhanPhoiRepository{
    constructor(private db:Database){}
    async getNhaPhanPhoiAll():Promise<any>{
        try{
            const sql = 'CALL GetAllNhaPhanPhoi()';
            const [results] = await this.db.query(sql,[]);
            return results;
        }catch(error:any){
            throw new Error(error.message);
        }
    }
    
    async createNhaPhanPhoi(nhaphanphoi:any):Promise<any>{
        try{
            const sql = 'CALL CreateNhaPhanPhoi(?,?,?,?,?,?)';
            await this.db.query(sql,[nhaphanphoi.ten_nha_phan_phoi,nhaphanphoi.dia_chi,nhaphanphoi.so_dien_thoai,nhaphanphoi.email,nhaphanphoi.ghi_chu,nhaphanphoi.hinh_anh]);
            return true;
        }catch(error:any){
            throw new Error(error.message);
        }
    }
    async updateNhaPhanPhoi(nhaphanphoi:any):Promise<any>{
        try{
            const sql = 'CALL UpdateNhaPhanPhoi(?,?,?,?,?,?,?)';
            await this.db.query(sql,[nhaphanphoi.id,nhaphanphoi.ten_nha_phan_phoi,nhaphanphoi.dia_chi,nhaphanphoi.so_dien_thoai,nhaphanphoi.email,nhaphanphoi.ghi_chu,nhaphanphoi.hinh_anh])
            return true;
        }catch(error:any){
            throw new Error(error.message);
        }
    }
    async deleteNhaPhanPhoi(id:any):Promise<any>{
        try{
            const sql = 'CALL DeleteNhaPhanPhoi(?)';
            await this.db.query(sql,[id]);
            return true;
        }catch(error:any){
            throw new Error(error.message);
        }
    }
    async getNhaPhanPhoiByID(id:any):Promise<any>{
        try{
            const sql = 'CALL GetNhaPhanPhoiById(?)';
            const[results] = await this.db.query(sql,[id]);
            return results;     
        }catch(error:any){
            throw new Error(error.message);
        }
    }
}