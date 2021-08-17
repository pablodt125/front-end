import { PersonModel } from './person-model';
export class ChildByParentModel{
    id:number
    mother:number
    father:number
    child:PersonModel

    constructor(){
        this.id=null;
        this.mother=null;
        this.father=null;
        this.child=new PersonModel();
    }
}