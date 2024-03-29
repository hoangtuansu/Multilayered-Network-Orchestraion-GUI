import { Injectable } from '@angular/core';
import { Engine2DService } from './engine2d.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogDetailsComponent } from '../ui/panel-details/dialog/dialog-details.component';
import { NetworkManagerService } from './network-manager.service';
import { PathManagerService } from './path-manager.service';
import { Engine3DService } from './engine3d.service';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EngineCoordinatorService {
  dialogRef: MatDialogRef<DialogDetailsComponent> = null;
  isDetailedDialogShown = false;
  isShowing3DTopoNotifier: Subject<boolean> = new Subject<boolean>();

  constructor(private _engine2DService: Engine2DService,
              private _engine3DService: Engine3DService, 
              private netManagerService: NetworkManagerService,
              private pathComputationService: PathManagerService,
              public detailInfoDialog: MatDialog) {
    
    _engine2DService.selectedNodeForDetailNotifier.subscribe((value)=> {
      this.openDialog(value, new Observable(this.myObservable));
    });
  }

  myObservable(observer) {
    setTimeout(() => {
      observer.next("done waiting for 5 sec");
      observer.complete();
    }, 5000);
  }

  get engine3DService(): Engine3DService {
    return this._engine3DService;
  }

  get engine2DService(): Engine2DService {
    return this._engine2DService;
  }

  private openDialog(entity: any, observable: Observable<Object>): void {
    let dLs = this.netManagerService.get2DDomainLinksOfNode(entity.id),
        bLs = this.netManagerService.get2DBoundaryLinksOfNode(entity.id),
        cNEs = this.netManagerService.getNeighborNetworkElements(entity.id),
        cPs = this.pathComputationService.getCrossingPath(entity.id),
        bWs = this.pathComputationService.getBandwidth(cPs);
    const dataDlg = { selectedEntity: entity, domainLinks: dLs,
                    boundaryLinks: bLs, connectedNetEles: cNEs,
                    crossingPaths: cPs, bandwidth: bWs,
                    NEorLinkSelected: true};
    if(!this.isDetailedDialogShown) {
      this.dialogRef = this.detailInfoDialog.open(DialogDetailsComponent, {
        width: '450px',
        panelClass: 'custom-detail-dialog-container',
        data: dataDlg,
        position: {left: '85px', top: '100px'},
        hasBackdrop: false,
        autoFocus: false
      });
      this.isDetailedDialogShown = true;
      this.dialogRef.afterClosed().subscribe(result => {
        this.isDetailedDialogShown = false;
      });
      let subscription = observable.subscribe(
        (response: any) => {
          subscription.unsubscribe();
          //handle response
          console.log(response);
        },
        (error) => {
          subscription.unsubscribe();
          //handle error
          console.log(error);
        }
      );
      return;
    }
    this.dialogRef.componentInstance.data = dataDlg;
  }

  get2DService() {
    return this.engine2DService;
  }

  setdetailedEntity(entity: any) {
    this.openDialog(entity, new Observable(this.myObservable));
  }
}
