import { DeatailPersonComponent } from './../detail-person/detail-person.component';
import {ToPairPersonComponent } from './../to-pair-person/to-pair-person-child.component';
import { UpdatePersonComponent } from './../update-person/update-person.component';
import { PersonModel } from './../../../models/entities/person-model';
import { CreatePersonComponent } from './../create-person-notification/create-person.component';
import { Component,OnInit } from "@angular/core";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CrudServiceService } from "src/app/shared/cruds/crud-service.service";
import { InfoMessagesService } from "src/app/shared/messages/info-messages.service";

import swal from 'sweetalert2';
import { RespuestaDto } from 'src/models/response/respuesta-dto';

@Component({
  selector: 'app-list-person',
  templateUrl: './list-person.component.html',
  styleUrls: ['./list-person.component.scss']
})
export class ListPersonComponent implements OnInit {

  listPeople:Array<PersonModel>=new Array

  constructor(
    private modalService: NgbModal,
    private crudServices: CrudServiceService,
    private messageService: InfoMessagesService  ) { }

  ngOnInit() {
    this.listarPersons();
  }

  createPerson() {
    const modalRef = this.modalService.open(CreatePersonComponent, {
      windowClass: 'modal', size: 'lg', backdrop: 'static'
    });
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      if (receivedEntry === 1) {
        this.listarPersons();
      }
      modalRef.dismiss()
    })
  }

  listarPersons() {
    this.crudServices.getModel('/api/persons/list').toPromise().then((respuesta: RespuestaDto) => {
      if (respuesta.estado === 200) {
        this.listPeople = respuesta.objeto_respuesta as Array<PersonModel>;
        
      }
      else if (respuesta.estado === 400) {
        this.messageService.getInfoMessagePersonalized('warning', respuesta.descripcion, 'Sin notificaciones')
      }
    })
    
  }

  verPerfil(personInfo: PersonModel) {
    const modalRef = this.modalService.open(DeatailPersonComponent, {
      windowClass: '', size: 'lg', backdrop: 'static'
    });
    modalRef.componentInstance.personInfo = { ...personInfo };
  }

  updatePerson(personInfo: PersonModel) {
    const modalRef = this.modalService.open(UpdatePersonComponent, {
      windowClass: '', size: 'lg', backdrop: 'static'
    });

    modalRef.componentInstance.personInfo = { ...personInfo };
    modalRef.componentInstance.passEntry.subscribe((modalResult) => {
      if (modalResult !== 0) {
        this.listarPersons();
      }
      modalRef.dismiss();
    });
  }

  

  toPairChild(personInfo: PersonModel) {
    const modalRef = this.modalService.open(ToPairPersonComponent, {
      windowClass: '', size: 'lg', backdrop: 'static'
    });
    modalRef.componentInstance.personInfo = { ...personInfo };
  }

  deletePerson(personInfo: PersonModel) {
    let url = '/api/persons/delete/';
    this.crudServices.deleteModel(url + personInfo.id).toPromise().then((respuesta: RespuestaDto) => {
      if (respuesta.estado === 200) {
        this.messageService.getInfoMessageDelete().then(() => {
          this.listarPersons();
        })
      }
      else if (respuesta.estado === 400) {
        this.messageService.getInfoMessagePersonalized('warning', respuesta.descripcion, 'No se elimino la notificación');
      }
    })
    .catch(error => {

      if(error.error.estado === 400) {
        this.messageService.getInfoMessagePersonalized('error', error.error.descripcion, 'Error!');
      }
       
    });
  }

  adDeletePerson(personInfo: PersonModel) {
    swal({
      title: '¿Está seguro que desea eliminar la persona?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.deletePerson(personInfo);
      }
    })
  }

}