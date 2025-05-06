import { injectable } from "tsyringe";
import { ThongkeRepository } from "../repositories/thongkeRepository";

@injectable() 
export class ThongkeService{
    constructor (private thongkeRepository: ThongkeRepository){}
    async GetTop10Doctors():Promise<any>{
        return this.thongkeRepository.GetTop10Doctors();
    }
    async ThongKeTrangThietBi():Promise<any>{
        return this.thongkeRepository.ThongKeTrangThietBi();
    }
    async ThongKeTongSoBacSi():Promise<any>{
        return this.thongkeRepository.ThongKeTongSoBacSi();
    }
    async ThongKeTongLichHen():Promise<any>{
        return this.thongkeRepository.ThongKeTongLichHen();
    }
    async ThongKeTongKhachHang():Promise<any>{
        return this.thongkeRepository.ThongKeTongKhachHang();
    }
    async ThongKeSoLuongLichHenCuaTatCaBacSi():Promise<any>{
        return this.thongkeRepository.ThongKeSoLuongLichHenCuaTatCaBacSi();
    }
}