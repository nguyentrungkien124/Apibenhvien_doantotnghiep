import { injectable } from "tsyringe";
import { Database } from "../config/database";

@injectable()
 export class ThongkeRepository{
    constructor (private db:Database){}
    async GetTop10Doctors():Promise<any>{
        try{
            const sql = 'CALL GetTop10Doctors()';
            const [results] =await this.db.query(sql,[]);
            return results;
        }catch(error:any){
            throw new Error(error.messge);
        }
    }

}

    
export default ThongkeRepository;
