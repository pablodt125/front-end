export class PersonModel{
    id:number;
    identification:string
    fullName:string
    email:string
    birth:Date
    gender:string;
    
    constructor(){
        this.id=null;
        this.identification=""
        this.fullName=""
        this.email=""
        this.birth=new Date();
        this.gender=""
    }
}