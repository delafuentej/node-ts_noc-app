import { LogEntity } from "../../entities/log.entity";
import { CheckServiceMultiple } from "./check-service-multiple";

describe('check-service-multiple.ts CheckServiceMultiple UseCase', ()=> {

      //create the mocks of the dependencies needed by the use case:
      const mockRepo1 = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
      };
      const mockRepo2= {
        saveLog: jest.fn(),
        getLogs: jest.fn()
      };
      const mockRepo3 = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
      };

      const mockRepositories =  [mockRepo1, mockRepo2, mockRepo3];

      const successCallback = jest.fn();
      const errorCallback = jest.fn();

    const checkServiceMultiple = new CheckServiceMultiple(
        mockRepositories,
        successCallback,
        errorCallback
    );

    beforeEach(()=> {
        jest.clearAllMocks();
    })
    
    test('should call SuccessCallback when fetch return true', async()=> {
      
      

        const successReq = await checkServiceMultiple.execute('https://google.com');

        expect(successReq).toBe(true);
        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();

        expect(mockRepo1.saveLog).toHaveBeenCalledWith( expect.any(LogEntity));
        expect(mockRepo2.saveLog).toHaveBeenCalledWith( expect.any(LogEntity));
        expect(mockRepo3.saveLog).toHaveBeenCalledWith( expect.any(LogEntity));

    });

    test('should call ErrorCallback when fetch return false', async()=> {
      
      

        const req = await checkServiceMultiple.execute('https://googleqweetewt.com');

        expect(req).toBe(false);
        expect(successCallback).not.toHaveBeenCalled();
        expect(errorCallback).toHaveBeenCalled();

        expect(mockRepo1.saveLog).toHaveBeenCalledWith( expect.any(LogEntity));
        expect(mockRepo2.saveLog).toHaveBeenCalledWith( expect.any(LogEntity));
        expect(mockRepo3.saveLog).toHaveBeenCalledWith( expect.any(LogEntity));

    })
})