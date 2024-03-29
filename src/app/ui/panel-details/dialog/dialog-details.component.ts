import { Component, OnInit, Inject, ViewEncapsulation} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EngineCoordinatorService } from 'src/app/services/engine-coordinator.service';
@Component({
  selector: 'app-dialog-details',
  templateUrl: './dialog-details.component.html',
  styleUrls: ['./dialog-details.component.css']
})

export class DialogDetailsComponent implements OnInit {
  is3DBeingShown: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<DialogDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private engineService: EngineCoordinatorService) {
      engineService.isShowing3DTopoNotifier.subscribe(value => this.is3DBeingShown = value);
      engineService.engine3DService.fadingOutCompleteNotifier.subscribe((value) => {
        if(value) {
          this.is3DBeingShown = false;
        }
      });
    }

  ngOnInit() {
  }

  display3DTopo(pickedNode) {
    if(!this.data['NEorLinkSelected'])  //link is being shown, so do nothing with this function
      return;
    this.engineService.engine3DService.refreshScene(pickedNode.id);
    this.engineService.setdetailedEntity(pickedNode);
    if(!this.is3DBeingShown) {
      this.engineService.engine3DService.is3DFadingOutComplete = false;
      this.engineService.engine3DService.is3DFadingInStart = true;
      this.engineService.engine3DService.fadingInStartNotifier.next(this.engineService.engine3DService.is3DFadingInStart);
    }
  }

  highlight3DLink(pickedLink: any) {
    if(this.is3DBeingShown) {
      this.engineService.engine3DService.highlightLink(pickedLink);
    }
    this.data['NEorLinkSelected'] = false;
    this.data['selectedLinkorPath'] = pickedLink;
  }

  highlight3DPath(pickedPath: any) {
    if(this.is3DBeingShown) {
      this.engineService.engine3DService.highlightPath(pickedPath.nodes);
    }
    this.data['selectedLinkorPath'] = pickedPath;
  }

  disableAnimation = true;
  ngAfterViewInit(): void {
    setTimeout(()=> this.disableAnimation = false);   
  }
  

}
