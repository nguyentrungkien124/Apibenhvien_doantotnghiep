import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // Tải các biến môi trường từ file .env

export const sendEmail = async (to: string, subject: string, text: string, html: string) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Hoặc dịch vụ email bạn muốn sử dụng
        auth: {
            user: process.env.EMAIL_USER, // Địa chỉ email của bạn từ biến môi trường
            pass: process.env.EMAIL_PASS  // Mật khẩu email của bạn từ biến môi trường
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER, // Địa chỉ email của bạn
        to: to,                       // Địa chỉ email người nhận
        subject: subject,             // Chủ đề email
        text: text,                   // Nội dung dạng text (dành cho client không hỗ trợ HTML)
        html: html                    // Nội dung dạng HTML (nếu client hỗ trợ)
    };

    return transporter.sendMail(mailOptions);
};
