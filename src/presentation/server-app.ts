import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImplementation } from "../infrastructure/repository/log.repository.implementation";
import { CronService } from "./cron/cron-service";



const fsLogRepository = new LogRepositoryImplementation(
   new FileSystemDatasource(),
);


export class ServerApp {
   public static run(){
    console.log('Server is running...');

   CronService.createJob(
      '*/5 * * * * *',
      ()=>{
         const url = 'http://localhost:3000';
        new CheckService(
         fsLogRepository,
         () => console.log(`${url} is ok`),
         (error) => console.log(error)
        ).execute(url)
        //new CheckService().execute('http://localhost:3000')
      }
   );

 
   }
}