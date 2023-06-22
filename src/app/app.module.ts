import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    //AlertComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  //entryComponents: [ AlertComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
