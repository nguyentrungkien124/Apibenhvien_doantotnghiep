import { Request, Response } from 'express';
import { injectable, registry } from "tsyringe";
import { BaiVietService } from '../services/baivietService';
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
  cloud_name: 'dskbumohp',
  api_key: '325888745542338',
  api_secret: 'gcFF6WhzUcoWGrLlOmwevCaiy9A' // Click 'View Credentials' below to copy your API secret
});

@injectable()
export class BaiVietController {
  constructor(private baiVietService: BaiVietService
  ) { }

  async getBaiVietAll(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.baiVietService.getBaiVietAll();
      if (data && data.length > 0) {
        res.json(data);
      } else {
        res.json({ message: 'Không lấy được danh sách' });
      }
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }

  async createBaiViet(req: Request, res: Response): Promise<void> {
    try {
      let baiviet = req.body as { id_admin: string, tieu_de: string, noi_dung: string, hinh_anh: string, loai_bai_viet: string, trang_thai: string, luot_xem: string, ngay_dang: string }
      if (Array.isArray(req.files)) {
        const result = await cloudinary.uploader.upload(req.files[0].path);
        baiviet.hinh_anh = result.secure_url;
      }


      const results = await this.baiVietService.createBaiViet(baiviet);

      res.json({ message: 'Đã thêm bài viết thành công' })
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }

  async updateBaiViet(req:Request,res:Response):Promise<void>{
    try{
      let baiviet = req.body as {id:string,id_admin: string, tieu_de: string, noi_dung: string, hinh_anh: string, loai_bai_viet: string, trang_thai: string, luot_xem: string, ngay_dang: string}
      if(Array.isArray(req.files)){
        const result = await cloudinary.uploader.upload(req.files[0].path);
        baiviet.hinh_anh = result.secure_url;
      }
      const results = await this.baiVietService.updateBaiViet(baiviet);
      res.json({message:'Sửa bài viết thành công'})
    }catch(error:any){
      res.json({message:error.message});
    }
  }
  async deleteBaiViet(req:Request,res:Response):Promise<void>{
    try{
      let id =  req.params.id;
      const results = await this.baiVietService.deleteBaiViet(id);
      res.json({message:'Đã xóa bài viết thành công',success:true});
    }catch(error:any){
      res.json({message:error.message,success:false});
    }
  }

  async getBaiVietByID(req:Request,res:Response):Promise<void>{
    try{
      let id = req.params.id;
      const baiviet = await this.baiVietService.getBaiVietByID(id);
      if(baiviet){
        res.json(baiviet);
      }else{
        res.json({message:'Bản ghi không tồn tại'});
      }
    }catch(error:any){
      res.json({message:error.message});
    }
  }


  async getBaiVietCM(req:Request,res:Response):Promise<void>{
    try{

          // Chuyển đổi các giá trị từ string sang number
            const loai_bai_viet = parseInt(req.params.loai_bai_viet, 10);
            const pageIndex = parseInt(req.params.pageIndex, 10);
            const pageSize = parseInt(req.params.pageSize, 10);
    
            // Kiểm tra xem các giá trị đã chuyển đổi có hợp lệ hay không
            if (isNaN(loai_bai_viet) || isNaN(pageIndex) || isNaN(pageSize)) {
                res.status(400).json({ message: 'Thông tin đầu vào không hợp lệ.' });
                return;
            }
    
            // Gọi service với các giá trị đã được chuyển đổi
            const baiviet = await this.baiVietService.getBaiVietCM(loai_bai_viet, pageIndex, pageSize);
    
            // Kiểm tra và trả về kết quả
            if (baiviet) {
                res.json(baiviet);
            } else {
                res.json({ message: 'Bản ghi không tồn tại' });
            }
        } catch (error: any) {
            res.json({ message: error.message });
        }
  }



}