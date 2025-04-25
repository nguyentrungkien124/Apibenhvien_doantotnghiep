import { Request, Response } from 'express';
import { injectable, registry } from "tsyringe";
import { BacSiService } from '../services/bacsiService';
import { v2 as cloudinary } from 'cloudinary';
import { generateToken } from '../config/jwt';
cloudinary.config({
    cloud_name: 'dskbumohp',
    api_key: '325888745542338',
    api_secret: 'gcFF6WhzUcoWGrLlOmwevCaiy9A' // Click 'View Credentials' below to copy your API secret
});

@injectable()
export class BacSiController {
    constructor(private bacSiService: BacSiService) { }
    async getBacSiAll(req: Request, res: Response): Promise<void> {
        try {
            const data = await this.bacSiService.getBacSiAll();
            if (data && data.length > 0) {
                res.json(data);
            } else {
                res.json({ message: 'không lấy được danh sách' });
            }
        } catch (error: any) {
            res.json({ message: error.message });
        }
    }
    async createBacSi(req: Request, res: Response): Promise<void> {
        try {
            const bacsi = req.body as {
                ho_ten: string,
                chuyen_mon: string,
                khoa_id: string,
                so_dien_thoai: string,
                email: string,
                ngay_sinh: string,
                gioi_tinh: string,
                dia_chi: string,
                hinh_anh: string,
                mat_khau: string,
                gia: string,
                khambenh_qua_video: boolean,
                gioi_thieu: any,  // Sử dụng any để xử lý các kiểu dữ liệu khác nhau từ CKEditor
                kinh_nghiem: any,
                chuyen_tri: any,
                chuc_danh: any
            };
            if (Array.isArray(req.files)) {
                const result = await cloudinary.uploader.upload(req.files[0].path);
                bacsi.hinh_anh = result.secure_url;
            }
    
            // Chuyển đổi từ đối tượng thành chuỗi HTML
            bacsi.gioi_thieu = req.body.gioi_thieu.toString();
            bacsi.kinh_nghiem = req.body.kinh_nghiem.toString();
            bacsi.chuyen_tri = req.body.chuyen_tri.toString();
            bacsi.chuc_danh = req.body.chuc_danh.toString();
    
            const results = await this.bacSiService.createBacSi(bacsi);
            res.json({ message: 'Đã thêm bác sĩ thành công' });
        } catch (error: any) {
            res.json({ message: error.message });
        }
    }
    
    async updateBacSi(req: Request, res: Response): Promise<void> {
        try {
            const bacsi = req.body as {
                id: string,
                ho_ten: string,
                chuyen_mon: string,
                khoa_id: string,
                so_dien_thoai: string,
                email: string,
                ngay_sinh: string,
                gioi_tinh: string,
                dia_chi: string,
                hinh_anh: string,
                mat_khau: string,
                gia: string,
                khambenh_qua_video: boolean,
                gioi_thieu: string,
                kinh_nghiem: string,
                chuyen_tri: string,
                chuc_danh: string
            };
    
            // Nếu có file, upload lên Cloudinary
            if (Array.isArray(req.files)) {
                const result = await cloudinary.uploader.upload(req.files[0].path);
                bacsi.hinh_anh = result.secure_url;
            }
    
            // Gọi service để cập nhật
            const results = await this.bacSiService.updateBacSi(bacsi);
    
            // Phản hồi thành công
            res.status(200).json({
                success: true,
                message: 'Đã sửa thành công bác sĩ',
                data: results, // Trả về dữ liệu cập nhật (nếu cần)
            });
        } catch (error: any) {
            // Xử lý lỗi và trả về trạng thái HTTP phù hợp
            res.status(500).json({
                success: false,
                message: 'Cập nhật thất bại',
                error: error.message, // Trả về lỗi chi tiết (nếu cần)
            });
        }
    }
    
    
    async deleteBacSi(req: Request, res: Response): Promise<void> {
        try {
            let id = req.params.id;
            const results = await this.bacSiService.deleteBacSi(id)
            res.json({ message: 'Đã xóa bác sĩ thành công', success: true })
        } catch (error: any) {
            res.json({ message: error.message, success: false });
        }
    }
    async getBacSiById(req: Request, res: Response): Promise<void> {
        try {
            let id = req.params.id;
            const bacsi = await this.bacSiService.getBacSiById(id);
            if (bacsi) {
                res.json(bacsi);
            } else {
                res.json({ message: 'Bản ghi không tồn tại' });
            }
        } catch (error: any) {
            res.json({ message: error.message });
        }
    }

    async searchBacSiTheoKhoa(req: Request, res: Response): Promise<void> {
        try {

            // Chuyển đổi các giá trị từ string sang number
            const khoa_id = parseInt(req.params.khoa_id, 10);
            const pageIndex = parseInt(req.params.pageIndex, 10);
            const pageSize = parseInt(req.params.pageSize, 10);

            // Kiểm tra xem các giá trị đã chuyển đổi có hợp lệ hay không
            if (isNaN(khoa_id) || isNaN(pageIndex) || isNaN(pageSize)) {
                res.status(400).json({ message: 'Thông tin đầu vào không hợp lệ.' });
                return;
            }

            // Gọi service với các giá trị đã được chuyển đổi
            const bacsi = await this.bacSiService.searchBacSiTheoKhoa(khoa_id, pageIndex, pageSize);

            // Kiểm tra và trả về kết quả
            if (bacsi) {
                res.json(bacsi);
            } else {
                res.json({ message: 'Bản ghi không tồn tại' });
            }
        } catch (error: any) {
            res.json({ message: error.message });
        }
    }
    async updateKhamBenhQuaVideo(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { khambenh_qua_video } = req.body as { khambenh_qua_video: boolean };
            
            if (typeof khambenh_qua_video !== 'boolean') {
                res.status(400).json({ message: 'Trạng thái khám bệnh qua video không hợp lệ.' });
                return;
            }
    
            await this.bacSiService.updateKhamBenhQuaVideo(id, khambenh_qua_video);
            res.json({ message: 'Cập nhật trạng thái khám bệnh qua video thành công.' });
        } catch (error: any) {
            res.json({ message: error.message });
        }
    }
    async getBacSiQuaVideo(req: Request, res: Response): Promise<void> {
        try {
            const data = await this.bacSiService.getBacSiQuaVideo();
            if (data && data.length > 0) {
                res.json(data);
            } else {
                res.json({ message: 'không lấy được danh sách' });
            }
        } catch (error: any) {
            res.json({ message: error.message });
        }
    }

    async DangNhapByBacSi(req:Request,res:Response):Promise<void>{
        try{
            const {email,mat_khau} = req.body;
            const bacsi = await this.bacSiService.DangNhapByBacSi(email,mat_khau);
            if(bacsi){
                const token = generateToken(bacsi);
                bacsi.token = token;
                res.json(bacsi);
            }else{
                res.status(401).json({message:'Sai mật khẩu hoặc tài khoản'});
            }
        }catch(error:any){
            res.json({message:error.message});
        }
    }

}