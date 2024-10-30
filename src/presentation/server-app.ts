import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImplementation } from "../infrastructure/repository/log.repository.implementation";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email-service";



const fsLogRepository = new LogRepositoryImplementation(
   new FileSystemDatasource(),
);


export class ServerApp {
   public static run(){
    console.log('Server is running...');

    // Send email
       const emailService = new EmailService(// fsLogRepository 
          );

          //send email use-case
         new SendEmailLogs(
            emailService,
            fsLogRepository,
         ).execute(
            ['jfl1981sg@gmail.com', 'txetxusg1917@gmail.com']
         )
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
   // CronService.createJob(
   //    '*/5 * * * * *',
   //    ()=>{
   //       const url = 'https://google.com';
   //      new CheckService(
   //       fsLogRepository,
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