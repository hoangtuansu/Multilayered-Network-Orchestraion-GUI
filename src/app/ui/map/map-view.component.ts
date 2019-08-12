import { Component, OnInit, ElementRef, ViewChild, ViewEncapsulation, Input } from '@angular/core';
import { MapEngineService } from 'src/app/services/map/map-engine.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import * as OBJ from '../../models';
import { EngineCoordinatorService } from 'src/app/services/engine-coordinator.service';
@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css'],
  animations: [trigger('fadeOut2DDiv', [
    state('2d-show', style({
      width: '75%',
      height: '75vh',
      position: 'absolute',
      opacity: 1
    })),
    state('2d-hide', style({
      position: 'absolute',
      width: '75%',
      height: '75vh',
      display: 'none',
      opacity: 0
    })),
    transition('2d-hide <=> 2d-show', animate('1500ms'))])],
  encapsulation: ViewEncapsulation.None
})
export class MapViewComponent implements OnInit {

  @ViewChild('mapRenderer', { static: false }) mapRenderer: ElementRef;
  
  constructor(private mapEngine: MapEngineService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.mapEngine.createChart(this.mapRenderer);
  }

}
