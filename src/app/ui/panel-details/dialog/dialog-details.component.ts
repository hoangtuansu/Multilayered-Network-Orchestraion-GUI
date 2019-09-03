import { Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Engine3DService } from 'src/app/services/engine3d.service';
import { PathComputationService } from 'src/app/services/path-computation.service';
import { NetworkManagerService } from 'src/app/services/network-manager.service';
import * as OBJ from 'src/app/models';

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
    private engine3DService: Engine3DService,
    private netManagerService: NetworkManagerService,
    private pathComputationService: PathComputationService) {
      dialogRef.disableClose = true;
      
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  display3DTopo() {
    if(!this.is3DBeingShown) {
      this.engine3DService.is3DFadingOutComplete = false;
      this.engine3DService.is3DFadingInStart = true;
      this.engine3DService.fadingInStartNotifier.next(this.engine3DService.is3DFadingInStart);
    } else {
      this.engine3DService.is3DFadingOutComplete = false;
      this.engine3DService.is3DFadingInStart = false;
      this.engine3DService.is3DFadingIn = false;
      this.engine3DService.is3DFadingOut = true;
    }
    this.is3DBeingShown = !this.is3DBeingShown;
  }

  disableAnimation = true;
  ngAfterViewInit(): void {
    setTimeout(()=> this.disableAnimation = false);   
  }
  

}
