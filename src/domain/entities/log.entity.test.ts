import { LogEntity, LogSeverityLevel} from "./log.entity"

describe('log.entity.ts LogEntity', ()=> {

    const dataObj ={
        origin: 'log.entity.test.ts',
        message: 'test-message',
        level: LogSeverityLevel.low,
    };

    test('should create a LogEntity instance', ()=> {

       

        const newLog = new LogEntity(dataObj);

        expect(newLog).toBeInstanceOf(LogEntity);
        expect(newLog.message).toBe(dataObj.message);
        expect(newLog.level).toBe(dataObj.level);
        expect(newLog.origin).toBe(dataObj.origin);
        expect(newLog.createAt).toBeInstanceOf(Date);
    });

    test('should create a LogEntity instance from json', ()=>{

        const json = `{"message":"Service https://google.com working","level":"low","createAt":"2024-11-01T10:14:25.353Z","origin":"check-service.ts"}`;

        const newLog = LogEntity.fromJson(json);

        expect(newLog).toBeInstanceOf(LogEntity);
        expect(newLog.message).toBe("Service https://google.com working");
        expect(newLog.level).toBe(LogSeverityLevel.low);
        expect(newLog.origin).toBe("check-service.ts");
        expect(newLog.createAt).toBeInstanceOf(Date);
    });

    test('should create a LogEntity instance from object', ()=> {

        const newLog = LogEntity.fromObject(dataObj)

        expect(newLog).toBeInstanceOf(LogEntity);
        expect(newLog.message).toBe(dataObj.message);
        expect(newLog.level).toBe(dataObj.level);
        expect(newLog.origin).toBe(dataObj.origin);
        expect(newLog.createAt).toBeInstanceOf(Date);

    })
})