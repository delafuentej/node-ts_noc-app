
import { envs } from "./config/plugins/envs.plugin";
import { MongoDB } from "./data/mongo";
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

   
    ServerApp.run()
  
  
  }