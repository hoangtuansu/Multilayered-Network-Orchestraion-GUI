import { Injectable, OnDestroy } from '@angular/core';
import * as OrbitControls from 'three-orbitcontrols';
import { trigger, state, style, animate, transition } from '@angular/animations';
import * as THREE from 'three';
import { AnimatorService } from './animator.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Engine3DService implements OnDestroy {
  ngOnDestroy(): void {
    if(this.frameId != null)
        cancelAnimationFrame(this.frameId);
  }

  private frameId: number = null;

  renderer: THREE.WebGLRenderer = null;
  scene: THREE.Scene = null;
  raycaster: THREE.Raycaster = null;
  camera: THREE.PerspectiveCamera = null;
  controls: OrbitControls = null;
  mouse = null;
  is3DFadingOut: boolean = false;
  is3DFadingIn: boolean = false;
  is3DFadingOutComplete: boolean = false;
  is3DFadingInStart: boolean = false;
  fadingOutCompleteNotifier: Subject<boolean> = new Subject<boolean>();
  fadingInStartNotifier: Subject<boolean> = new Subject<boolean>();
  isDetailEnabled: boolean = false;
  
  constructor(private animatorService: AnimatorService ) {
    this.scene = new THREE.Scene();
    this.raycaster = new THREE.Raycaster();
    this.renderer = new THREE.WebGLRenderer({antialias: false});
    this.camera = new THREE.PerspectiveCamera( 50, this.renderer.domElement.width/this.renderer.domElement.height, 0.01, 500 );
    this.controls = new OrbitControls(this.camera , this.renderer.domElement );
    this.raycaster.linePrecision = 0.1;
  }

  createScene() {
    this.scene.background = new THREE.Color( 0xa0a0a0 );

    let light = new THREE.SpotLight( 0xffffff, 1, 0, 1, 1, 1);
    light.position.set( -25, 50, 15 );
    this.scene.add(light );

    this.camera.position.set( 25, 20, 20 );
    this.camera.rotation.set( -Math.PI/4.5, Math.PI/4, Math.PI/6);

    this.controls.enabled = true;

    for(let g of this.animatorService.nodeMngmt.getGPOs()) {
      this.scene.add(g.generateMesh())
    }

    for(let g of this.animatorService.nodeMngmt.getG3DNOs()) {
      this.scene.add(g.generateMesh())
    }

    for(let g of this.animatorService.nodeMngmt.getGLOs()) {
      this.scene.add(g.generateMesh())
    }

    for(let g of this.animatorService.nodeMngmt.getGNPrOs()) {
      this.scene.add(g.generateMesh());
    }
  }

  showPlane(plane_id, isShown) {
    for(let g of this.animatorService.nodeMngmt.getGPOs()) {
      if(g.layer == plane_id) {
        g.setVisible(isShown);
      }
    }

    for(let o of this.animatorService.nodeMngmt.getG3DNOs()) {
      if(o.layer == plane_id) {
        console.log(o.id);
        for(let l of this.animatorService.nodeMngmt.getGLOs()) {
          if(l.node1.id == o.id || l.node2.id == o.id) {
            l.mesh.visible = isShown;
          }
        }
        o.mesh.visible = isShown;
      }
    }

    
  }

  render() {
    this.animate();
    this.renderer.setSize(window.innerWidth*0.45, window.innerHeight*0.45);
  }

  private animate() {
    this.frameId = window.requestAnimationFrame(() => this.animate());
    if(this.is3DFadingOut) {
      this.is3DFadingOutComplete = this.animatorService.faingOut3D();
      if(this.is3DFadingOutComplete) {
        this.is3DFadingOut = false;
        this.animatorService.resetAllSettings();
        this.fadingOutCompleteNotifier.next(this.is3DFadingOutComplete);
      }
    }

    if(this.is3DFadingIn)
      this.animatorService.fadingIn3D(this.scene);

    this.renderer.render(this.scene, this.camera);
  }

  enableDetailView(e: boolean) {
    this.isDetailEnabled = e;
  }

}

export const AnimationTriggers: any = [
  trigger('fadeOut2DDiv', [
    state('2d-show', style({
      width: '100%',
      height: '75vh',
      position: 'absolute',
      opacity: 1
    })),
    state('2d-hide', style({
      position: 'absolute',
      width: '100%',
      height: '75vh',
      display: 'none',
      opacity: 0
    })),
    transition('2d-hide <=> 2d-show', animate('1500ms'))])
];