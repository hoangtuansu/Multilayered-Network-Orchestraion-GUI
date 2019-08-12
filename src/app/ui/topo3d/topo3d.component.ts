import { Component, OnInit, ViewChild, SimpleChange, ElementRef, Input, ViewEncapsulation, OnChanges } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Engine3DService } from 'src/app/services/engine3d.service';
import * as OBJ from '../../models';
import { EngineCoordinatorService } from 'src/app/services/engine-coordinator.service';

@Component({
  selector: 'app-topo3d',
  templateUrl: './topo3d.component.html',
  styleUrls: ['./topo3d.component.css'],
  animations: [
    trigger('fadeOut3DDiv', [
      state('3d-show', style({
        position: 'absolute',
        opacity: 1
      })),
      state('3d-hide', style({
        position: 'absolute',
        opacity: 0
      })),
      transition('3d-hide <=> 3d-show', animate('1500ms'))])],
      encapsulation: ViewEncapsulation.None
})
export class Topo3dComponent implements OnInit, OnChanges {
  
  @ViewChild('renderer3DContainer', { static: false }) renderer3DContainer: ElementRef;

  @Input() displayMode: number = OBJ.DISPLAY_MODE.D3;
  isHide3DDiv: boolean = false;

  constructor(private engine3DService: Engine3DService, private engineCoordinatorService: EngineCoordinatorService) { 
    engine3DService.fadingOutCompleteNotifier.subscribe((value) => {
      if(value) {
        this.detach3DLayout();
      }
    });

    engine3DService.fadingInStartNotifier.subscribe((value) => {
      if(value) {
        this.attach3DLayout();
      }
    });
  }

  ngOnInit() {
    this.engine3DService.createScene();
    
  }

  ngAfterViewInit() {
    this.renderer3DContainer.nativeElement.appendChild(this.engine3DService.renderer.domElement);
    this.engine3DService.render();
  }

  ngOnChanges(changes: {[property: number]: SimpleChange}) {
    let change = changes["displayMode"];
    if(change.firstChange)
      return;
    
    this.engine3DService.is3DFadingOutComplete = false;
    this.engine3DService.is3DFadingInStart = false;

    if(change.previousValue == OBJ.DISPLAY_MODE.D2 && change.currentValue == OBJ.DISPLAY_MODE.D3) {
      //not fade in the behind 3D scene yet, wait until animation3DEnd is done
      /* this.engine3DService.is3DFadingIn = true;
      this.engine3DService.is3DFadingOut = false;  */   
    } else if(change.previousValue == OBJ.DISPLAY_MODE.D3 && change.currentValue == OBJ.DISPLAY_MODE.D2) {
      this.engine3DService.is3DFadingIn = false;
      this.engine3DService.is3DFadingOut = true;
    }
  }

  animation3DEnd($event) {
    if($event.fromState == "void") {
      return;
    }

    if($event.fromState == "3d-hide" && $event.toState == "3d-show") {
      this.engine3DService.is3DFadingIn = true;
      this.engine3DService.is3DFadingOut = false;
    }
    
  }

  detach3DLayout() {
    this.isHide3DDiv = true;
  }

  attach3DLayout() {
    this.isHide3DDiv = false;
  }

}
