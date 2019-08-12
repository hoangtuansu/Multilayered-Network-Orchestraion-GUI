import { Component, OnInit, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { MapEngineService } from 'src/app/services/map/map-engine.service';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MapViewComponent implements OnInit {

  @ViewChild('mapRenderer', { static: false }) mapRenderer: ElementRef;

  constructor(private mapEngine: MapEngineService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.mapEngine.createMap(this.mapRenderer);
  }

}
