import * as OrbitControls from 'three-orbitcontrols';
import { trigger, state, style, animate, transition } from '@angular/animations';
import * as THREE from 'three';
import { TopoVisualizationComponent } from './topo-visualization.component';
import * as OBJ from '../models';

export class Visualizer {
  renderer = new THREE.WebGLRenderer();
  scene: THREE.Scene = new THREE.Scene();
  raycaster: THREE.Raycaster = new THREE.Raycaster();
  camera: THREE.PerspectiveCamera = null;
  controls: OrbitControls = null;
  mouse = null;
  gnObj: OBJ.GNObject[];
  glObj: OBJ.GLObject[];
  gpObj: OBJ.GPOjbect[];
  gnObj2D: OBJ.GNObject2D[];
  animator: Animator = null;
  isSwitch3DTo2D: boolean = false;
  isSwitch3DTo2DDone: boolean = false;
  isSwitch2DTo3DDone: boolean = false;
  isSwitchBack2D: boolean = false;
  isSwitch2DTo3D: boolean = false;
  isSwitchBack3D: boolean = false;
  topoComponent: TopoVisualizationComponent = null;

  constructor(_gnObj, _glObj, _gpObj, _gnObj2d) {
    this.gnObj = _gnObj;
    this.glObj = _glObj;
    this.gpObj = _gpObj;
    this.gnObj2D = _gnObj2d;
    this.animator = new Animator(this);

    this.scene.background = new THREE.Color( 0xa0a0a0 );
    let light = new THREE.SpotLight( 0xffffff, 1, 0, 1, 1, 1);
    light.position.set( -25, 50, 15 );
    this.scene.add(light );
    
    this.camera = new THREE.PerspectiveCamera( 50, this.renderer.domElement.width/this.renderer.domElement.height, 0.01, 500 );
    this.camera.position.set( 36, 25, 26 );
    this.camera.rotation.set( -Math.PI/4.5, Math.PI/4, Math.PI/6);

    this.controls = new OrbitControls(this.camera , this.renderer.domElement );
    this.controls.enabled = true;

    for(let g of this.gpObj) {
      this.scene.add(g.generateMesh());
    }

    for(let g of this.gnObj) {
      this.scene.add(g.generateMesh());
    }

    for(let g of this.glObj) {
      this.scene.add(g.generateMesh());
    }

    for(let g of this.gnObj2D) {
      let m = g.generateMesh();
      g.setVisible(false);
      this.scene.add(m);
    }
    
    this.raycaster.linePrecision = 0.1;
  }

  setTopoComponent(_topo: TopoVisualizationComponent) {
    this.topoComponent = _topo;
  }

  setGNObject2D(_gnobj2d: any) {
    this.gnObj2D = _gnobj2d;
  }

  render() {
    this.renderer.setSize(window.innerWidth*0.75, window.innerHeight*0.75);
    this.animate();
  }

  animate() {
    
    window.requestAnimationFrame(() => this.animate());
    if(this.isSwitch3DTo2D) {
      this.animator.switch3DTo2D();
      if(this.isSwitch3DTo2DDone) {
        this.topoComponent.detach3DLayout();
      }
    }

    if(this.isSwitchBack2D) {
      this.animator.switchBack2D();
    }

    if(this.isSwitch2DTo3D) {
      this.animator.switch2DTo3D();
      if(this.isSwitch2DTo3DDone) {
        this.topoComponent.attach3DLayout();
      }
    }

    if(this.isSwitchBack3D) {
      this.animator.switchBack3D();
    }

    this.renderer.render(this.scene, this.camera);
  }
}

export class Animator{
  visualizer: Visualizer = null;
  isPlanesFadeOutPhaseDone: boolean = false;
  isMoveCameraTopPhaseDone: boolean = false;
  isRotatePlanePhase: boolean = false;
  isZoomPlanePhase: boolean = false;
  isMergeSpheresPhase: boolean = false;
  isMergeSphere2Done: boolean = false;
  isProjectSpheresPhase: boolean = false;
  isLinksFadeOutPhaseDone: boolean = false;
  isRedoZoomPlanePhaseDone: boolean = false;

  constructor(_vis) {
    this.visualizer = _vis;
  }

  switchBack3D() {
    this.redoZoomPlanePhase();
    if(this.isRedoZoomPlanePhaseDone) {
      this.visualizer.isSwitch2DTo3DDone = !this.isRedoZoomPlanePhaseDone;
    }
  }

  switchBack2D() {

  }

  switch2DTo3D() {
    this.visualizer.isSwitch2DTo3DDone = true;
  }

  display2DLayout() {
    for(let o of this.visualizer.gnObj2D) {

    }
  }

  switch3DTo2D() {
    this.linksFadeOutPhase();
    if(this.isLinksFadeOutPhaseDone) {
      this.planesFadeOutPhase();
      if(this.isPlanesFadeOutPhaseDone) {
        this.projectSpheresPhase();
        if(this.isProjectSpheresPhase) {
          this.moveCameraTopPhase();
          if(this.isMoveCameraTopPhaseDone) {
            this.rotatePlanePhase()
            if(this.isRotatePlanePhase) {
              this.zoomPlanePhase();
              this.visualizer.isSwitch3DTo2DDone = !this.isZoomPlanePhase;
            }
          }
        }
      }
    }
    
  }

  private linksFadeOutPhase() {
    if(this.isLinksFadeOutPhaseDone)
      return;
    let count = 0;
    for(let l of this.visualizer.glObj) {
      count += 1;
      l.mesh.visible = false;
    }
    this.isLinksFadeOutPhaseDone = count == this.visualizer.glObj.length;
  }

  private mergeSpheresPhase() {
    if(this.isMergeSphere2Done) 
      return;
    let count_all_merged: number = 0;
    for(let o of this.visualizer.gnObj2D) {
      let p: [number, number, number] = [0,0,0];
      let flag: boolean = false;
      let count = 0;
      for(let _o of this.visualizer.gnObj) {
        if(_o.box_id == o.id) {
          count += 1;
          p[0] += _o.position[0];
          p[1] += _o.position[1];
          p[2] += _o.position[2];
        }
      }

      p = [p[0]/count, p[1]/count, p[2]/count];
      
      for(let _o of this.visualizer.gnObj) {
        if(_o.box_id == o.id) {
          let p_o = _o.position;
          p_o[0] += Math.abs(p_o[0] - p[0]) > 0.5 ? (p_o[0] > p[0] ? -1 : (p_o[0] < p[0] ? 1: 0)) : 0;
          p_o[1] += Math.abs(p_o[1] - p[1]) > 0.5 ? (p_o[1] > p[1] ? -1 : (p_o[1] < p[1] ? 1: 0)) : 0;
          p_o[2] += Math.abs(p_o[2] - p[2]) > 0.5 ? (p_o[2] > p[2] ? -1 : (p_o[2] < p[2] ? 1: 0)) : 0;

          if(Math.abs(p_o[0] - p[0]) < 0.6 && Math.abs(p_o[1] - p[1]) < 0.6 && Math.abs(p_o[2] - p[2]) < 0.6) {
            flag = true;
            _o.updatePosition([p[0], p[1], p[2]]);
          } else {
            _o.updatePosition([p_o[0], p_o[1], p_o[2]]);
          }
        }
      }
      count_all_merged += flag ? 1 : 0;
    }
    this.isMergeSphere2Done = (count_all_merged == this.visualizer.gnObj2D.length);
  }

  private planesFadeOutPhase() {
    if(this.isPlanesFadeOutPhaseDone)
      return;
    let planes = this.visualizer.gpObj;
    let nbr_plane_need_to_invisible = 0;
    for(let p of planes) {
      if(p.position[0] != 1 || p.position[1] != 1 || p.position[2] != 1) {
        if(p.position[1] > 2) {
          p.updatePosition([p.position[0], p.position[1] - 1, p.position[2]]);
          
        } else {
          p.mesh.visible = false;
          nbr_plane_need_to_invisible += 1
        }
      }
    }
    this.mergeSpheresPhase();
    
    this.isPlanesFadeOutPhaseDone = nbr_plane_need_to_invisible == 3;
  }

  private projectSpheresPhase() {
    if(this.isProjectSpheresPhase)
      return;
    let count = 0;
    for(let o of this.visualizer.gnObj2D) {
      for(let _o of this.visualizer.gnObj) {
        if(_o.box_id == o.id) {
          let p = o.position;
          let p_o = _o.position;

          p_o[0] += Math.abs(p_o[0] - p[0]) > 0.5 ? (p_o[0] > p[0] ? -1 : (p_o[0] < p[0] ? 1: 0)) : 0;
          p_o[1] += Math.abs(p_o[1] - p[1]) > 0.5 ? (p_o[1] > p[1] ? -1 : (p_o[1] < p[1] ? 1: 0)) : 0;
          p_o[2] += Math.abs(p_o[2] - p[2]) > 0.5 ? (p_o[2] > p[2] ? -1 : (p_o[2] < p[2] ? 1: 0)) : 0;

          if(Math.abs(p[0] - p_o[0]) <= 0.5 && Math.abs(p[1] - p_o[1]) <= 0.5 && Math.abs(p_o[2] - p[2]) <= 0.5) {
            count += 1;
            _o.updatePosition([p[0], 1, p[2]]);
          } else {
            _o.updatePosition([p_o[0], p_o[1], p_o[2]]);
          }
        }
      }
    }
    this.isProjectSpheresPhase = (count == this.visualizer.gnObj.length);
    if(this.isProjectSpheresPhase) {
      for(let g of this.visualizer.gnObj)
        g.setVisible(false);
      for(let g of this.visualizer.gnObj2D)
        g.setVisible(true);
    }
    
  }

  private moveCameraTopPhase() {
    if(this.isMoveCameraTopPhaseDone)
      return;
    let cam_pos = this.visualizer.camera.position;

    cam_pos.x -= Math.abs(cam_pos.x) > 1 ? 3.5 : 0;
    cam_pos.y += Math.abs(cam_pos.y) < 50 ? 2.5 : 0;
    cam_pos.z -= Math.abs(cam_pos.z) > 1 ? 2.5 : 0;

    /* cam_pos.x += Math.abs(cam_pos.x - 1) > 0.1 ? (cam_pos.x < 1 ? 1 : -1) : 0;
    cam_pos.y += Math.abs(cam_pos.y - 50) > 0.1 ? (cam_pos.y < 50 ? 1 : -1) : 0;
    cam_pos.z += Math.abs(cam_pos.z - 1) > 0.1 ? (cam_pos.z < 1 ? 1 : -1) : 0; */

    if(Math.abs(cam_pos.x - 1) < 0.1 && Math.abs(cam_pos.y - 50) < 0.1 && Math.abs(cam_pos.z - 1) < 0.1) {
      cam_pos.x = 1;
      cam_pos.y = 50;
      cam_pos.z = 1;
      this.isMoveCameraTopPhaseDone = true;
    } else {
      this.isMoveCameraTopPhaseDone = false;
    }

    this.visualizer.camera.position.set(cam_pos.x, cam_pos.y, cam_pos.z);
    this.visualizer.controls.update();
  }

  private rotatePlanePhase() {
    if(this.isRotatePlanePhase)
      return;
    let cam_rot = this.visualizer.camera.rotation;
    if(Math.abs(cam_rot.z - Math.PI/2) < 0.1) {
      this.visualizer.camera.rotation.set(-Math.PI/2, 0, Math.PI/2);
      this.isRotatePlanePhase = true;
      return;
    }
    cam_rot.z += Math.PI/18;
    this.visualizer.camera.rotation.set(-Math.PI/2, 0, cam_rot.z);
    this.isRotatePlanePhase = false;
  }

  private zoomPlanePhase() {
    if(this.isZoomPlanePhase)
      return;
    this.visualizer.controls.enabled = false;
    let cam_pos = this.visualizer.camera.position;
    cam_pos.y -= 7;
    if(Math.abs(cam_pos.y - 22) < 0.1) {
      cam_pos.y = 22;
      this.isZoomPlanePhase = true;
      this.visualizer.controls.enabled = true;
    } else {
      this.isZoomPlanePhase = false;
    }
    this.visualizer.camera.position.set(1, cam_pos.y, 1);
  }

  private redoZoomPlanePhase() {
    if(this.isRedoZoomPlanePhaseDone)
      return;
    this.visualizer.controls.enabled = false;
    let cam_pos = this.visualizer.camera.position;
    cam_pos.y += 7;
    if(Math.abs(cam_pos.y - 50) < 0.1) {
      cam_pos.y = 50;
      this.isRedoZoomPlanePhaseDone = true;
      this.visualizer.controls.enabled = true;
    } else {
      this.isRedoZoomPlanePhaseDone = false;
    }
    this.visualizer.camera.position.set(1, cam_pos.y, 1);
  }
}



export const AnimationTriggers: any = [
  trigger('fadeOut3DDiv', [
    state('3d-show', style({
      position: 'absolute',
      opacity: 1
    })),
    state('3d-hide', style({
      position: 'absolute',
      opacity: 0
    })),
    transition('3d-hide <=> 3d-show', animate('1500ms'))]), 
  trigger('fadeOut2DDiv', [
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
    transition('2d-hide <=> 2d-show', animate('1500ms'))])
];