
import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDB } from "./data/mongo";
import { ServerApp } from "./presentation/server-app";


//self-invoking anonymous function
( ()=> {
    
    main();
})();


 async function main(){

   await MongoDB.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
   })
   // create a db record in mongo db
   // create a collection => a table in an relational db
   // create a document => a record('row') in an relational db
  //  const newLog = await LogModel.create({
  //   message: 'Test message from Mongo',
  //   level: 'low',
  //   origin: 'app.ts'
  //  });


  //  await newLog.save();
  //  console.log(newLog)
  // const logs = await LogModel.find();
  // console.log(logs[4].level);
   
    ServerApp.run()
  
  
  }