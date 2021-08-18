import { PersonModel } from './../../../models/entities/person-model';
import { ChildByParentModel } from './../../../models/entities/children-by-parent-model';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CrudServiceService } from 'src/app/shared/cruds/crud-service.service';
import { InfoMessagesService } from 'src/app/shared/messages/info-messages.service';
import { RespuestaDto } from 'src/models/response/respuesta-dto';

@Component({
  selector: 'app-to-pair-children',
  templateUrl: './to-pair-person-child.component.html',
  styleUrls: ['./to-pair-person-child.component.scss']
})
export class ToPairPersonComponent implements OnInit {

  rows: any = [];
  temp: string[];
  pairChildByParent = new ChildByParentModel();
  childToPair: Array<PersonModel> = new Array();
  childLinked:Array<PersonModel>=Array();
  childInfo:PersonModel=new PersonModel();

  columns = [
    { prop: 'organizacion' },
    { name: 'fechaCreacion' }
  ];

  @Input() public personInfo = new PersonModel();
  @ViewChild('createModuleForm') createModuleForm: NgForm;

  constructor(
    private modalService: NgbModal,
    private crudServices: CrudServiceService,
    private messageService: InfoMessagesService
      ) { }

  ngOnInit() {
    if (this.personInfo.gender=='femenino') {
      this.listByMother()
    }else this.listByFather();
    
    this.listChildParent();
  }

  listByFather(){
    this.crudServices.getModel("/api/persons/list-father?person="+this.personInfo.id).toPromise().then((response:RespuestaDto)=>{
      if (response.estado==200) {
        this.childToPair=response.objeto_respuesta as Array<PersonModel>
      }else if (response.estado=400) {
        this.messageService.getInfoMessagePersonalized("warning","Error","No se pudo listar las personas")
      }
    })
  }
  listByMother(){
    this.crudServices.getModel("/api/persons/list-mother?person="+this.personInfo.id).toPromise().then((response:RespuestaDto)=>{
      if (response.estado==200) {
        this.childToPair=response.objeto_respuesta as Array<PersonModel>
      }else if (response.estado=400) {
        this.messageService.getInfoMessagePersonalized("warning","Error","No se pudo listar las personas")
      }
    })
  }

  listChildParent(){
    this.crudServices.getModel("/api/persons/list-child-parent?person="+this.personInfo.id).toPromise().then((response:RespuestaDto)=>{
      if (response.estado==200) {
        this.childLinked=response.objeto_respuesta as Array<PersonModel>
        
      }else if (response.estado=400) {
        this.messageService.getInfoMessagePersonalized("warning","Error","No se pudo listar las personas")
      }
    })
  }

  linkParentChild(){
    this.crudServices.createParam("/api/persons/create-link?idParent="+this.personInfo.id+"&idChild="+this.childInfo.id+"&gender="+this.personInfo.gender).toPromise().then((response:RespuestaDto)=>{
      if (response.estado==200) {
        let person=this.childToPair.filter(e=>this.childInfo.id==e.id)
        this.childToPair.splice(this.childToPair.indexOf(person[0]),1);
        this.childLinked.push(person[0])
        
      }
    }).catch(e=>{
      this.messageService.getInfoMessageError();
    })
  }

  deleteLink(child){
    this.crudServices.deleteModel("/api/persons/delete-linked/"+child+"/"+this.personInfo.id).toPromise().then((response:RespuestaDto)=>{
      if (response.estado==200) {
        let person=this.childLinked.filter(e=>e.id==child);
        this.childLinked.splice(this.childLinked.indexOf(person[0]),1);
        this.childToPair.push(person[0]);
        
      }
    }).catch(e=>{
      this.messageService.getInfoMessageError();
    })
  }

  

  closeWindow() {
    this.modalService.dismissAll();
  }

}