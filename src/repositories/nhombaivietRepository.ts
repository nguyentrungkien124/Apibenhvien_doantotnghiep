import { injectable } from 'tsyringe';
import { Database } from '../config/database';

@injectable()
export class NhomBaiVietRepository{
    constructor(private db:Database){}
    async getNhomBaiVietAll(): Promise<any>{
        try{
            const sql = 'CALL GetAllnhombaiviet()';
            const [results] = await this.db.query(sql,[]);
            return results;

        }catch(error:any){
            throw new Error(error.message);
        }
    }
    async createNhomBaiViet(nhombaiviet: any):Promise<any>{
        try{
            const sql = 'CALL CreateNhomBaiViet(?,?,?,?)';
            await this.db.query(sql,[nhombaiviet.id_admin,nhombaiviet.tieu_de,nhombaiviet.mo_ta,nhombaiviet.trang_thai]);
            return true;
        }catch(error:any){
            throw new Error(error.message)
        }
    }

    async updateNhomBaiViet(nhombaiviet:any):Promise<any>{
        try{
            const sql = 'CALL UpdateNhomBaiViet(?,?,?,?,?)';
            await this.db.query(sql,[nhombaiviet.id,nhombaiviet.id_admin,nhombaiviet.tieu_de,nhombaiviet.mo_ta,nhombaiviet.trang_thai]);
            return true;
        }catch (error:any){
            throw new Error(error.message)
        }
    }
    async deleteNhomBaiViet(ids: any): Promise<any> {
        try {
            // Chuyển mảng ids thành chuỗi JSON
            const jsonIds = JSON.stringify(ids);
    
            const sql = 'CALL DeleteNhomBaiViet(?)';
            await this.db.query(sql, [jsonIds]);  // Gửi mảng JSON vào thủ tục
            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    
    async getNhomBaiVietByID(id:any):Promise<any>{
        try{
            const sql = 'CALL GetNhomBaiVietById(?)';
            const [results] = await this.db.query(sql,[id])
            return results
        }catch(error:any){
            throw new Error(error.message)
        }
    }
    
}