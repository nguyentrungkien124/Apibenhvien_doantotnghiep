import { Request, Response } from 'express';
import { injectable } from "tsyringe";

import { generateToken } from '../config/jwt';
import { v2 as cloudinary } from 'cloudinary';
import { AdminService } from '../services/adminService';
cloudinary.config({
    cloud_name: 'dskbumohp',
    api_key: '325888745542338',
    api_secret: 'gcFF6WhzUcoWGrLlOmwevCaiy9A' // Click 'View Credentials' below to copy your API secret
});
@injectable()
export class AdminController {
  constructor(private adminService: AdminService
  ) { }


  async authenticate(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const admin = await this.adminService.authenticate(email, password);
      if (admin) {
        const token = generateToken(admin);
        admin.token = token;
        res.json(admin);
      } else {
        res.status(401).json({ message: "Sai mật tài khoản hoặc mật khẩu" });
      }
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }

 

}