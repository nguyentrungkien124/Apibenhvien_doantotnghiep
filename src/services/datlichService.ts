import { injectable } from 'tsyringe';
import { DatLichRepository } from '../repositories/datlichRepository';

@injectable()
export class DatLichService{
    constructor(private datLichService :DatLichRepository){}
    async createDatLich(datlich:any):Promise<any>{
        return this.datLichService.createDatLich(datlich);
    }
    async getUserEmail(nguoiDungId: number): Promise<string | null> {
        return this.datLichService.getUserEmail(nguoiDungId);
    }
    async updateTrangThaiLichKham(datlich:any):Promise<any>{
        return this.datLichService.updateTrangThaiLichKham(datlich);
    }
    async UpdateDaThanhToan(datlich:any):Promise<any>{
        return this.datLichService.UpdateDaThanhToan(datlich);
    }
    async HuyPhieuKham(datlich:any):Promise<any>{
        return this.datLichService.HuyPhieuKham(datlich);
    }
    async TuChoiKham(datlich:any):Promise<any>{
        return this.datLichService.TuChoiKham(datlich);
    }
    async getLichKhamByBacSi(bac_si_id:number,pageIndex:number,pageSize:number){
        return this.datLichService.getLichKhamByBacSi(bac_si_id,pageIndex,pageSize);
    }

    async GetLichKhamByNguoiDung(nguoi_dung_id:number,pageIndex:number,pageSize:number){
        return this.datLichService.GetLichKhamByNguoiDung(nguoi_dung_id,pageIndex,pageSize);
    }
    async getDoctorName(bacSiId: string): Promise<string | null> {
        return this.datLichService.getDoctorName(bacSiId);
    }
    async createJitsiMeetLink(appointment_id: number): Promise<{ link: string, email: string } | null> {
        return this.datLichService.createJitsiMeetLink(appointment_id);
    }
    async getNguoiDungIdByAppointmentId(appointmentId: number): Promise<number | null> {
        return this.datLichService.getNguoiDungIdByAppointmentId(appointmentId);
    }
   
    async updateJitsiMeetLink(appointmentId: number, jitsiMeetUrl: string): Promise<void> {
        return this.datLichService.updateJitsiMeetLink(appointmentId, jitsiMeetUrl);
    }
}