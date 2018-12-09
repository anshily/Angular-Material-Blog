import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {EditorConfig} from '../share/model/md-config';
import {MatSidenav} from '@angular/material';

// var testEditor = editormd("test-editormd", {
//     width   : "90%",
//     height  : 640,
//     syncScrolling : "single",
//     path    : "../lib/"
// });

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'amblog';
  public testinput;
  public temp;
  public text: string;
    @ViewChild('sidenav') sidenav: MatSidenav;
  ta = '';
    conf = new EditorConfig();
    markdown = '测试语句';

  content;
  randerData(v) {
      if (v.inputType === 'insertText') {
          this.text += v.data;
      } else if (v.inputType === 'insertLineBreak') {
          this.text += '\n\n';
      }
      if (this.text) {
          this.content = this.text;
      }
      console.log(this.text);
      // if (v.code === 'Enter') {
      //     this.testinput += '\n';
      // }
      // if (this.testinput) {
      //     this.content = marked(this.testinput);
      // }
  }

    // 同步属性内容
    syncModel(str): void {
        this.markdown = str;
    }

    close() {
      this.sidenav.close();
    }

    ngAfterViewInit(): void {
      // const ed =  editormd.markdownToHTML("showmd",{});
    }

}
