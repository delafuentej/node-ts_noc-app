import mongoose from 'mongoose';
import { MongoDB } from './getting-started';

describe('getting-started.ts MongoDB connect', ()=>{

    afterAll(()=>{
        mongoose.connection.close();
    })

    test('should connect to MongoDB', async()=>{

        const connected = await MongoDB.connect({
            mongoUrl: process.env.MONGO_URL!,
            dbName: process.env.MONGO_DB_NAME!
        });
        expect(connected).toBe(true);
    });

    test('should throw an error', async()=>{
        try{

            const connected = await MongoDB.connect({
                mongoUrl:'mongodb://abc:123@localhost:27056',
                dbName: process.env.MONGO_DB_NAME!
            });
            expect(true).toBe(false)
        }catch(error){

        }
        

    })
})