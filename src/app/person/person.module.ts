import { DeatailPersonComponent } from './detail-person/detail-person.component';
import { ToPairPersonComponent } from './to-pair-person/to-pair-person-child.component';
import { ListPersonComponent } from './list-person/list-person.component';
import { UpdatePersonComponent } from './update-person/update-person.component';
import { CreatePersonComponent } from './create-person-notification/create-person.component';
import { PersonnRoutingModule } from './person-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarsModule } from '../calendar/calendar.module';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    PersonnRoutingModule,
    NgxDatatableModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    CalendarsModule
  ],
  declarations: [CreatePersonComponent, UpdatePersonComponent, DeatailPersonComponent, ListPersonComponent,ToPairPersonComponent],
  providers: [],
})
export class PersonModule { }
