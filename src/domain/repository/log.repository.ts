import { LogEntity, LogSeverityLevel } from '../entities/log.entity';


export abstract class LogRepository {
   //allows to call methods found in the datasource
  // (as the repository is going to have the datasource), 
    abstract saveLog( log: LogEntity): Promise<void>
    abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>
} 