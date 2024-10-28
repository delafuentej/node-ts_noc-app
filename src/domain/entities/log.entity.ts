
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
    }

}