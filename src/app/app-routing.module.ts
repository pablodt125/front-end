import { ListPersonComponent } from './person/list-person/list-person.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes:Routes=[
  {path:'',redirectTo:'person',pathMatch:'full'},
  {path:'person',component:ListPersonComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
