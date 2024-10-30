//create de file data

import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

export interface CheckServiceUseCase{
    execute(url:string):Promise<boolean>;
};

type SuccessCallback = (()=> void) | undefined;
type ErrorCallback = ((error:string) => void) | undefined;
   
export class CheckService implements CheckServiceUseCase{
    constructor(
        private readonly logRepository: LogRepository,
        private readonly sucessCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback,
    ){
         //DI: Dependency Injection
    };

    public async execute(url:string): Promise<boolean>{
        const origin ='check-service.ts';
        try{
            const req = await fetch(url);

            if(!req.ok){
                throw new Error(`Error on check service: ${url}`)
            }
            const log = new LogEntity({
                message:`Service ${url} working`, 
                level: LogSeverityLevel.low,
                origin: origin,
            
            });
            this.logRepository.saveLog(log);
            this.sucessCallback && this.sucessCallback();
          //  console.log(`${url} is ok`)
            return true;
        }catch(error){
            const errorMessage = `${url}is not ok:${error}`
            const log = new LogEntity({
                message: errorMessage, 
                level: LogSeverityLevel.high,
                origin: origin,
            });
            this.logRepository.saveLog(log);
            this.errorCallback && this.errorCallback(errorMessage);
         
            return false;
        }
     
    }
   
}