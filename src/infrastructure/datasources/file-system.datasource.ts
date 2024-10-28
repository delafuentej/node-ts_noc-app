import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { writeFileSync, mkdirSync, existsSync, appendFileSync} from "fs";

export class FileSystemDatasource implements LogDatasource{

    private readonly logPath = 'logs/';
    private readonly allLogsPath = 'logs/logs-all.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly highLogsPath = 'logs/logs-high.log';

    constructor(){
        this.createLogsFiles();
    }

    private createLogsFiles = () => {
            if(!existsSync(this.logPath)){
                mkdirSync(this.logPath);
            };
          [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath,
          ].forEach( path => {
            if(existsSync(path)) return;
            writeFileSync(path,'');
          })
    }

    async saveLog(log: LogEntity): Promise<void> {

        const logAsJson =  `${JSON.stringify(log)}\n`;

       appendFileSync(this.allLogsPath,logAsJson);

       switch (log.level) {

        case LogSeverityLevel.medium:
            appendFileSync(this.mediumLogsPath, logAsJson);
            break;
        case LogSeverityLevel.high:
            appendFileSync(this.highLogsPath, logAsJson);
            break;
        case LogSeverityLevel.low:
        default:
            return;
    }

    }
    getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        throw new Error("Method not implemented.");
    }

}