import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdEditorDirective } from './md-editor.directive';
import { Md2htmlComponent } from './md2html/md2html.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MdEditorDirective, Md2htmlComponent]
})
export class ShareModule { }
