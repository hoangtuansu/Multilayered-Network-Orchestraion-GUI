import { Component, EventEmitter, Output } from '@angular/core';
import * as OBJ from './models';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-mdb';
  selectedDisplayMode: number = OBJ.DISPLAY_MODE.D3;
  @Output() valueChange = new EventEmitter<any>();

  changeDisplayMode() {
    if(this.selectedDisplayMode == OBJ.DISPLAY_MODE.D3)
      this.selectedDisplayMode = OBJ.DISPLAY_MODE.D2;
    else if(this.selectedDisplayMode == OBJ.DISPLAY_MODE.D2)
      this.selectedDisplayMode = OBJ.DISPLAY_MODE.D3;
    this.valueChange.emit(this.selectedDisplayMode);
  }
}
