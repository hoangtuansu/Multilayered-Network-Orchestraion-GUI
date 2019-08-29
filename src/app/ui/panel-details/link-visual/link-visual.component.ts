import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { LinkVisualizerService } from 'src/app/services/link-visualizer.service';

@Component({
  selector: 'app-link-visual',
  templateUrl: './link-visual.component.html',
  styleUrls: ['./link-visual.component.css']
})
export class LinkVisualComponent implements OnInit {
  @ViewChild('linkVisualization', { static: false }) linkVisualizer: ElementRef;
  @Input() selectedLinkID: any = null;
  constructor(private linkVisualizerService: LinkVisualizerService) {
   }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    
    this.linkVisualizerService.createLinkVisualization(this.linkVisualizer);
  }
  

}
