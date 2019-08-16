import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import * as OBJ from '../../models';
import { EngineCoordinatorService } from 'src/app/services/engine-coordinator.service';

@Component({
  selector: 'app-topo-manager',
  templateUrl: './topo-manager.component.html',
  styleUrls: ['./topo-manager.component.css']
})
export class TopoManagerComponent implements OnInit {

  selectedDisplayMode: number = OBJ.DISPLAY_MODE.D2;
  @Output() valueChange = new EventEmitter<any>();
  constructor(private engineCoordinatorService: EngineCoordinatorService) { }

  ngOnInit() {
    this.engineCoordinatorService.get2DService().displayWorldLevelNotifier.subscribe((value) => {
      if(value) {
        this.selectedDisplayMode = OBJ.DISPLAY_MODE.D2WORLD;
      } else {
        this.selectedDisplayMode = OBJ.DISPLAY_MODE.D2;
      }
    });
  }

  changeDisplayMode() {
    if(this.selectedDisplayMode == OBJ.DISPLAY_MODE.D3)
      this.selectedDisplayMode = OBJ.DISPLAY_MODE.D2;
    else if(this.selectedDisplayMode == OBJ.DISPLAY_MODE.D2)
      this.selectedDisplayMode = OBJ.DISPLAY_MODE.D3;
    this.valueChange.emit(this.selectedDisplayMode);
  }

  switchDisplayMode() {
    if(this.selectedDisplayMode == OBJ.DISPLAY_MODE.D2WORLD)
      return;
    this.selectedDisplayMode = (this.selectedDisplayMode == 1 ? 0 : 1);
  }
}
