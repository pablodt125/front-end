import { FormsModule } from '@angular/forms';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { DatePipe, registerLocaleData } from '@angular/common';
import { PersonModule } from './person/person.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import localeEs from '@angular/common/locales/es-CO';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

registerLocaleData(localeEs, 'es-CO')

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    
    AppRoutingModule,

    PersonModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
