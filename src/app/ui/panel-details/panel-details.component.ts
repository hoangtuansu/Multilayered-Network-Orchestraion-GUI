import { Component, OnInit, Inject, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LinkVisualizerService } from 'src/app/services/link-visualizer.service';

@Component({
  selector: 'app-panel-details',
  templateUrl: './panel-details.component.html',
  styleUrls: ['./panel-details.component.css']
})

export class PanelDetailsComponent implements OnInit {
  @ViewChild('linkVisualization', { static: false }) linkVisualizer: ElementRef;
  constructor(
    public dialogRef: MatDialogRef<PanelDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private linkVisualizerService: LinkVisualizerService) {
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
    this.linkVisualizerService.createLinkVisualization(this.linkVisualizer);
  }
  

}
