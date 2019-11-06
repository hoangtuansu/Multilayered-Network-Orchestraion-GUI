import { Component, OnInit, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { LinkVisualizerService } from 'src/app/services/link-visualizer.service';

@Component({
  selector: 'app-link-visual',
  templateUrl: './link-visual.component.html',
  styleUrls: ['./link-visual.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LinkVisualComponent implements OnInit {
  @ViewChild('linkVisualization', { static: false }) linkVisualizer: ElementRef;
  @Input() selectedPathID: any = null;
  @Input() obtainedPath: any = null;
  constructor(private linkVisualizerService: LinkVisualizerService) {
  }
  

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.linkVisualizerService.setSelectedLinkID(this.selectedPathID, this.obtainedPath);
    this.linkVisualizerService.createPathVisualization(this.linkVisualizer); 
  }
  

}
