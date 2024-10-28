
export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}


export class LogEntity {
    //records that we are going to handle in the data source
    //information flowing in the app logs
    // what will govern the app
    public level: LogSeverityLevel;
    public message: string;
    public createAt: Date;

    constructor(message: string, level: LogSeverityLevel){
        this.message = message;
        this.level = level;
        this.createAt = new Date();
    };

    static fromJson = (json:string): LogEntity => {
       const {level, message, createAt} = JSON.parse(json);
       if(!message) throw new Error('Message is required');
       if(!level) throw new Error('Level is required');
    //   if(!createAt) throw new Error('Date createAt is required');

       const log = new LogEntity(level, message);
       log.createAt = new Date(createAt);
       return log;
    }

}