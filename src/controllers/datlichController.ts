    import { Request, Response } from 'express';
    import { injectable } from "tsyringe";
    import { DatLichService } from '../services/datlichService';
    import { sendEmail } from '../config/mailer';
    import { io } from '../app';
    import axios from 'axios';

    @injectable()
    export class DatLichController {
        constructor(private datLichService: DatLichService) { }

        // Trong DatLichController
        
    async createDatLich(req: Request, res: Response): Promise<void> {
        try {
            const datlich = req.body as {
                nguoi_dung_id: number,
                bac_si_id: string,
                goi_kham_id: string,
                ngay_hen: string,
                ca_dat: string,
                trang_thai: string,
                ghi_chu: string,
                ngay_tao: string,
                chuyen_khoa: string,
                gia: string,
                ly_do: string
            };

            // Gọi dịch vụ để tạo lịch
            const rels =
            await this.datLichService.createDatLich(datlich);

            // Lấy email của người dùng
            const emailTo = await this.datLichService.getUserEmail(datlich.nguoi_dung_id);
            if (!emailTo) {
                res.status(400).json({ message: 'Không tìm thấy email của người dùng.' });
                return;
            }

            // Lấy tên bác sĩ
            const tenBacSi = await this.datLichService.getDoctorName(datlich.bac_si_id);
            if (!tenBacSi) {
                res.status(400).json({ message: 'Không tìm thấy thông tin bác sĩ.' });
                return;
            }

            // Gửi email xác nhận
            const subject = 'Xác nhận đặt lịch';
            const text = `
            Bạn đã đặt lịch khám thành công với thông tin sau:
            - Ngày hẹn: ${datlich.ngay_hen}
            - Giờ hẹn: ${datlich.ca_dat}
            - Bác sĩ: ${tenBacSi}
            - Chuyên khoa: ${datlich.chuyen_khoa}
            - Giá tiền: ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(datlich.gia))}
            - Ghi chú: ${datlich.ghi_chu}
            Vui lòng đến đúng giờ để đảm bảo thời gian khám!
            `;

            // Gửi thông báo qua Socket.IO đến bác sĩ
            io.to(`doctor_${datlich.bac_si_id}`).emit('new_appointment', {
                message: 'Bạn có lịch hẹn mới',
                data: {
                    nguoi_dung_id: datlich.nguoi_dung_id,
                    ngay_hen: datlich.ngay_hen,
                    ca_dat: datlich.ca_dat,
                    ghi_chu: datlich.ghi_chu,
                },
            });

            const html = `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                    <h2 style="color: #4CAF50; text-align: center;">Xác nhận đặt lịch thành công</h2>
                    <p>Chào bạn,</p>
                    <p>Bạn đã đặt lịch khám thành công với thông tin sau:</p>
                    <ul style="list-style-type: none; padding: 0;">
                        <li><strong>Ngày hẹn:</strong> ${datlich.ngay_hen}</li>
                        <li><strong>Giờ hẹn:</strong> ${datlich.ca_dat}</li>
                        <li><strong>Bác sĩ:</strong> ${tenBacSi}</li>
                        <li><strong>Ghi chú:</strong> ${datlich.ghi_chu}</li>
                        <li><strong>Chuyên khoa:</strong> ${datlich.chuyen_khoa}</li>
                        <li><strong>Giá tiền:</strong> ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(datlich.gia))}</li>
                    </ul>
                    <p style="color: red; font-weight: bold;">Vui lòng đến đúng giờ để đảm bảo thời gian khám!</p>
                    <p style="text-align: center; color: #555;">Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>
                </div>
            `;

            await sendEmail(emailTo, subject, text, html);

            // Phát sự kiện thời gian thực qua Socket.IO cho tất cả người dùng (client)
            io.emit('appointment_booked', {
                nguoi_dung_id: datlich.nguoi_dung_id,
                bac_si_id: datlich.bac_si_id,
                ngay_hen: datlich.ngay_hen,
                ca_dat: datlich.ca_dat,
                trang_thai: datlich.trang_thai
            });

            // Gọi API phieu-kham để gửi thông báo cho bác sĩ
            await axios.post('http://localhost:9999/api/phieu-kham', {
                bac_si_id: datlich.bac_si_id
            });

            // Phản hồi thành công
            res.json({ message: 'Đã thêm đặt lịch thành công và gửi email xác nhận.',message1:rels });
        } catch (error: any) {
            console.error('Error in createDatLich:', error);
            res.status(500).json({ message: error.message });
        }
    }


    async createJitsiMeetLink(req: Request, res: Response): Promise<void> {
        try {
            const { appointment_id } = req.body;
    
            if (!appointment_id) {
                res.status(400).json({ message: 'appointment_id is required' });
                return;
            }
    
            // Lấy nguoi_dung_id từ phiếu hẹn
            const nguoi_dung_id = await this.datLichService.getNguoiDungIdByAppointmentId(appointment_id);
    
            if (!nguoi_dung_id) {
                res.status(404).json({ message: 'Không tìm thấy phiếu hẹn.' });
                return;
            }
    
            // Tạo link Jitsi Meet với appointment_id
            const jitsiMeetUrl = `https://meet.jit.si/room_${appointment_id}`;
    
            // Lấy email của khách hàng từ bảng nguoi_dung
            const customerEmail = await this.datLichService.getUserEmail(nguoi_dung_id);
            if (!customerEmail) {
                res.status(404).json({ message: 'Không tìm thấy email của khách hàng.' });
                return;
            }
    
            // Cập nhật link Jitsi Meet vào cột jitsi_url trong bảng dat_lich
            await this.datLichService.updateJitsiMeetLink(appointment_id, jitsiMeetUrl);
    
            // Gửi email xác nhận cho khách hàng
            const subject = 'Phòng họp Jitsi Meet cho lịch khám của bạn';
            const text = `Chào bạn,
    
    Bạn có thể tham gia phòng họp trực tuyến qua Jitsi Meet tại liên kết sau:
    ${jitsiMeetUrl}
    
    Vui lòng tham gia đúng giờ.`;
    
            const html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <h2 style="color: #4CAF50; text-align: center;">Phòng họp Jitsi Meet cho lịch khám của bạn</h2>
                <p>Chào bạn,</p>
                <p>Vui lòng tham gia phòng họp trực tuyến qua Jitsi Meet tại liên kết dưới đây:</p>
                <p><a href="${jitsiMeetUrl}" target="_blank">${jitsiMeetUrl}</a></p>
                <p style="color: red; font-weight: bold;">Vui lòng tham gia đúng giờ để đảm bảo thời gian khám!</p>
            </div>
            `;
    
            // Gửi email cho khách hàng
            await sendEmail(customerEmail, subject, text, html);
    
            // Phản hồi thành công
            res.json({
                message: 'Đã tạo phòng họp Jitsi Meet và gửi email xác nhận.',
                link: jitsiMeetUrl,
                email: customerEmail
            });
        } catch (error: any) {
            console.error('Error in createJitsiMeetLink:', error);
            res.status(500).json({ message: error.message });
        }
    }
    
    // async testEmail(req: Request, res: Response): Promise<void> {
    //     try {
    //         await sendEmail('kiennro38@gmail.com', 'Test Subject', 'This is a test email.');
    //         res.json({ message: 'Email sent successfully!' });
    //     } catch (error: any) {
    //         res.status(500).json({ message: 'Error sending email: ' + error.message });
    //     }
    // }
    async updateTrangThaiLichKham(req: Request, res: Response): Promise<void> {
        try {
            let datlich = req.body as { id: string };
            const results = await this.datLichService.updateTrangThaiLichKham(datlich);
            res.json({ message: 'Đã sửa thành công trạng thái lịch khám' });
            // let nhomthietbi =req.body as {id:string,ten_nhom:string,trang_thai:string};
            // const results = await this.nhomThietBiService.updateNhomThietBi(nhomthietbi);
            // res.json({message:'Đã sửa thành công nhóm thiết bị',results:true})
        } catch (error: any) {
            res.json({ message: error.message });
        }
    }
    async UpdateDaThanhToan(req: Request, res: Response): Promise<void> {
        try {
            let datlich = req.body as { orderId: string };
            const results = await this.datLichService.UpdateDaThanhToan(datlich);
            res.json({ message: 'Đã sửa thành công trạng thái đã thanh toán' });
           
        } catch (error: any) {
            res.json({ message: error.message });
        }
    }


    async HuyPhieuKham(req: Request, res: Response): Promise<void> {
        try {
            const datlich = req.body as { id: string, ghi_chu: string };
            const results = await this.datLichService.HuyPhieuKham(datlich);

            if (!datlich.id || !datlich.ghi_chu) {
                res.status(400).json({ message: 'Thiếu id hoặc ghi chú' });
                return;
            }

            res.json({ message: 'Đã sửa thành công trạng thái lịch khám' });
        } catch (error: any) {
            res.json({ message: error.message });
        }
    }

    async TuChoiKham(req: Request, res: Response): Promise<void> {
        try {
            const datlich = req.body as { id: string, ly_do: string };
            const results = await this.datLichService.TuChoiKham(datlich);

            if (!datlich.id || !datlich.ly_do) {
                res.status(400).json({ message: 'Thiếu id hoặc ghi chú' });
                return;
            }

            res.json({ message: 'Đã sửa thành công trạng thái lịch khám' });
        } catch (error: any) {
            res.json({ message: error.message });
        }
    }


    async getLichKhamByBacSi(req: Request, res: Response): Promise<void> {
        try {
            const bac_si_id = parseInt(req.params.bac_si_id);
            const pageIndex = parseInt(req.params.pageIndex, 10);
            const pageSize = parseInt(req.params.pageSize, 10);

            if (isNaN(bac_si_id) || isNaN(pageIndex) || isNaN(pageSize)) {
                res.status(400).json({ message: 'Thông tin đầu vào không hợp lệ' });
                return;
            }
            const datlich = await this.datLichService.getLichKhamByBacSi(bac_si_id, pageIndex, pageSize)

            if (datlich) {
                res.json(datlich);
            } else {
                res.json({ message: 'Bản ghi không tồn tại' });
            }
        } catch (error: any) {
            res.json({ messaage: error.messaage });
        }
    }

    async GetLichKhamByNguoiDung(req: Request, res: Response): Promise<void> {
        try {
            const nguoi_dung_id = parseInt(req.params.nguoi_dung_id);
            const pageIndex = parseInt(req.params.pageIndex, 10);
            const pageSize = parseInt(req.params.pageSize, 10);

            if (isNaN(nguoi_dung_id) || isNaN(pageIndex) || isNaN(pageSize)) {
                res.status(400).json({ message: 'Thông tin đầu vào không hợp lệ' });
                return;
            }
            const datlich = await this.datLichService.GetLichKhamByNguoiDung(nguoi_dung_id, pageIndex, pageSize)

            if (datlich) {
                res.json(datlich);
            } else {
                res.json({ message: 'Bản ghi không tồn tại' });
            }
        } catch (error: any) {
            res.json({ messaage: error.messaage });
        }
    }
}
