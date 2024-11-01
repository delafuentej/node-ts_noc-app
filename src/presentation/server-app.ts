import { LogSeverityLevel } from "../domain/entities/log.entity";
import { LogRepository } from "../domain/repository/log.repository";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImplementation } from "../infrastructure/repository/log.repository.implementation";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email-service";



const fsLogRepository = new LogRepositoryImplementation(
   new FileSystemDatasource(),
);
const mongoLogRepository = new LogRepositoryImplementation(
   new MongoLogDatasource()
);
const postresLogRepository = new LogRepositoryImplementation(
   new PostgresLogDatasource(),
)

const logRepositories = [fsLogRepository, mongoLogRepository, postresLogRepository];

const emailService = new EmailService()

export class ServerApp {
   public static async run(){
    console.log('Server is running...');

    // Send email
   // const emailService = new EmailService(// fsLogRepository 
    //);

          //send email use-case
         // new SendEmailLogs(
         //    emailService,
         //    fsLogRepository,
         // ).execute(
         //    ['jfl1981sg@gmail.com', 'txetxusg1917@gmail.com']
         // )
      // emailService.sendEmailWithFileSystemLogs(
      //    ['jfl1981sg@gmail.com', 'txetxusg1917@gmail.com']
      // );

      // emailService.sendEmail({
      //    to:'jfl1981sg@gmail.com',
      //    subject:'Logs System',
      //    htmlBody: `
      //    <h3>Logs System - NOC</h3>
      //    <p>See Logs</p>
      //    `
      // })

      // const logs = await logRepository.getLogs(LogSeverityLevel.low)
      // console.log(logs);
   // CronService.createJob(
   //    '*/5 * * * * *',
   //    ()=>{
   //       const url = 'https://google.com';
   //      new CheckServiceMultiple(
   //       logRepositories,
   //       () => console.log(`${url} is ok`),
   //     // undefined,
   //       (error) => console.log(error),
   //     // undefined,
   //      ).execute(url)
   //      //new CheckService().execute('http://localhost:3000')
   //    }
   // );

 
   }
}