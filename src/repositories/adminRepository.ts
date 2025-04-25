import { injectable } from 'tsyringe';
import { Database } from '../config/database';

@injectable()
export class AdminRepository {
  constructor(private db: Database) { }
 

  async DangNhapByadmin(email: string, password: string): Promise<any> {
    try {
      const sql = 'CALL DangNhapByadmin(?,?)';
      const [results] = await this.db.query(sql, [email, password]);
      if (Array.isArray(results) && results.length > 0) {
        return results[0];
      }
      return null;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  
}