import { injectable } from "tsyringe";
import { ThongkeRepository } from "../repositories/thongkeRepository";

@injectable() 
export class ThongkeService{
    constructor (private thongkeRepository: ThongkeRepository){}
    async GetTop10Doctors():Promise<any>{
        return this.thongkeRepository.GetTop10Doctors();
    }
  
}