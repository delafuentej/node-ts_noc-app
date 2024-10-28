//create de file data


  
export interface CheckServiceUseCase{
    execute(url:string):Promise<boolean>;
};

   
export class CheckService implements CheckServiceUseCase{
    // constructor(){
    //      //DI: Dependency Injection
    // };

    public async execute(url:string): Promise<boolean>{
        try{
            const req = await fetch(url);

            if(!req.ok){
                throw new Error(`Error on check service: ${url}`)
            }
            console.log(`${url} is ok`)
            return true;
        }catch(error){
            console.log(`Error${error}`)
            return false;
        }
     
    }
   
}