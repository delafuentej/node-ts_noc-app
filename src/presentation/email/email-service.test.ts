import { EmailService, SendMailOptions} from './email-service';
import nodemailer from 'nodemailer';



describe('email.service.ts EmailService', ()=> {

    

    const mockSendEmail = jest.fn();

    //mock to createTransport
    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendEmail
    });

    const emailService = new EmailService();

    test('should send email', ()=>{

        const options: SendMailOptions = {
            to: 'jfl1981@gmail.com',
            subject: 'test email-service',
            htmlBody: '<h1>Test Email-Service</h1>'
        };

          emailService.sendEmail(options);

        expect(mockSendEmail).toHaveBeenCalledWith({
            from: "jfuentelucas@gmail.com",
            attachments: expect.any(Array),
            subject: 'test email-service',
            html: expect.any(String),
            to:  'jfl1981@gmail.com',
        })
    })


    // test( 'should send email with attachements', async () => {
    //     const email= 'jfl1981@gmail.com';
        
    //     await emailService.sendEmailWithFileSystemLogs(email);

    //     expect(mockSendEmail).toHaveBeenCalledWith({
    //         from: "jfuentelucas@gmail.com",
    //         to:'jfl1981@gmail.com' ,
    //         subject:"Logs Server",
    //         html: expect.any( String ),
    //         attachments: expect.arrayContaining([
    //             { filename: 'logs-all.log', path: './logs/logs-all.log' },
    //             { filename: 'logs-high.log', path: './logs/logs-high.log' },
    //             { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
    //           ])
    //     })
    // })
})