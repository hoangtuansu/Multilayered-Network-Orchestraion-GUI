import { Injectable } from '@angular/core';
import * as OBJ from '../models';

@Injectable({
  providedIn: 'root'
})
export class AnimatorService {

  isPlanesFadeOutPhaseDone: boolean = false;
  isMoveCameraTopPhaseDone: boolean = false;
  isRotatePlanePhase: boolean = false;
  isZoomPlanePhase: boolean = false;
  isMergeSpheresPhase: boolean = false;
  isMergeSphere2Done: boolean = false;
  isProjectSpheresPhase: boolean = false;
  isLinksFadeOutPhaseDone: boolean = false;
  isRedoZoomPlanePhaseDone: boolean = false;

  constructor() { }

  getGPOs() {
    return OBJ.GPOs;
  }

  getG3DNOs() {
    return OBJ.G3DNOs;
  }

  getGLOs() {
    return OBJ.GLOs;
  }

  getG2DNOs() {
    return OBJ.G2DNOs;
  }

  fadingIn3D(camera: any, controls: any): boolean {
    this.redoZoomPlanePhase(camera, controls);
    if(this.isRedoZoomPlanePhaseDone) {
      return !this.isRedoZoomPlanePhaseDone;
    }
    return false;
  }

  fadingOut2D(): boolean {
    return true;
  }

  fadingIn2D(): boolean {
    for(let o of this.getG2DNOs()) {

    }
    return true;
  }

  faingOut3D(camera: any, controls: any): boolean {
    this.linksFadeOutPhase();
    if(this.isLinksFadeOutPhaseDone) {
      this.planesFadeOutPhase();
      if(this.isPlanesFadeOutPhaseDone) {
        this.projectSpheresPhase();
        if(this.isProjectSpheresPhase) {
          this.moveCameraTopPhase(camera, controls);
          if(this.isMoveCameraTopPhaseDone) {
            this.rotatePlanePhase(camera)
            if(this.isRotatePlanePhase) {
              this.zoomPlanePhase(camera, controls);
              return !this.isZoomPlanePhase;
            }
          }
        }
      }
    }
    return false;
  }

  private linksFadeOutPhase() {
    if(this.isLinksFadeOutPhaseDone)
      return;
    let count = 0;
    for(let l of this.getGLOs()) {
      count += 1;
      l.mesh.visible = false;
    }
    this.isLinksFadeOutPhaseDone = count == this.getGLOs().length;
  }

  private mergeSpheresPhase() {
    if(this.isMergeSphere2Done) 
      return;
    let count_all_merged: number = 0;
    for(let o of this.getG2DNOs()) {
      let p: [number, number, number] = [0,0,0];
      let flag: boolean = false;
      let count = 0;
      for(let _o of this.getG3DNOs()) {
        if(_o.box_id == o.id) {
          count += 1;
          p[0] += _o.position[0];
          p[1] += _o.position[1];
          p[2] += _o.position[2];
        }
      }

      p = [p[0]/count, p[1]/count, p[2]/count];
      
      for(let _o of this.getG3DNOs()) {
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
    this.isMergeSphere2Done = (count_all_merged == this.getG2DNOs().length);
  }

  private planesFadeOutPhase() {
    if(this.isPlanesFadeOutPhaseDone)
      return;
    let planes = this.getGPOs();
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
    for(let o of this.getG2DNOs()) {
      for(let _o of this.getG3DNOs()) {
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
    this.isProjectSpheresPhase = (count == this.getG3DNOs().length);
    if(this.isProjectSpheresPhase) {
      for(let g of this.getG3DNOs())
        g.setVisible(false);
      for(let g of this.getG2DNOs())
        g.setVisible(true);
    }
    
  }

  private moveCameraTopPhase(camera: any, controls: any) {
    if(this.isMoveCameraTopPhaseDone)
      return;
    let cam_pos = camera.position;

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

    camera.position.set(cam_pos.x, cam_pos.y, cam_pos.z);
    controls.update();
  }

  private rotatePlanePhase(camera: any) {
    if(this.isRotatePlanePhase)
      return;
    let cam_rot = camera.rotation;
    if(Math.abs(cam_rot.z - Math.PI/2) < 0.1) {
      camera.rotation.set(-Math.PI/2, 0, Math.PI/2);
      this.isRotatePlanePhase = true;
      return;
    }
    cam_rot.z += Math.PI/18;
    camera.rotation.set(-Math.PI/2, 0, cam_rot.z);
    this.isRotatePlanePhase = false;
  }

  private zoomPlanePhase(camera: any, controls: any) {
    if(this.isZoomPlanePhase)
      return;
    controls.enabled = false;
    let cam_pos = camera.position;
    cam_pos.y -= 7;
    if(Math.abs(cam_pos.y - 22) < 0.1) {
      cam_pos.y = 22;
      this.isZoomPlanePhase = true;
      controls.enabled = true;
    } else {
      this.isZoomPlanePhase = false;
    }
    camera.position.set(1, cam_pos.y, 1);
  }

  private redoZoomPlanePhase(camera: any, controls: any) {
    if(this.isRedoZoomPlanePhaseDone)
      return;
    controls.enabled = false;
    let cam_pos = camera.position;
    cam_pos.y += 7;
    if(Math.abs(cam_pos.y - 50) < 0.1) {
      cam_pos.y = 50;
      this.isRedoZoomPlanePhaseDone = true;
      controls.enabled = true;
    } else {
      this.isRedoZoomPlanePhaseDone = false;
    }
    camera.position.set(1, cam_pos.y, 1);
  }

}
