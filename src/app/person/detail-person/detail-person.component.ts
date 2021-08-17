import { PersonModel } from './../../../models/entities/person-model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input,OnInit } from "@angular/core";

@Component({
    selector: 'app-detail-person',
    templateUrl: './detail-person.component.html',
    styleUrls: ['./detail-person.component.scss']
  })

export class DeatailPersonComponent implements OnInit{
    
    @Input() public personInfo=new PersonModel();

    constructor(private modalService: NgbModal){}

    ngOnInit(){

    }

    closeWindow(){
        this.modalService.dismissAll();
    }
}