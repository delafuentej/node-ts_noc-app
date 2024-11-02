import { LogRepositoryImplementation } from "./log.repository.implementation";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


describe('log.repository.implementation.ts LogRepositoryImplementation', ()=> {

    const mockLogDatasource = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }

    const logRepositoryImpl = new LogRepositoryImplementation(mockLogDatasource);

    beforeEach(()=>{
        jest.clearAllMocks();
    })

    test('saveLog method should call the datasource with arguments', async()=> {

        const newLog = new LogEntity({
            message: 'test log.repository.implementation',
            origin: 'log.repository.implementation.ts',
            level: LogSeverityLevel.low,
        });

        await logRepositoryImpl.saveLog(newLog);

        expect(mockLogDatasource.saveLog).toHaveBeenCalledWith(newLog);
    })

    test('getLogs method should call the datasource with arguments', async()=> {
        const logLowSeverity= LogSeverityLevel.low;

        await logRepositoryImpl.getLogs(logLowSeverity);

        expect(mockLogDatasource.getLogs).toHaveBeenCalledWith(logLowSeverity);

    })

})