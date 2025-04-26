  import { injectable } from 'tsyringe';
  import { Database } from '../config/database';

  @injectable()
  export class BaiVietRepository {
    constructor(private db: Database) { }  
    async getBaiVietAll(): Promise<any> {
      try {
        const sql = 'CALL GetAllbaiviet()';
        const [results] = await this.db.query(sql, []);
        return results;       
      } catch (error:any) {
        throw new Error( error.message);
      }
    } 
    
    async createBaiViet(baiviet:any):Promise<any>{
      try{
        const sql = 'CALL CreateBaiViet(?,?,?,?,?,?,?,?)';
        await this.db.query(sql,[baiviet.id_admin, baiviet.tieu_de,baiviet.noi_dung,baiviet.hinh_anh,baiviet.loai_bai_viet,baiviet.trang_thai,baiviet.luot_xem,baiviet.ngay_dang]);
        return true;
      }catch(error:any){
          throw new Error(error.message)
      }
    }
    
    async updateBaiViet(baiviet:any):Promise<any>{
      try{
        const sql = 'CALL UpdateBaiViet(?,?,?,?,?,?,?,?,?)';
        await this.db.query(sql,[baiviet.id,baiviet.id_admin, baiviet.tieu_de,baiviet.noi_dung,baiviet.hinh_anh,baiviet.loai_bai_viet,baiviet.trang_thai,baiviet.luot_xem,baiviet.ngay_dang]);
        return true;
      }catch(error:any){
        throw new Error(error.message)
      }
    }
    
    async deleteBaiViet(id:any):Promise<any>{
      try{
        const sql = 'CALL DeleteBaiViet(?)';
        await this.db.query(sql,[id]);
        return true;
      }catch(error:any){
        throw new Error(error.message)
      }
    }

    async getBaiVietByID(id:any):Promise<any>{
      try{
        const sql = 'CALL GetBaiVietById(?)';
        const [results] = await this.db.query(sql,[id]);
        return results;
      }catch(error:any){
        throw new Error(error.message)
      }
    }
    async getBaiVietCM(loai_bai_viet:number, pageIndex:number, pageSize:number):Promise<any>{
      try{
        const sql = 'CALL GetBaiVietCM(?,?,?)';
        const [results]= await this.db.query(sql,[loai_bai_viet,pageIndex,pageSize]);
        return results;
      }catch(error:any){
        throw new Error(error.message)
      }
    }

  }