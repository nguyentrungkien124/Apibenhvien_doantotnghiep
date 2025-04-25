import { injectable } from 'tsyringe';
import { Database } from '../config/database';

@injectable()
export class BacSiRepository{
    constructor(private db: Database){}
    async getBacSiAll():Promise<any>{
        try{
            const sql = 'CALL GetBacSiAll()';
            const [results] = await this.db.query(sql,[]);
            return results;
        }catch(error:any){
            throw new Error(error.message);
        }
    }

    async createBacSi(bacsi:any):Promise<any>{
        try{
            const sql = 'CALL CreateBacSi(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
            await this.db.query(sql,[bacsi.ho_ten,bacsi.chuyen_mon,bacsi.khoa_id,bacsi.so_dien_thoai,bacsi.email,bacsi.ngay_sinh,bacsi.gioi_tinh,bacsi.dia_chi,bacsi.hinh_anh,bacsi.mat_khau,bacsi.gia,bacsi.khambenh_qua_video,bacsi.gioi_thieu,bacsi.kinh_nghiem,bacsi.chuyen_tri,bacsi.chuc_danh]);
            return true;
        }catch(error:any){
            throw new Error(error.message);
        }
    }
    async updateBacSi(bacsi:any):Promise<any>{
        try{
            const sql = 'CALL UpdateBacSi(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
            await this.db.query(sql,[bacsi.id,bacsi.ho_ten,bacsi.chuyen_mon,bacsi.khoa_id,bacsi.so_dien_thoai,bacsi.email,bacsi.ngay_sinh,bacsi.gioi_tinh,bacsi.dia_chi,bacsi.hinh_anh,bacsi.mat_khau,bacsi.gia,bacsi.khambenh_qua_video,bacsi.gioi_thieu,bacsi.kinh_nghiem,bacsi.chuyen_tri,bacsi.chuc_danh]);
            return true;
        }catch(error:any){
            throw new Error(error.message);
        }
    }
    async deleteBacSi(id:any):Promise<any>{
        try{
            const sql = 'CALL DeleteBacSi(?)'
            await this.db.query(sql,[id])
            return true;
        }catch(error:any){
            throw new Error(error.message);
        }
    }
    async getBacSiByID(id:any):Promise<any>{
        try{
            const sql = 'CALL GetBacSiByID(?)'
            const [results] = await this.db.query(sql,[id])
            return results;
        }catch(error:any){
            throw new Error(error.message)
        }
    }
    async getBacSiQuaVideo():Promise<any>{
        try{
            const sql = 'CALL GetBacSiKhambenhQuaVideo()'
            const [results] = await this.db.query(sql,[])
            return results;
        }catch(error:any){
            throw new Error(error.message)
        }
    }
    async searchBacSiTheoKhoa(khoa_id:number, pageIndex:number, pageSize:number):Promise<any>{
        try{
          const sql = 'CALL SearchBacSiTheoKhoa(?,?,?)';
          const [results]= await this.db.query(sql,[khoa_id,pageIndex,pageSize]);
          return results;
        }catch(error:any){
          throw new Error(error.message)
        }
    }

    async updateKhamBenhQuaVideo(id: string, khambenh_qua_video: boolean): Promise<any> {
        try {
            const sql = 'CALL UpdateVideoConsultationStatus(?, ?)';
            await this.db.query(sql, [id, khambenh_qua_video]);
            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }

        
    }
    async DangNhapByBacSi(email:string, mat_khau:string):Promise<any>{
        try{
            const sql = 'CALL DangNhapByBacSi(?,?)';
            const [results] = await this.db.query(sql,[email,mat_khau]);
            if(Array.isArray(results) && results.length > 0) {
                return results[0];
            }
            return null;
        }catch (error:any){
            throw new Error(error.message);
        }
    }
    
}