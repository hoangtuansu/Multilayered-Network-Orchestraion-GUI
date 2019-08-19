import { Component, OnInit, ViewChild, ElementRef, OnChanges, SimpleChange, Input, ViewEncapsulation } from '@angular/core';
import { Engine2DService } from 'src/app/services/engine2d.service';
import { trigger, style, state, transition, animate } from '@angular/animations';
import * as OBJ from '../../models';
import { EngineCoordinatorService } from 'src/app/services/engine-coordinator.service';

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
  isHide2DDiv: boolean = false;
  @Input() displayMode: number = OBJ.DISPLAY_MODE.D3;
  
  constructor(private engine2DService: Engine2DService) {
    engine2DService.fadingOutCompleteNotifier.subscribe((value) => {
      if(value) {
        this.detach2DLayout();
      }
    });

    engine2DService.fadingInStartNotifier.subscribe((value) => {
      if(value) {
        this.attach2DLayout();
      }
    });
    
   }

  ngAfterViewInit() {
    this.engine2DService.createChart(this.renderer2DContainer);
  }

  ngOnChanges(changes: {[property: number]: SimpleChange}) {
    let change = changes["displayMode"];
    if(change.firstChange)
      return;
    
    this.engine2DService.is2DFadingOutComplete = false;
    this.engine2DService.is2DFadingInStart = false;

    if(change.previousValue == OBJ.DISPLAY_MODE.D3 && change.currentValue == OBJ.DISPLAY_MODE.D2) {
      this.engine2DService.is2DFadingIn = true;
      this.engine2DService.is2DFadingOut = false;
    } else if(change.previousValue == OBJ.DISPLAY_MODE.D2 && change.currentValue == OBJ.DISPLAY_MODE.D3) {
      this.engine2DService.is2DFadingIn = false;
      this.engine2DService.is2DFadingOut = true;
    }

    this.engine2DService.update();
  }

  detach2DLayout() {
    this.isHide2DDiv = true;
  }

  attach2DLayout() {
    this.isHide2DDiv = false;
  }

}
