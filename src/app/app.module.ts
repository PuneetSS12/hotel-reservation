import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReservationComponent } from './reservation/reservation.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { TableComponent } from './table/table/table.component';


@NgModule({
  declarations: [
    AppComponent,
    ReservationComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
