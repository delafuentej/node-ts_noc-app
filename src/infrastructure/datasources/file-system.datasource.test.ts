import path from 'path';
import { FileSystemDatasource } from "./file-system.datasource";
import {rmSync, readdirSync, readFileSync} from  'fs';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

describe('file-system.datasource.ts FileSystemDatasource', ()=> {

    const logPath = path.join(__dirname, '../../../logs');

    console.log(logPath)
    beforeEach(()=> {
        rmSync(logPath, {recursive: true, force: true});
    })

    test('should create log files if they do not exists', ()=> {

        new FileSystemDatasource();

        const files = readdirSync(logPath);

        expect(files).toEqual(['logs-all.log','logs-high.log','logs-medium.log']);
    });

    test('should save a log in alllogs-all.log file', ()=> {

        const fsLogDatasource = new FileSystemDatasource();

        const newLog = new LogEntity({
            message: 'test fs-datasource',
            origin: 'file-system.datasource.ts',
            level: LogSeverityLevel.low,
        });

        fsLogDatasource.saveLog(newLog);

        const allLogs = readFileSync(`${logPath}/logs-all.log`,'utf-8')
        
        expect(allLogs).toContain(JSON.stringify(newLog));
    });

    test('should save a log in alllogs-all.log  &  logs-medium.log files ', ()=> {

        const fsLogDatasource = new FileSystemDatasource();

        const newLog = new LogEntity({
            message: 'test fs-datasource',
            origin: 'file-system.datasource.ts',
            level: LogSeverityLevel.medium,
        });

        fsLogDatasource.saveLog(newLog);

        const allLogs = readFileSync(`${logPath}/logs-all.log`,'utf-8');
        const mediumLogs = readFileSync(`${logPath}/logs-medium.log`,'utf-8')
        
        expect(allLogs).toContain(JSON.stringify(newLog));
        expect(mediumLogs).toContain(JSON.stringify(newLog));
    });

    test('should save a log in alllogs-all.log  &  logs-high.log files ', ()=> {

        const fsLogDatasource = new FileSystemDatasource();

        const newLog = new LogEntity({
            message: 'test fs-datasource',
            origin: 'file-system.datasource.ts',
            level: LogSeverityLevel.high,
        });

        fsLogDatasource.saveLog(newLog);

        const allLogs = readFileSync(`${logPath}/logs-all.log`,'utf-8');
        const highLogs = readFileSync(`${logPath}/logs-high.log`,'utf-8')
        
        expect(allLogs).toContain(JSON.stringify(newLog));
        expect(highLogs).toContain(JSON.stringify(newLog));
    });

    test('should return all logs', async()=> {

        const fsLogDatasource = new FileSystemDatasource();

        const newLogLow = new LogEntity({
            message: 'test log-low fs-datasource',
            origin: 'file-system.datasource.ts',
            level: LogSeverityLevel.low,
        });
        const newLogMedium = new LogEntity({
            message: 'test log-medium fs-datasource',
            origin: 'file-system.datasource.ts',
            level: LogSeverityLevel.medium,
        });
        const newLogHigh = new LogEntity({
            message: 'test log-high fs-datasource',
            origin: 'file-system.datasource.ts',
            level: LogSeverityLevel.high,
        });

        await fsLogDatasource.saveLog(newLogLow);
        await fsLogDatasource.saveLog(newLogMedium);
        await fsLogDatasource.saveLog(newLogHigh);

        const getLogsLow = await fsLogDatasource.getLogs(LogSeverityLevel.low);
        const getLogsMedium = await fsLogDatasource.getLogs(LogSeverityLevel.medium);
        const getLogsHigh = await fsLogDatasource.getLogs(LogSeverityLevel.high);

        expect(getLogsLow).toEqual( expect.arrayContaining([newLogLow, newLogMedium, newLogHigh]));
        expect(getLogsMedium).toEqual( expect.arrayContaining([ newLogMedium]));
        expect(getLogsHigh).toEqual( expect.arrayContaining([newLogHigh]));

       
    });

    test('should not throw an error if path exists', ()=> {

        new FileSystemDatasource();
        new FileSystemDatasource();

        expect(true).toBeTruthy()
    });



    test('should throw an error if severity level ist not defined', async()=>{

        const fsLogDatasource = new FileSystemDatasource();
        const customSeverityLevel = 'HIGH_RISK' as LogSeverityLevel;

        try{
            await fsLogDatasource.getLogs(customSeverityLevel);
            expect(true).toBeFalsy()
        }catch(error){
            const errorMessage = `${error}`;
            console.log(errorMessage);
            expect(errorMessage).toContain(`${customSeverityLevel} not implemented`)
        };
    })

   

})