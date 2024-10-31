
export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}

export interface LogEntityOptions {
    message: string;
    level: LogSeverityLevel;
    createAt?: Date;
    origin: string;
}

export class LogEntity {
    //records that we are going to handle in the data source
    //information flowing in the app logs
    // what will govern the app
    public level: LogSeverityLevel;
    public message: string;
    public createAt: Date;
    public origin: string;

    constructor(options:LogEntityOptions){
        const {message, level, origin, createAt = new Date()} = options;
      
        this.message = message;
        this.level = level;
        this.createAt = createAt;
        this.origin = origin;

    };

    static fromObject= (object: {[key: string]: any}): LogEntity => {
        const {level, message, createAt, origin } = object;

        const log = new LogEntity({
            level: level,
            message: message,
            createAt: createAt,
            origin: origin,
        });

        return log;
    }

    static fromJson = (json:string): LogEntity => {
       const {level, message, createAt, origin} = JSON.parse(json);
       if(!message) throw new Error('Message is required');
       if(!level) throw new Error('Level is required');
    //   if(!createAt) throw new Error('Date createAt is required');

       const log = new LogEntity({
        level: level,
        message: message,
        createAt: createAt,
        origin: origin,
    });
       //log.createAt = new Date(createAt);
       return log;
    }

}