import { envs } from "./envs.plugin";

describe('envs.plugin.ts', ()=> {

    test('should return env options', ()=> {
       // console.log(envs)
       expect(envs).toEqual({
        PORT: 3000,
        MAILER_HOST: 'smtp.gmail.com',
        MAILER_SERVICE: 'gmail',
        MAILER_EMAIL: 'jfuentelucas@gmail.com',
        MAILER_SECRET_KEY: 'penbgnrjsxllcfvb',
        PROD: false,
        MONGO_URL: 'mongodb://jfl:123456789@localhost:27017/',
        MONGO_DB_NAME: 'NOC-TEST',
        MONGO_USER: 'jfl',
        MONGO_PASS: '123456789'
       })
    });

    test('should return error if not found env', async()=> {
        jest.resetModules();
        process.env.PORT = 'tttt';
        console.log(envs)
        try{
            await import("./envs.plugin");
            expect(true).toBe(false)

        }catch(error){
            expect(`${error}`).toContain('"PORT" should be a valid integer')
            //console.log(error)
        }
    })
})