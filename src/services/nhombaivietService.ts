import { injectable } from 'tsyringe';
import { NhomBaiVietRepository } from '../repositories/nhombaivietRepository';

@injectable()
export class NhomBaiVietService{
    constructor(private nhomBaiVietService: NhomBaiVietRepository){}
    async getNhomBaiVietAll():Promise<any>{
        return this.nhomBaiVietService.getNhomBaiVietAll();
    }
    async createNhomBaiViet(nhombaiviet:any):Promise<any>{
        return this.nhomBaiVietService.createNhomBaiViet(nhombaiviet);
    }
    async updateNhomBaiViet(nhombaiviet:any):Promise<any>{
        return this.nhomBaiVietService.updateNhomBaiViet(nhombaiviet);
    }
    async deleteNhomBaiViet(id: any): Promise<any> {
        return this.nhomBaiVietService.deleteNhomBaiViet(id);  // Gọi repository để thực hiện xóa
    }
    
    async getNhomBaiVietByID(id:any):Promise<any>{
        return this.nhomBaiVietService.getNhomBaiVietByID(id);
    }
}