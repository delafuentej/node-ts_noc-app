//create de file data

export interface CheckServiceUseCase{
    execute(url:string):Promise<boolean>;
};

type SuccessCallback = ()=> void;
type ErrorCallback = (error:string) => void;
   
export class CheckService implements CheckServiceUseCase{
    constructor(
        private readonly sucessCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback,
    ){
         //DI: Dependency Injection
    };

    public async execute(url:string): Promise<boolean>{
        try{
            const req = await fetch(url);

            if(!req.ok){
                throw new Error(`Error on check service: ${url}`)
            }
            this.sucessCallback();
          //  console.log(`${url} is ok`)
            return true;
        }catch(error){
            this.errorCallback(`${error}`);
           // console.log(`Error${error}`)
            return false;
        }
     
    }
   
}