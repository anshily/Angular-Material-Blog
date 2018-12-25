import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {ShareModule} from '../share/share.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SidebarComponent} from './layout/sidebar/sidebar.component';
import {DemoMaterialModule} from './layout/layout.module';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
      SidebarComponent
  ],
  imports: [
      BrowserModule,
      FormsModule,
      ShareModule,
      DemoMaterialModule,
      BrowserAnimationsModule,
      AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
