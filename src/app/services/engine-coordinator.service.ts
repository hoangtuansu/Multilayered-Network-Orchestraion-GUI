import { Injectable } from '@angular/core';
import { Engine2DService } from './engine2d.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogDetailsComponent } from '../ui/panel-details/dialog/dialog-details.component';
import { NetworkManagerService } from './network-manager.service';
import { PathComputationService } from './path-computation.service';

@Injectable({
  providedIn: 'root'
})
export class EngineCoordinatorService {
  dialogRef: MatDialogRef<any> = null;
  isShown: boolean = false;
  constructor(private engine2DService: Engine2DService, 
    private netManagerService: NetworkManagerService,
    private pathComputationService: PathComputationService,
    public detailInfoDialog: MatDialog) { 
    
    engine2DService.selectedNodeForDetailNotifier.subscribe((value)=> {
      this.openDialog(value);
    });

  }

  private openDialog(entity: any): void {
    if(!this.isShown) {
      this.dialogRef = this.detailInfoDialog.open(DialogDetailsComponent, {
        width: '400px',
        panelClass: 'custom-detail-dialog-container',
        data: {
          selectedEntity: entity, 
          domainLinks: this.netManagerService.get2DDomainLinksOfNode(entity.id),
          boundaryLinks: this.netManagerService.get2DBoundaryLinksOfNode(entity.id),
          containedNetEles: this.netManagerService.get2DContainedNetworkElement(entity.id),
          crossingPaths: this.pathComputationService.getCrossingPath(entity.id)},
        position: {left: '20px', top: '20px'},
        hasBackdrop: false,
        disableClose: false
      });
      this.isShown = true;
      this.dialogRef.afterClosed().subscribe(result => {
        this.isShown = false;
      });
    }
    this.dialogRef.componentInstance.data = {
      selectedEntity: entity, 
      domainLinks: this.netManagerService.get2DDomainLinksOfNode(entity.id),
      boundaryLinks: this.netManagerService.get2DBoundaryLinksOfNode(entity.id),
      containedNetEles: this.netManagerService.get2DContainedNetworkElement(entity.id),
      crossingPaths: this.pathComputationService.getCrossingPath(entity.id)};
  }

  get2DService() {
    return this.engine2DService;
  }
}
