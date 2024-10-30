import { ServerApp } from "./presentation/server-app";


//self-invoking anonymous function
( ()=> {
    
    main();
})();


 function main(){
   
    ServerApp.run()
  
  
  }