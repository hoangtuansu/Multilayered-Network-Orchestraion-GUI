import { Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NetworkManagerService } from 'src/app/services/network-manager.service';

@Component({
  selector: 'app-dialog-details',
  templateUrl: './dialog-details.component.html',
  styleUrls: ['./dialog-details.component.css']
})

export class DialogDetailsComponent implements OnInit {
  
  constructor(
    public dialogRef: MatDialogRef<DialogDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public selectedEntity: any,
    private netManagerService: NetworkManagerService) {
      dialogRef.disableClose = true;
      
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  disableAnimation = true;
  ngAfterViewInit(): void {
    setTimeout(()=> this.disableAnimation = false);
    
  }
  

}
