import { Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Engine3DService } from 'src/app/services/engine3d.service';
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
    this.engineService.engine3DService.refreshScene(pickedNode.id);
    
    if(!this.is3DBeingShown) {
      this.engineService.engine3DService.is3DFadingOutComplete = false;
      this.engineService.engine3DService.is3DFadingInStart = true;
      this.engineService.engine3DService.fadingInStartNotifier.next(this.engineService.engine3DService.is3DFadingInStart);
    }
  }

  disableAnimation = true;
  ngAfterViewInit(): void {
    setTimeout(()=> this.disableAnimation = false);   
  }
  

}
