import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";  //<-- NgModel lives inside this library! 
import { HttpClientModule } from "@angular/common/http";

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data-service/in-memory-data.service';


import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroService } from './hero-service/hero.service';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message-service/message.service';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { ProductComponent } from './product/product.component';
import { ProductService } from './product-service/product.service';
import { FileInputComponent } from './file-input/file-input.component';

/**
 * This is the root AngularModule (NgMOdule). Anything will be deklared
 * inside NgModuleobject is avalible anywhere in the App.
 * 
 * Arrays
 * ------
 * 
 * declarrations -> only components, directives and pipes. 
 *                  Do not declare NgModule classes. Do not declare service classes. 
 *                  Do not declare module classes.
 * imports       -> Only @NgModule classes go in the imports array. 
 *                  Do not put any other kind of class in imports.
 */
@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent,
    ProductComponent,
    FileInputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [
    HeroService,
    MessageService,
    ProductService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
