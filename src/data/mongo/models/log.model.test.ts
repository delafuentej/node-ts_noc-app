import { MongoDB } from "../getting-started";
import { envs } from "../../../config/plugins/envs.plugin";
import mongoose from "mongoose";
import { LogModel } from "./log.model";

describe('log.model.ts testing LogModel', ()=> {

    beforeAll(async()=>{
        await MongoDB.connect({
            mongoUrl: envs.MONGO_URL,
            dbName: envs.MONGO_DB_NAME
        })
    });

    // to avoid the warning message in the console
    afterAll(()=>{
        mongoose.connection.close();
    });

    test('should return LogModel',async()=> {
        const logData = {
            origin: 'log.model.test.ts',
            message: 'test-message',
            level: 'low'
        };

        const log = await LogModel.create(logData);

        expect(log).toEqual( expect.objectContaining({
                ...logData,
                createAt: expect.any(Date),
                id: expect.any(String)
            
            },

        ));

        await LogModel.findByIdAndDelete(log.id);
    });

    test('should return the schema object', ()=>{

        const schema = LogModel.schema.obj;
        
        expect(schema).toEqual( expect.objectContaining(
            {
                message: { type: expect.any(Function), required: true },
                level: {
                  type: expect.any(Function),
                  enum: [ 'low', 'medium', 'high' ],
                  default: 'low'
                },
                createAt: { type: expect.any(Function), default:expect.any(Date) },
                origin: { type: expect.any(Function) }
              }
        ))
    })


    


})