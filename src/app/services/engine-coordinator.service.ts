import { Injectable } from '@angular/core';
import { Engine2DService } from './engine2d.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogDetailsComponent } from '../ui/panel-details/dialog/dialog-details.component';

@Injectable({
  providedIn: 'root'
})
export class EngineCoordinatorService {
  dialogRef: MatDialogRef<any> = null;
  isShown: boolean = false;
  constructor(private engine2DService: Engine2DService, 
    public detailInfoDialog: MatDialog) { 
    
    engine2DService.selectedNodeForDetailNotifier.subscribe((value)=> {
      this.openDialog(value);
    });

  }

  private openDialog(entity: any): void {
    if(!this.isShown) {
      this.dialogRef = this.detailInfoDialog.open(DialogDetailsComponent, {
        width: '400px',
        panelClass: '.custom-detail-dialog-container',
        data: entity,
        position: {left: '20px', top: '20px'},
        hasBackdrop: false,
        disableClose: false
      });
      this.isShown = true;
      this.dialogRef.afterClosed().subscribe(result => {
        this.isShown = false;
      });
    }
    this.dialogRef.componentInstance.selectedEntity = entity;
    
  }

  get2DService() {
    return this.engine2DService;
  }
}
