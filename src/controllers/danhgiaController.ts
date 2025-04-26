import { Request, Response } from 'express';
import { injectable, registry } from "tsyringe";

import { v2 as cloudinary } from 'cloudinary';
import { generateToken } from '../config/jwt';
import { DanhGiaService } from '../services/danhgiaService';
cloudinary.config({
    cloud_name: 'dskbumohp',
    api_key: '325888745542338',
    api_secret: 'gcFF6WhzUcoWGrLlOmwevCaiy9A' // Click 'View Credentials' below to copy your API secret
});

@injectable()
export class DanhgiaController {
    constructor(private danhGiaService: DanhGiaService) { }
    // async getBacSiAll(req: Request, res: Response): Promise<void> {
    //     try {
    //         const data = await this.bacSiService.getBacSiAll();
    //         if (data && data.length > 0) {
    //             res.json(data);
    //         } else {
    //             res.json({ message: 'không lấy được danh sách' });
    //         }
    //     } catch (error: any) {
    //         res.json({ message: error.message });
    //     }
    // }
    async createDanhgia(req: Request, res: Response): Promise<void> {
        try {
            const danhgia = req.body as {
                datlich_id:string, nguoi_dung_id:string, bac_si_id:string, so_sao:string, nhan_xet:string
             
            };
           
      
    
            const results = await this.danhGiaService.createDanhgia(danhgia);
            res.json({ message: 'Đã thêm đánh giá thành công' });
        } catch (error: any) {
            res.json({ message: error.message });
        }
    }
    
    

}