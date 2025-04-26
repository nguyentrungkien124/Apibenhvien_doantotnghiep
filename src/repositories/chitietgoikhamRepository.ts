import { injectable } from 'tsyringe';
import { Database } from '../config/database';

@injectable()
export class ChiTietGoiKhamRepository{
    constructor(private db:Database){}
    async getChiTietGoiKhamAll():Promise<any>{
        try{
            const sql = 'CALL GetChiTietGoiKhamALL()';
            const [results] = await this.db.query(sql,[]);
            return results;
        }catch(error:any){
            throw new Error(error.message);
        }
    }
    async createChiTietGoiKham(chitietgoikham:any):Promise<any>{
        try{
            const sql = 'CALL CreateChiTietGoiKham(?,?,?,?,?,?)';
            await this.db.query(sql,[chitietgoikham.goi_kham_id, chitietgoikham.ten_chi_tiet,chitietgoikham.mo_ta,chitietgoikham.gia,chitietgoikham.gia_giam,chitietgoikham.hinh_anh]);
            return true;

        }catch(error:any){
            throw new Error(error.message);
        }
    }
    async updateChiTietGoiKham(chitietgoikham:any):Promise<any>{
        try{
            const sql = 'CALL UpdateChiTietGoiKham(?,?,?,?,?,?,?)';
            await this.db.query(sql,[chitietgoikham.id,chitietgoikham.goi_kham_id, chitietgoikham.ten_chi_tiet,chitietgoikham.mo_ta,chitietgoikham.gia,chitietgoikham.gia_giam,chitietgoikham.hinh_anh]);
            return true;
        }catch(error:any){
            throw new Error(error.message);
        }
    }
    async deleteChiTietGoiKham(id:any):Promise<any>{
        try{
            const sql = 'CALL DeleteChiTietGoiKham(?)'
            await this.db.query(sql,[id]);
            return true;
        }catch(error:any){
            throw new Error(error.message)
        }
    }
    async getChiTietGoiKhamByID(id:any):Promise<any>{
        try{
            const sql = 'CALL GetChiTietGoiKhamByID(?)'
            const [results] = await this.db.query(sql,[id])
            return results;
        }catch(error:any){
            throw new Error(error.message)
        }

    }
    async getCMGoiKham(goi_kham_id:number, pageIndex:number,pageSize:number):Promise<any>{
        try{
            const sql = 'CALL GetCMGoiKham(?,?,?)';
            const [results] = await this.db.query(sql,[goi_kham_id,pageIndex,pageSize]);
            return results;
        }catch(error:any){
            throw new Error(error.message);
        }
    }
}