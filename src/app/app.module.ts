import { DatePipe, registerLocaleData } from '@angular/common';
import { PersonModule } from './person/person.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import localeEs from '@angular/common/locales/es-CO';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

registerLocaleData(localeEs, 'es-CO')

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PersonModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
