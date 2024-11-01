import { EmailService } from '../../../presentation/email/email-service';
import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';
import {  SendEmailLogs } from './send-email-logs';

describe('send-email-logs.ts SendEmailLogs UseCase', ()=> {

         //create the mocks of the dependencies needed by the use case:
         const mockEmailService = {
            sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true),
         }
         const mockLogRepository : LogRepository= {
            saveLog: jest.fn(),
            getLogs: jest.fn()
          };

          const sendEmailLogs = new SendEmailLogs(
            mockEmailService as any,
            mockLogRepository
        );


          beforeEach(()=> {
            jest.clearAllMocks();
        })

    test('should call sendEmail and saveLog', async()=> {
       

        const sent = await sendEmailLogs.execute(['jfl1981@gmail.com']);

        expect(sent).toBe(true);

        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
            createAt: expect.any(Date),
            level: LogSeverityLevel.low,
            message: "Email-Log was succesfully sent",
            origin: "send-email-logs.ts",
        });
    })

    test('should log in case of erro', async()=> {

        mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(false);
  
        const sent = await sendEmailLogs.execute(['jfl1981@gmail.com']);

        expect(sent).toBe(false);

        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
            createAt: expect.any(Date),
            level: LogSeverityLevel.high,
            message: "Error: Email-Log wasn't sent",
            origin: "send-email-logs.ts",
        });
    })
})