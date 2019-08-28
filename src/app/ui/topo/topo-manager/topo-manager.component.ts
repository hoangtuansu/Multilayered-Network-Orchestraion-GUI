import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import * as OBJ from '../../../models';
import { EngineCoordinatorService } from 'src/app/services/engine-coordinator.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogDetailsComponent } from '../../panel-details/dialog/dialog-details.component';


@Component({
  selector: 'app-topo-manager',
  templateUrl: './topo-manager.component.html',
  styleUrls: ['./topo-manager.component.css']
})
export class TopoManagerComponent implements OnInit {

  selectedDisplayMode: number = OBJ.DISPLAY_MODE.D2WORLD;
  isDetailViewActivate: boolean = true;
  constructor(private engineCoordinatorService: EngineCoordinatorService, public dialog: MatDialog) { }

  ngOnInit() {
    this.engineCoordinatorService.get2DService().displayWorldLevelNotifier.subscribe((value) => {
      if(value) {
        this.selectedDisplayMode = OBJ.DISPLAY_MODE.D2WORLD;
      } else {
        this.selectedDisplayMode = OBJ.DISPLAY_MODE.D2;
      }
    });
  }

  switchDisplayMode() {
    if(this.selectedDisplayMode == OBJ.DISPLAY_MODE.D2WORLD)
      return;
    this.selectedDisplayMode = (this.selectedDisplayMode == 1 ? 0 : 1);
  }
  animal: string;
  name: string;
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogDetailsComponent, {
      width: '250px',
      data: {name: this.name, animal: this.animal},
      hasBackdrop: false
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}
