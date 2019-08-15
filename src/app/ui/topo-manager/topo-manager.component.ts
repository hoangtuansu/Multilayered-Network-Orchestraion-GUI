import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import * as OBJ from '../../models';
import { EngineCoordinatorService } from 'src/app/services/engine-coordinator.service';

@Component({
  selector: 'app-topo-manager',
  templateUrl: './topo-manager.component.html',
  styleUrls: ['./topo-manager.component.css']
})
export class TopoManagerComponent implements OnInit {

  selectedDisplayMode: number = OBJ.DISPLAY_MODE.D3;
  @Output() valueChange = new EventEmitter<any>();
  constructor(private engineCoordinatorService: EngineCoordinatorService) { }

  ngOnInit() {
  }

  changeDisplayMode() {
    if(this.selectedDisplayMode == OBJ.DISPLAY_MODE.D3)
      this.selectedDisplayMode = OBJ.DISPLAY_MODE.D2;
    else if(this.selectedDisplayMode == OBJ.DISPLAY_MODE.D2)
      this.selectedDisplayMode = OBJ.DISPLAY_MODE.D3;
    this.valueChange.emit(this.selectedDisplayMode);
  }
}
