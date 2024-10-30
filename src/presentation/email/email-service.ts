
import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';


interface SendMailOptions {
    to: string;
    subject: string;
    htmlBody: string;
    //attachements
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

    

    async sendEmail(options: SendMailOptions): Promise<boolean>{
        const {to, subject, htmlBody} = options;
        try{
            const sendInfo = await this.transporter.sendMail({
                from: envs.MAILER_EMAIL,
                to: to,
                subject: subject,
                html: htmlBody,
            });
            console.log(sendInfo)
            return true;
        }catch(error){
            console.log(error);
            return false;
        }
    }
};