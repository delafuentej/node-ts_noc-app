import { LogEntity } from "../../entities/log.entity";
import { CheckService } from "./check-service";

describe('check-service.ts CheckService UseCase', ()=> {

      //create the mocks of the dependencies needed by the use case:
      const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
      };

      const successCallback = jest.fn();
      const errorCallback = jest.fn();

    const checkService = new CheckService(
        mockRepository,
        successCallback,
        errorCallback
    );

    beforeEach(()=> {
        jest.clearAllMocks();
    })
    
    test('should call SuccessCallback when fetch return true', async()=> {
      
      

        const successReq = await checkService.execute('https://google.com');

        expect(successReq).toBe(true);
        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();

        expect(mockRepository.saveLog).toHaveBeenCalledWith( expect.any(LogEntity));

    });

    test('should call ErrorCallback when fetch return false', async()=> {
      
      

        const req = await checkService.execute('https://googleqweetewt.com');

        expect(req).toBe(false);
        expect(successCallback).not.toHaveBeenCalled();
        expect(errorCallback).toHaveBeenCalled();

        expect(mockRepository.saveLog).toHaveBeenCalledWith( expect.any(LogEntity));

    })
})