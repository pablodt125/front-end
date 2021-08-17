import { PersonModel } from './../../../models/entities/person-model';
import { ChildByParentModel } from './../../../models/entities/children-by-parent-model';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CrudServiceService } from 'src/app/shared/cruds/crud-service.service';
import { InfoMessagesService } from 'src/app/shared/messages/info-messages.service';

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
    
  }

  

  closeWindow() {
    this.modalService.dismissAll();
  }

}