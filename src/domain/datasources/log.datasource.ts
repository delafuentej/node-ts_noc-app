import { LogEntity, LogSeverityLevel } from '../entities/log.entity';


export abstract class LogDatasource {
    //abstract => prevent creating a instance of the class
    // to enforce the behaviour of this class over other classes
    //methods(business rules for  datasource):
    abstract saveLog( log: LogEntity): Promise<void>
    abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>
} 