import { injectable } from 'tsyringe';

import { AdminRepository } from '../repositories/adminRepository';

@injectable()
export class AdminService {
  constructor(private adminRepository: AdminRepository
  ) {}
  
  

  async authenticate(email: string, password: string): Promise<any> {     
    let admin = await this.adminRepository.DangNhapByadmin(email, password);
    if (admin) { 
      return {
        id: admin.id,
        ho_ten: admin.name,
        email: admin.email 
      };
    }
    return null;
  }
}