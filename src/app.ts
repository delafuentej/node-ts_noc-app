import { ServerApp } from "./presentation/server-app";

import { envs } from './config/plugins/envs.plugin';

//self-invoking anonymous function
( ()=> {
    
    main();
})();


 function main(){
   
   // ServerApp.run()
  
  console.log( envs.PORT)
  console.log(envs.MAILER_EMAIL)
  console.log( envs.MAILER_SECRET_KEY)
  }