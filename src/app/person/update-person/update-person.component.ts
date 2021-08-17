import { PersonModel } from './../../../models/entities/person-model';

import { DatePipe } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CrudServiceService } from 'src/app/shared/cruds/crud-service.service';
import { InfoMessagesService } from 'src/app/shared/messages/info-messages.service';
import { RespuestaDto } from 'src/models/response/respuesta-dto';


@Component({
  selector: 'app-update-person',
  templateUrl: './update-person.component.html',
  styleUrls: ['./update-person.component.scss']
})
export class UpdatePersonComponent implements OnInit {

  minDate = new Date();
  startDate = new DatePipe('es-CO');
  minDate2 = this.startDate.transform(this.minDate, 'yyyy-MM-dd');
  
  @Input() public personInfo = new PersonModel();
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(
    private crudService:CrudServiceService,
    private messageService:InfoMessagesService,
   ) { }

  ngOnInit() {

  }
  

  passBack() {
    this.crudService.createModel('api/easy-notification/actualizar', this.personInfo).toPromise().then((respuesta: RespuestaDto) => {
      if (respuesta.estado === 200) {
        this.messageService.getInfoMessageUpdate().then(() => {
          
          this.passEntry.emit(this.personInfo);
        })
      }
      else if (respuesta.estado === 400) {
        this.messageService.getInfoMessagePersonalized('warning', respuesta.descripcion, 'No se pudo actualizar la notificación')
      }
    })
    .catch(error => {
      if (error.error.estado === 400) {
        this.messageService.getInfoMessagePersonalized('error', error.error.descripcion, 'Error!')
      }
      
    });

  }
  

  closeWindow() {
    this.passEntry.emit(0);
  }



}
