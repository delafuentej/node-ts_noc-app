
export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}


export class LogEntity {
    //records that we are going to handle in the data source
    public level: LogSeverityLevel;
    public message: string;
    public createAt: Date;

    constructor(message: string, ){}

}