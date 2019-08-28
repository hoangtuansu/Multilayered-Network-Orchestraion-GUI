import { Injectable } from '@angular/core';
import { Engine2DService } from './engine2d.service';
import { Engine3DService } from './engine3d.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogDetailsComponent } from '../ui/panel-details/dialog/dialog-details.component';

@Injectable({
  providedIn: 'root'
})
export class EngineCoordinatorService {
  constructor(private engine2DService: Engine2DService, 
    private engine3DService: Engine3DService, 
    public detailInfoDialog: MatDialog) { 
    engine2DService.fadingOutCompleteNotifier.subscribe((value) => {
      if(value) {
        engine3DService.is3DFadingOutComplete = false;
        engine3DService.is3DFadingInStart = true;
        engine3DService.fadingInStartNotifier.next(engine3DService.is3DFadingInStart);
      }
    });

    engine2DService.selectedNodeForDetailNotifier.subscribe((value)=> {
      this.openDialog(value);
    });

    engine3DService.fadingOutCompleteNotifier.subscribe((value) => {
      if(value) {
        engine2DService.is2DFadingOutComplete = false;
        engine2DService.is2DFadingInStart = true;
        engine2DService.fadingInStartNotifier.next(engine2DService.is2DFadingInStart);

        engine2DService.is2DFadingIn = true;
        engine2DService.is2DFadingOut = false;

        engine2DService.update();

      }
    });

  }

  private openDialog(entity: any): void {
    const dialogRef = this.detailInfoDialog.open(DialogDetailsComponent, {
      width: '400px',
      panelClass: '.custom-detail-dialog-container',
      data: entity,
      position: {left: '20px', top: '20px'},
      hasBackdrop: false
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  get2DService() {
    return this.engine2DService;
  }
}
