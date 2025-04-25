import express from 'express';
import router from './routes/bacsiRouter';
import cors from 'cors';
import { createServer } from 'http'; // Tạo HTTP server
import { Server } from 'socket.io'; // Import Socket.IO
import axios from 'axios';

const crypto = require('crypto');
const app = express();
const PORT = 9999;

// Cấu hình body-parser và CORS
var bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Tích hợp Router
app.use('/api/', router);

// Tạo HTTP server từ Express
const server = createServer(app);

// Khởi tạo Socket.IO và kết nối với HTTP server
const io = new Server(server, {
  cors: {
    origin: '*', // Cho phép mọi nguồn, có thể tùy chỉnh theo nhu cầu
    methods: ['GET', 'POST'],
  },
});

// Lưu trữ socketId theo bác sĩ
const doctorSockets: { [key: string]: string } = {};


// Xử lý sự kiện khi client kết nối
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Xử lý sự kiện bác sĩ đăng nhập và tham gia room
 socket.on('join_room', (data) => {
  const { bac_si_id } = data;
  
  console.log(`Doctor ${bac_si_id} joined room`);
  doctorSockets[bac_si_id] = socket.id;
  socket.join(`doctor_${bac_si_id}`);
});

  // Xử lý sự kiện khi client ngắt kết nối
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    for (const bac_si_id in doctorSockets) {
      if (doctorSockets[bac_si_id] === socket.id) {
        delete doctorSockets[bac_si_id];
      }
    }
  });
});

// API phát thông báo "Bạn có phiếu khám mới"
app.post('/api/phieu-kham', (req, res) => {
  const { bac_si_id } = req.body; // Nhận thông tin bác sĩ từ client
  if (!bac_si_id) {
    return res.status(400).json({ message: 'Thiếu thông tin bác sĩ' });
  }
  const roomName = `doctor_${bac_si_id}`;
  io.to(roomName).emit('newNotification', {
    message: 'Bạn có phiếu khám mới',
  });

  // Gửi thông báo đến room của bác sĩ
  
  // Trả về phản hồi thành công
  res.status(200).json({ message: 'Thông báo đã được gửi' });
});
app.post('/api/payment', async (req, res) => {
  const bookingData = req.body; // Lấy dữ liệu từ client

  // Kiểm tra và xử lý amount để chuyển về số nguyên
  if (!bookingData.gia || isNaN(bookingData.gia)) {
    return res.status(400).json({ message: "Số tiền không hợp lệ" });
  }

  // Loại bỏ phần thập phân nếu có và chuyển thành số nguyên
  const formattedAmount = parseInt(parseFloat(bookingData.gia).toFixed(0), 10);

  if (formattedAmount < 1000) { // Đảm bảo số tiền tối thiểu là 1.000 đồng
    return res.status(400).json({ message: "Số tiền phải lớn hơn hoặc bằng 1.000 đồng" });
  }

  // Các biến khác
  const accessKey = 'F8BBA842ECF85';
  const secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
  const partnerCode = 'MOMO';
  const redirectUrl = 'http://localhost:3000/Thanhcong';
  const ipnUrl = 'https://37d2-27-70-184-122.ngrok-free.app/callback';
  const requestType = "payWithMethod";
  const requestId = bookingData.orderId || partnerCode + new Date().getTime(); // Sử dụng orderId từ client
  const  orderInfo='pay with MoMo'
  var extraData = JSON.stringify(bookingData);
  var autoCapture = true;
  var lang = 'vi';

  // Tạo chuỗi ký
  var rawSignature = "accessKey=" + accessKey +
    "&amount=" + formattedAmount +
    "&extraData=" + extraData +
    "&ipnUrl=" + ipnUrl +
    "&orderId=" + requestId + // Sử dụng requestId làm orderId
    '&orderInfo=' +
    orderInfo +
    "&partnerCode=" + partnerCode +
    "&redirectUrl=" + redirectUrl +
    "&requestId=" + requestId +
    "&requestType=" + requestType;

  const crypto = require('crypto');
  var signature = crypto.createHmac('sha256', secretKey)
    .update(rawSignature)
    .digest('hex');

  // Payload gửi đến MoMo
  const requestBody = JSON.stringify({
    partnerCode,
    partnerName: "Test",
    storeId: "MomoTestStore",
    requestId,
    amount: formattedAmount, // Số tiền đã chuẩn hóa
    orderId: requestId,
    orderInfo: 'pay with MoMo', // Sử dụng requestId làm orderId
    redirectUrl,
    ipnUrl,
    lang,
  
    requestType,
    autoCapture,
    extraData,
    signature
  });

  const options = {
    method: "POST",
    url: "https://test-payment.momo.vn/v2/gateway/api/create",
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(requestBody)
    },
    data: requestBody
  };

  try {
    const result = await axios(options);
    if (result.data && result.data.payUrl) {
      return res.status(200).json({ redirectUrl: result.data.payUrl });
    } else {
      console.error("No redirect URL received from MoMo:", result.data);
      return res.status(400).json({ message: "Không nhận được URL chuyển hướng từ MoMo" });
    }
  } catch (error) {
    console.error("Error while calling MoMo:", error);
    return res.status(500).json({ message: "Lỗi server khi gọi MoMo" });
  }
});


app.post('/callback', async (req, res) => {
  try {
    // Dữ liệu callback từ MoMo
    const { orderId, extraData } = req.body; // `extraData` chứa dữ liệu đặt lịch (JSON)

    // Bước 1: Thêm dữ liệu đặt lịch
    const addResponse = await axios.post('http://localhost:9999/api/datlich/them', JSON.parse(extraData));
    console.log('Thêm dữ liệu đặt lịch:', addResponse.data.message1.id);
    const id ={orderId:addResponse.data.message1.id}
 
    if (addResponse.status === 200) {
      const updateResponse = await axios.put('http://localhost:9999/api/datlich/updateDaThanhToan', 
        id 
      );
      console.log('Cập nhật trạng thái:', orderId);

      return res.status(200).json({ message: "Thành công", data: updateResponse.data });
    } else {
      return res.status(400).json({ message: "Không thể thêm dữ liệu đặt lịch" });
    }
  } catch (error:any) {
    console.error('Error in callback:', error.message);
    return res.status(500).json({ message: "Lỗi server khi xử lý callback" });
  }
});

app.post('/check-status-transaction', async (req, res) => {
  const { orderId } = req.body;
  

  // const signature = accessKey=$accessKey&orderId=$orderId&partnerCode=$partnerCode
  // &requestId=$requestId
  var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
  var accessKey = 'F8BBA842ECF85';
  const rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=MOMO&requestId=${orderId}`;

  const signature = crypto
    .createHmac('sha256', secretKey)
    .update(rawSignature)
    .digest('hex');

  const requestBody = JSON.stringify({
    partnerCode: 'MOMO',
    requestId: orderId,
    orderId: orderId,
    signature: signature,
    lang: 'vi',
  });

  // options for axios
  const options = {
    method: 'POST',
    url: 'https://test-payment.momo.vn/v2/gateway/api/query',
    headers: {
      'Content-Type': 'application/json',
    },
    data: requestBody,
  };

  const result = await axios(options);

  return res.status(200).json(result.data);
});
// Khởi chạy HTTP server
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

// Cung cấp Socket.IO cho các phần khác
export { io };
