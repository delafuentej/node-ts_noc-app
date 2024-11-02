import { MongoLogDatasource } from "./mongo-log.datasource";
import { MongoDB } from "../../data/mongo";
import { envs } from "../../config/plugins/envs.plugin";
import mongoose from "mongoose";
import { LogModel } from "../../data/mongo";
import { LogSeverityLevel, LogEntity } from "../../domain/entities/log.entity";

describe('mongo-log.datasource.ts MongoLogDatasource', () => {

    const mongoLogDataSource = new MongoLogDatasource();

    const newLog = new LogEntity({
        level: LogSeverityLevel.low,
        message: 'test-message',
        origin: 'mongo-log.datasource.test.ts'
    })

    const logSpy = jest.spyOn(console,'log')

    beforeAll(async()=> {
        await MongoDB.connect({
            mongoUrl: envs.MONGO_URL,
            dbName: envs.MONGO_DB_NAME,
        })
    });

    afterEach(async()=>{
        await LogModel.deleteMany();
    })

    afterAll(async()=>{

        mongoose.connection.close();
    })

    test('should create a log', async()=> {

       
       await mongoLogDataSource.saveLog(newLog);

       expect(logSpy).toHaveBeenCalled();
       expect(logSpy).toHaveBeenCalledWith("Mongo-Log created:", expect.any(String))
    });

    test('should get logs', async()=> {

        await mongoLogDataSource.saveLog(newLog);
        await mongoLogDataSource.saveLog(newLog);
        
        const logs = await mongoLogDataSource.getLogs(LogSeverityLevel.low);

        expect(logs.length).toBe(2);
        expect(logs[0].level).toBe(LogSeverityLevel.low);
        expect(logSpy).toHaveBeenCalled();
    })


})