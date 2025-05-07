import { injectable } from "tsyringe";
import { Database } from "../config/database";

@injectable()
 export class ThongkeRepository{
    constructor (private db:Database){}
    async GetTop10Doctors():Promise<any>{
        try{
            const sql = 'CALL GetTop10Doctors()';
            const [results] =await this.db.query(sql,[]);
            return results;
        }catch(error:any){
            throw new Error(error.messge);
        }
    }
    async ThongKeTrangThietBi():Promise<any>{
        try{
            const sql = 'CALL ThongKeTrangThietBi()';
            const [results] = await this.db.query(sql,[]);
            return results;
        }catch(error:any){
            throw new Error(error.message);
        }
    }
    async ThongKeTongSoBacSi():Promise<any>{
        try{
            const sql = 'CALL ThongKeTongSoBacSi()';
            const [results] = await this.db.query(sql,[]);
            return results;
        }catch(error:any){
            throw new Error(error.message);
        }
    }
    async ThongKeTongLichHen():Promise<any>{
        try{
            const sql = 'CALL ThongKeTongLichHen()';
            const [results] = await this.db.query(sql,[]);
            return results;
        }catch(error:any){
            throw new Error(error.message);
        }
    }
    async ThongKeTongKhachHang():Promise<any>{
        try{
            const sql = 'CALL ThongKeTongKhachHang()';
            const [results] = await this.db.query(sql,[]);
            return results;
        }catch(error:any){
            throw new Error(error.message);
        }
    }
    async ThongKeSoLuongLichHenCuaTatCaBacSi():Promise<any>{
        try{
            const sql = 'CALL ThongKeSoLuongLichHenCuaTatCaBacSi()';
            const [results] = await this.db.query(sql,[]);
            return results;
        }catch(error:any){
            throw new Error(error.message);
        }
    }
    async ThongKeDoanhThuTheoKhoangThoiGian(thongke: { NgayBatDau: string, NgayKetThuc: string }):Promise<any>{
        try{
            
            const sql = 'CALL ThongKeDoanhThuTheoKhoangThoiGian(?,?)';
            const [results] = await this.db.query(sql,[thongke.NgayBatDau,thongke.NgayKetThuc]);
            return results;
        }catch(error:any){
            throw new Error(error.message);
        }
    }

}

    
export default ThongkeRepository;
