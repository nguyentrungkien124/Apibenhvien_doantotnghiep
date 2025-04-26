  import { injectable } from 'tsyringe';
  import { BaiVietRepository } from '../repositories/baivietRepository';

  @injectable()
  export class BaiVietService {
    constructor(private baiVietService: BaiVietRepository
    ) {}
    async getBaiVietAll(): Promise<any> {
      return this.baiVietService.getBaiVietAll();
    }
    async createBaiViet(baiviet:any):Promise<any>{
      return this.baiVietService.createBaiViet(baiviet);
    }
    async updateBaiViet(baiviet:any):Promise<any>{
      return this.baiVietService.updateBaiViet(baiviet);
    }
    async deleteBaiViet(id:any):Promise<any>{
      return this.baiVietService.deleteBaiViet(id);
    }
    async getBaiVietByID(id:any):Promise<any>{
      return this.baiVietService.getBaiVietByID(id);
    }
    async getBaiVietCM(pageIndex:number,pageSize:number,loai_bai_viet:number,):Promise<any>{
      return this.baiVietService.getBaiVietCM(pageIndex,pageSize,loai_bai_viet);
    }
  }