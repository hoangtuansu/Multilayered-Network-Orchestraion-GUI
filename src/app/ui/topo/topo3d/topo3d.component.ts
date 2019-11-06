import { Component, OnInit, ViewChild, SimpleChange, ElementRef, Input, ViewEncapsulation, OnChanges, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subject } from 'rxjs';
import { EngineCoordinatorService } from 'src/app/services/engine-coordinator.service';

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
      transition('3d-hide <=> 3d-show', animate('500ms'))]),
      trigger('zoom3DDiv', [
        state('3d-zoomout', style({
          width: '65%',
          height: '65vh'
        })),
        state('3d-zoomin', style({
          width: '45%',
          height: '45vh'
        })),
        transition('3d-zoomout <=> 3d-zoomin', animate('500ms'))])],
      encapsulation: ViewEncapsulation.None
})
export class Topo3dComponent implements OnInit, OnChanges {
  
  @ViewChild('renderer3DContainer', { static: false }) renderer3DContainer: ElementRef;

  onActive: Subject<boolean> = new Subject<boolean>();;
  is3DTopoActive: boolean = false;
  isZoomedOut: boolean = false;
  @Input() isDetailShown: boolean = false;
  isLayer1Shown: boolean = true;
  isLayer2Shown: boolean = true;
  isLayer3Shown: boolean = true;
  isNodeAlwaysShown: boolean = false;
  
  constructor(private engineService: EngineCoordinatorService) { 
    engineService.engine3DService.fadingOutCompleteNotifier.subscribe((value) => {
      if(value) {
        this.attach3DLayout(false);
      }
    });

    engineService.engine3DService.fadingInStartNotifier.subscribe((value) => {
      if(value) {
        this.isLayer1Shown = true;
        this.isLayer2Shown = true;
        this.isLayer3Shown = true;
        this.attach3DLayout(true);
      }
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.renderer3DContainer.nativeElement.appendChild(this.engineService.engine3DService.renderer.domElement);
    this.engineService.engine3DService.render();
  }

  ngOnChanges(changes: {[property: number]: SimpleChange}) {
    if(changes["isDetailShown"] != undefined){
      this.engineService.engine3DService.enableDetailView(changes["isDetailShown"].currentValue);
      return;
    }
  }

  animation3DEnd($event) {
    if($event.fromState == "void") {
      return;
    }

    if($event.fromState == "3d-hide" && $event.toState == "3d-show") {
      this.engineService.engine3DService.is3DFadingIn = true;
      this.engineService.engine3DService.is3DFadingOut = false;
    }
    
  }

  close3DLayout() {
    this.engineService.engine3DService.is3DFadingOutComplete = false;
    this.engineService.engine3DService.is3DFadingInStart = false;
    this.engineService.engine3DService.is3DFadingIn = false;
    this.engineService.engine3DService.is3DFadingOut = true;
  }

  zoomOut3DLayout() {
    this.isZoomedOut = !this.isZoomedOut;
    let ratio = this.isZoomedOut ? 0.65 : 0.45
    this.engineService.engine3DService.setRendererDimension(window.innerWidth*ratio, window.innerHeight*ratio)
  }

  attach3DLayout(a: boolean) {
    this.is3DTopoActive = a;
    this.engineService.isShowing3DTopoNotifier.next(a);
  }

}
