import { PersonModel } from './../../../models/entities/person-model';
import { DatePipe } from '@angular/common';
import { InfoMessagesService } from '../../shared/messages/info-messages.service';
import { NgForm } from '@angular/forms';
import { Component, Output,EventEmitter,OnInit ,ViewChild } from "@angular/core";
import { RespuestaDto } from 'src/models/response/respuesta-dto';
import { CrudServiceService } from 'src/app/shared/cruds/crud-service.service';

@Component({
    selector: 'app-createperson',
    templateUrl: './create-person.component.html',
    styleUrls: ['./create-person.component.scss']
})

export class CreatePersonComponent implements OnInit{

    person: PersonModel=new PersonModel();
    @Output() passEntry:EventEmitter<any>=new EventEmitter();

    constructor(
        private messageServices:InfoMessagesService,
        private crudServiceService:CrudServiceService
        
    ){}

    minDate = new Date();
    startDate = new DatePipe('es-CO');
    minDate2 = this.startDate.transform(this.minDate, 'yyyy-MM-dd');

    ngOnInit() {
    }

    onSubmit(){
        this.crudServiceService.createFile('/api/persons/create',this.person).toPromise().then((respuesta:RespuestaDto)=>{
            if (respuesta.estado==200){
                this.messageServices.getInfoMessageCreate().then(()=>{
                    this.person= respuesta.objeto_respuesta as PersonModel
                    this.passEntry.emit(1);
                })
            }else if(respuesta.estado=== 400){
                this.messageServices.getInfoMessagePersonalized('warning',respuesta.descripcion,'No se creo el person');
            }
        })
        .catch(error=>{
            if (error.error.estado === 400) {
                this.messageServices.getInfoMessagePersonalized('error', error.error.descripcion, 'Error!')
              }
              
        });
    }
    closeWindow(){
        this.passEntry.emit(0);
    }
}
