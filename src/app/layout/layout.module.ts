import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import {MatSidenavModule} from '@angular/material';
import {BrowserAnimationsModule} from '../../../node_modules/@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
      MatSidenavModule,
      BrowserAnimationsModule
  ],
    exports: [SidebarComponent],
  declarations: [SidebarComponent]
})
export class LayoutModule { }
