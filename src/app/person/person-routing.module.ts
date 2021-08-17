import { DeatailPersonComponent } from './detail-person/detail-person.component';
import { ToPairPersonComponent } from './to-pair-person/to-pair-person-child.component';
import { UpdatePersonComponent } from './update-person/update-person.component';
import { CreatePersonComponent } from './create-person-notification/create-person.component';
import { ListPersonComponent } from './list-person/list-person.component';


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list-person',
        component: ListPersonComponent,
        data: {
          title: 'list-person',
        },
      },
      {
        path: 'create-person',
        component: CreatePersonComponent,
        data: {
          title: 'create-person',
          
        },
        
      },
      {
        path: 'update-person',
        component: UpdatePersonComponent,
        data: {
          title: 'update-easy-notification',
          
        },
       
      },
      {
        path: 'detail-person',
        component: DeatailPersonComponent,
        data: {
          title: 'detail-person',
          
        },
        
      },
      {
        path: 'to-pair-person',
        component: ToPairPersonComponent,
        data: {
          title: 'to-pair-person',
        },
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonnRoutingModule { }
