import { Injectable, OnDestroy } from '@angular/core';
import * as OrbitControls from 'three-orbitcontrols';
import { trigger, state, style, animate, transition } from '@angular/animations';
import * as THREE from 'three';
import { AnimatorService } from './animator.service';
import { Subject } from 'rxjs';
import { NetworkManagerService } from './network-manager.service';
import { EntityLocatorService } from './entity-locator.service';
import { PathComputationService } from './path-computation.service';
import * as OBJ from '../models';

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
  highlightedLink: OBJ.GLObject2D = null;
  highlightedLSP: OBJ.GLObject2D[] = [];
  highlightedLinkName: string = "hlL";
  highlightedLSPName: string = "hlLSP";
  width: number = 0;
  height: number = 0;
  constructor(private animatorService: AnimatorService,
              private nodeMngmt: NetworkManagerService,
              private entityLocatorService: EntityLocatorService,
              private pathComputationService: PathComputationService) {
    this.scene = new THREE.Scene();
    this.raycaster = new THREE.Raycaster();
    this.renderer = new THREE.WebGLRenderer({antialias: false});
    this.camera = new THREE.PerspectiveCamera( 50, this.renderer.domElement.width/this.renderer.domElement.height, 0.01, 500 );
    this.controls = new OrbitControls(this.camera , this.renderer.domElement );
    this.raycaster.linePrecision = 0.1;

    this.scene.background = new THREE.Color( 0xa0a0a0 );

    let light = new THREE.SpotLight( 0xffffff, 1, 0, 1, 1, 1);
    light.position.set( -25, 50, 15 );
    this.scene.add(light );

    this.camera.position.set( 25, 25, 20 );
    this.camera.rotation.set( -Math.PI/4.5, Math.PI/4, Math.PI/6);

    this.controls.enabled = true;

    for(let g of this.nodeMngmt.getGPOs()) {
      this.scene.add(g.generateMesh())
    }
    this.width = window.innerWidth*0.45;
    this.height = window.innerHeight*0.45;
   
  }

  private resetHighlightedEntity() {
    
  }

  refreshScene(pickedNodeID: string) {
    for(let g of this.animatorService.nodes) {
      let og = this.scene.getObjectById(g.mesh.id);
      this.scene.remove(og);
    }

    for(let l of this.animatorService.links) {
      let ol = this.scene.getObjectById(l.mesh.id);
      this.scene.remove(ol);
    }

    this.highlightedLink = null;
    let hlLink = this.scene.getObjectByName(this.highlightedLinkName);
    this.scene.remove(hlLink);

    let [nodes, links] = this.pathComputationService.getReachedNetworkElements(pickedNodeID);
    this.entityLocatorService.locatingNetworkElements(nodes);
    this.animatorService.nodes = nodes;
    this.animatorService.links = links;
    for(let g of nodes) {
      this.scene.add(g.generateMesh())
    }

    for(let g of links) {
      this.scene.add(g.generateMesh())
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
        for(let l of this.animatorService.nodeMngmt.getGLOs()) {
          if(l.node1.id == o.id || l.node2.id == o.id) {
            l.mesh.visible = isShown;
          }
        }
        o.mesh.visible = isShown;
      }
    }
  }

  highlightLink(pickedLink: OBJ.GLObject2D) {
    this.undoHighlightLink();
    this.undoHighlightLSP();
    this.highlightedLink = pickedLink;
    this.highlightedLink.mesh.visible = false;
    let hlLink = pickedLink.generateHighlightedMesh();
    hlLink.name = this.highlightedLinkName;
    this.scene.add(hlLink);
  }

  private undoHighlightLink() {
    let hlLink = null;
    if(this.highlightedLink != null) { //there is already a highlighted link
      this.highlightedLink.mesh.visible = true;
      hlLink = this.scene.getObjectByName(this.highlightedLinkName);
      this.scene.remove(hlLink);
    }
  }

  highlightLSP(pickedLSP: OBJ.GNObject2D[]) {
    this.undoHighlightLink();
    this.undoHighlightLSP();
    this.highlightedLSP = [];
    for(let n of pickedLSP) {
      let nIdx = pickedLSP.indexOf(n);
      if(nIdx == pickedLSP.length - 1)
        break;
      let l: OBJ.GLObject2D = this.nodeMngmt.getLink(n, pickedLSP[nIdx+1]);
      l.mesh.visible = false;
      this.highlightedLSP.push(l);
      let hlLink = l.generateHighlightedMesh();
      hlLink.name = this.highlightedLSPName;
      this.scene.add(hlLink);

    }
  }

  private undoHighlightLSP() {
    let l = this.scene.getObjectByName(this.highlightedLSPName);
    while(l != undefined) {
      this.scene.remove(l);
      l = this.scene.getObjectByName(this.highlightedLSPName);
    }
    if(this.highlightedLSP.length > 0) {
      for(let l of this.highlightedLSP)
        l.mesh.visible = true;
    }
    
  }

  enableDetailView(e: boolean) {
    this.isDetailEnabled = e;
  }

  setRendererDimension(_w, _h) {
    this.width = _w;
    this.height = _h;
    this.renderer.setSize(this.width, this.height);
  }

  render() {
    this.animate();
    this.renderer.setSize(this.width, this.height);
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

}