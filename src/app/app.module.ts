import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router' ;

import { AppComponent } from './app.component';
import { HomeComponent } from '../home/home.component';
import { BookListComponent } from '../books/bookList.component' ;
import { BookListService } from '../books/bookList.service';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BookListComponent
    ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path:'welcome' , component:HomeComponent  },
      { path : '' , redirectTo :'welcome'  , pathMatch:'full' },
      { path : 'bookList' , component:BookListComponent},
      { path : '**' , redirectTo :'welcome' , pathMatch :'full'}

    ])
  ],
  
  providers: [ BookListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
