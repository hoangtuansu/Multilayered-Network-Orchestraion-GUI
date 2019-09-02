import { Component, OnInit, ViewChild, ElementRef, OnChanges, SimpleChange, Input, ViewEncapsulation } from '@angular/core';
import { Engine2DService } from 'src/app/services/engine2d.service';
import { trigger, style, state, transition, animate } from '@angular/animations';
import * as OBJ from '../../../models';

@Component({
  selector: 'app-topo2d',
  templateUrl: './topo2d.component.html',
  styleUrls: ['./topo2d.component.css'],
  animations: [trigger('fadeOut2DDiv', [
    state('2d-show', style({
      width: '100%',
      height: '100vh',
      position: 'absolute',
      'z-index': 1,
      opacity: 1
    })),
    state('2d-hide', style({
      position: 'absolute',
      width: '100%',
      height: '100vh',
      display: 'none',
      'z-index': 0,
      opacity: 0
    })),
    transition('2d-hide <=> 2d-show', animate('1500ms'))])],
    encapsulation: ViewEncapsulation.None
})
export class Topo2dComponent implements OnInit, OnChanges {
  ngOnInit(): void {
  }
  @ViewChild('renderer2DContainer', { static: false }) renderer2DContainer: ElementRef;
  @Input() isDetailShown: boolean = false;
  
  constructor(private engine2DService: Engine2DService) {}

  ngAfterViewInit() {
    this.engine2DService.createChart(this.renderer2DContainer);
  }

  ngOnChanges(changes: {[property: number]: SimpleChange}) {
    if(changes["isDetailShown"] != undefined){
      this.engine2DService.enableDetailView(changes["isDetailShown"].currentValue);
      return;
    }
  }

  
}
