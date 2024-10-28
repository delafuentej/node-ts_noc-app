import { CronService } from "./cron/cron-service";


export class ServerApp {
   public static run(){
    console.log('Server is running...');

   CronService.createJob(
      '*/5 * * * * *',
      ()=>{
         const date = new Date();
         console.log('Cron job executed every 5 seconds', date);
      }
   );

 
   }
}