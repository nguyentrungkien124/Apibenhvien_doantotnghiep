import { injectable } from 'tsyringe';
import { BacSiRepository } from '../repositories/bacsiRepository';

@injectable()
export class BacSiService{
    constructor(private bacSiService: BacSiRepository){

    }
    async getBacSiAll():Promise<any>{
        return this.bacSiService.getBacSiAll();
    }
    async createBacSi(bacsi:any):Promise<any>{
        return this.bacSiService.createBacSi(bacsi);
    }
    async updateBacSi(bacsi:any):Promise<any>{
        return this.bacSiService.updateBacSi(bacsi);
    }
    async deleteBacSi(id:any):Promise<any>{
        return this.bacSiService.deleteBacSi(id);
    }
    async getBacSiById(id:any):Promise<any>{
        return this.bacSiService.getBacSiByID(id);
    }
    async searchBacSiTheoKhoa(pageIndex:number,pageSize:number,khoa_id:number,):Promise<any>{
        return this.bacSiService.searchBacSiTheoKhoa(pageIndex,pageSize,khoa_id);
    }
      async updateKhamBenhQuaVideo(id: string, khambenh_qua_video: boolean): Promise<any> {
        return this.bacSiService.updateKhamBenhQuaVideo(id, khambenh_qua_video);
    }
    async getBacSiQuaVideo(): Promise<any> {
        return this.bacSiService.getBacSiQuaVideo();
    } 
    async DangNhapByBacSi(email:string, mat_khau:string):Promise<any>{
        let bacsi = await this.bacSiService.DangNhapByBacSi(email,mat_khau);
        if(bacsi){
            return{
                id: bacsi.id,
                ho_ten:bacsi.ho_ten,
                email:bacsi.email,
                hinh_anh:bacsi.hinh_anh
            };
        }
        return null;
    }
}