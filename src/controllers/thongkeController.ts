import { injectable } from "tsyringe";
import { ThongkeService } from "../services/thongkeService";
import { Request, Response } from 'express';
@injectable() 
export class ThongkeController{
    constructor(private thongkeService:ThongkeService){}
    async GetTop10Doctors(req:Request,res:Response):Promise<void>{
        try{
            const data = await this.thongkeService.GetTop10Doctors();
            if(data && data.length>0){
                res.json(data);
            }else{
                res.json({message:'không tìm thấy dữ liệu'});
            }
        }catch(error:any){
            res.json({message:error.message});
        }
    }
    async ThongKeTrangThietBi(req:Request,res:Response):Promise<void>{
        try{
            const data = await this.thongkeService.ThongKeTrangThietBi();
            if(data && data.length>0){
                res.json(data);
            }else{
                res.json({message:'không tìm thấy dữ liệu'});
            }
        }catch(error:any){
            res.json({message:error.message});
        }
    }
    async ThongKeTongSoBacSi(req:Request,res:Response):Promise<void>{
        try{
            const data = await this.thongkeService.ThongKeTongSoBacSi();
            if(data && data.length>0){
                res.json(data);
            }else{
                res.json({message:'không tìm thấy dữ liệu'});
            }
        }catch(error:any){
            res.json({message:error.message});
        }
    }
    async ThongKeTongLichHen(req:Request,res:Response):Promise<void>{
        try{
            const data = await this.thongkeService.ThongKeTongLichHen();
            if(data && data.length>0){
                res.json(data);
            }else{
                res.json({message:'không tìm thấy dữ liệu'});
            }
        }catch(error:any){
            res.json({message:error.message});
        }
    }
    async ThongKeTongKhachHang(req:Request,res:Response):Promise<void>{
        try{
            const data = await this.thongkeService.ThongKeTongKhachHang();
            if(data && data.length>0){
                res.json(data);
            }else{
                res.json({message:'không tìm thấy dữ liệu'});
            }
        }catch(error:any){
            res.json({message:error.message});
        }
    }
    async ThongKeSoLuongLichHenCuaTatCaBacSi(req:Request,res:Response):Promise<void>{
        try{
            const data = await this.thongkeService.ThongKeSoLuongLichHenCuaTatCaBacSi();
            if(data && data.length>0){
                res.json(data);
            }else{
                res.json({message:'không tìm thấy dữ liệu'});
            }
        }catch(error:any){
            res.json({message:error.message});
        }
    }
    async ThongKeDoanhThuTheoKhoangThoiGian(req:Request,res:Response):Promise<void>{
        try{
            const { NgayBatDau, NgayKetThuc } = req.body as { NgayBatDau: string, NgayKetThuc: string};

            // Validate that both dates are provided
            if (!NgayBatDau || !NgayKetThuc ) {
                res.status(400).json({ message: "Vui lòng cung cấp cả Ngày Bắt Đầu và Ngày Kết Thúc." });
                return;
            }

            // Pass the dates as a single object
            const data = await this.thongkeService.ThongKeDoanhThuTheoKhoangThoiGian({ NgayBatDau, NgayKetThuc });

            if (data && data.length > 0) {
                res.json(data);
            } else {
                res.json({ message: 'không tìm thấy dữ liệu' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
  
}