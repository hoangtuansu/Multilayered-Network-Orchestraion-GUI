import { Injectable } from '@angular/core';
import { Engine2DService } from './engine2d.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogDetailsComponent } from '../ui/panel-details/dialog/dialog-details.component';
import { NetworkManagerService } from './network-manager.service';
import { PathComputationService } from './path-computation.service';
import { Engine3DService } from './engine3d.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EngineCoordinatorService {
  dialogRef: MatDialogRef<any> = null;
  isDetailedDialogShown = false;
  isShowing3DTopoNotifier: Subject<boolean> = new Subject<boolean>();

  constructor(private _engine2DService: Engine2DService,
              private _engine3DService: Engine3DService, 
              private netManagerService: NetworkManagerService,
              private pathComputationService: PathComputationService,
              public detailInfoDialog: MatDialog) {
    
    _engine2DService.selectedNodeForDetailNotifier.subscribe((value)=> {
      this.openDialog(value);
    });

  }

  get engine3DService(): Engine3DService {
    return this._engine3DService;
  }

  get engine2DService(): Engine2DService {
    return this._engine2DService;
  }

  private openDialog(entity: any): void {
    let dLs = this.netManagerService.get2DDomainLinksOfNode(entity.id),
        bLs = this.netManagerService.get2DBoundaryLinksOfNode(entity.id),
        cNEs = this.netManagerService.getNeighborNetworkElements(entity.id),
        cPs = this.pathComputationService.getCrossingPath(entity.id),
        bWs = this.pathComputationService.getBandwidth(cPs);
    const dataDlg = { selectedEntity: entity, domainLinks: dLs,
                    boundaryLinks: bLs, connectedNetEles: cNEs,
                    crossingPaths: cPs, bandwidth: bWs};
    if(!this.isDetailedDialogShown) {
      this.dialogRef = this.detailInfoDialog.open(DialogDetailsComponent, {
        width: '25%',
        panelClass: 'custom-detail-dialog-container',
        data: dataDlg,
        position: {left: '20px', top: '85px'},
        hasBackdrop: false,
        autoFocus: false
      });
      this.isDetailedDialogShown = true;
      this.dialogRef.afterClosed().subscribe(result => {
        this.isDetailedDialogShown = false;
      });
      return;
    }
    this.dialogRef.componentInstance.data = dataDlg;
  }

  get2DService() {
    return this.engine2DService;
  }
}
