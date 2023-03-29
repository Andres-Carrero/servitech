import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicModule } from "../app/public/public.module";
import { PageNotFoundComponent } from "../app/pages/pageNotFound/pageNotFound.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "../assets/library/Material.module";
import { DeviceDetectorService } from 'ngx-device-detector';
import { CustomPaginator } from "src/app/config/matPaginator.config";
import { MatPaginatorIntl } from '@angular/material/paginator';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    PublicModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    DeviceDetectorService,
    { provide: MatPaginatorIntl, useValue: CustomPaginator() }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
