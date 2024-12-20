
import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
//import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';



export interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    //attachements
    attachments?: Attachment[];
}

export interface Attachment {
    fileName: string;
    path: string;
}

export class EmailService {
    private transporter = nodemailer.createTransport({
        host: envs.MAILER_HOST,
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        },
    });

    constructor(
        // private readonly logRepository: LogRepository,
    ){}

    async sendEmail(options: SendMailOptions): Promise<boolean>{
        const {to, subject, htmlBody, attachments=[]} = options;
        try{
            const sendInfo = await this.transporter.sendMail({
                from: envs.MAILER_EMAIL,
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments,
            });
          //  console.log(sendInfo)
            // const log = new LogEntity({
            //     level: LogSeverityLevel.low,
            //     message: 'Email sent',
            //     origin:'email-service.ts',

            // })
       //     this.logRepository.saveLog(log);
            
            return true;
        }catch(error){
            console.log(error);
            // const log = new LogEntity({
            //     level: LogSeverityLevel.high,
            //     message: 'Email not sent',
            //     origin:'email-service.ts',
            // })
         //   this.logRepository.saveLog(log);
            return false;
        }
    }

    async sendEmailWithFileSystemLogs(to: string | string[]){
        const subject = 'Logs Server'
        const htmlBody = `
          <h3>Logs System - NOC</h3>
            <h4>See Attachments Files</h4>
        `;
        const attachments: Attachment[] = [
            {
                fileName: 'logs-all.log',
                path:'./logs/logs-all.log'
            },
            {
                fileName: 'logs-high.log',
                path:'./logs/logs-high.log'
            },
            {
                fileName: 'logs-medium.log',
                path:'./logs/logs-medium.log'
            },
        ];
        return this.sendEmail({
            to,
            subject,
            attachments,
            htmlBody
        })


    }
};