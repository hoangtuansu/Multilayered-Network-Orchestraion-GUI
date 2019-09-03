import { Component, OnInit, ViewChild, SimpleChange, ElementRef, Input, ViewEncapsulation, OnChanges } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Engine3DService } from 'src/app/services/engine3d.service';
import * as OBJ from '../../../models';
import { NONE_TYPE } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-topo3d',
  templateUrl: './topo3d.component.html',
  styleUrls: ['./topo3d.component.css'],
  animations: [
    trigger('fadeOut3DDiv', [
      state('3d-show', style({
        position: 'absolute',
        'z-index': 1,
        opacity: 1
      })),
      state('3d-hide', style({
        position: 'absolute',
        'z-index': 0,
        display: 'none',
        opacity: 0
      })),
      transition('3d-hide <=> 3d-show', animate('1500ms'))])],
      encapsulation: ViewEncapsulation.None
})
export class Topo3dComponent implements OnInit, OnChanges {
  
  @ViewChild('renderer3DContainer', { static: false }) renderer3DContainer: ElementRef;

  @Input() displayMode: number = OBJ.DISPLAY_MODE.D3;
  isHide3DDiv: boolean = true;
  @Input() isDetailShown: boolean = false;
  isLayer1Shown: boolean = true;
  isLayer2Shown: boolean = true;
  isLayer3Shown: boolean = true;

  constructor(private engine3DService: Engine3DService) { 
    engine3DService.fadingOutCompleteNotifier.subscribe((value) => {
      if(value) {
        this.detach3DLayout();
      }
    });

    engine3DService.fadingInStartNotifier.subscribe((value) => {
      if(value) {
        this.isLayer1Shown = true;
        this.isLayer2Shown = true;
        this.isLayer3Shown = true;
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
    if(changes["isDetailShown"] != undefined){
      this.engine3DService.enableDetailView(changes["isDetailShown"].currentValue);
      return;
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
