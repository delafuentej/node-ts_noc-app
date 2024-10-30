import { EmailService } from "../../../presentation/email/email-service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";



export interface SendEmailLogsUseCase {
    execute(to:string | string[]):Promise<boolean>;
}

export class SendEmailLogs implements SendEmailLogsUseCase{
    constructor (
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository
    ){}
   async execute(to:string | string[]){
    try{
       const sent =  await this.emailService.sendEmailWithFileSystemLogs(to);

       if(!sent){
         throw new Error(`Email-Log wasn't sent`)
       }
       const log = new LogEntity({
        message: 'Email-Log was succesfully sent', 
        level: LogSeverityLevel.low,
        origin: 'sentd-email-logs.ts',
    });
        this.logRepository.saveLog(log);
       return true;
    }catch(error){
        console.log(error);
        const errorMessage = `${error}`
        const log = new LogEntity({
            message: errorMessage, 
            level: LogSeverityLevel.high,
            origin: 'sentd-email-logs.ts',
        });
        this.logRepository.saveLog(log);
        return false;
    }

   
   }
}