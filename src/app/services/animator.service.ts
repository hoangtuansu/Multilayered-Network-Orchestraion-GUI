import { Injectable } from '@angular/core';
import * as OBJ from '../models';
import { NodeManagerService } from './node-manager.service';

@Injectable({
  providedIn: 'root'
})
export class AnimatorService {

  isPlanesFadeOutPhaseDone: boolean = false;
  isMergeSpheresPhase: boolean = false;
  isMergeSphere2Done: boolean = false;
  isProjectSpheresPhase: boolean = false;
  isLinksFadeOutPhaseDone: boolean = false;
  isRedoPlanesFadeOutPhase: boolean = false;
  isredoProjectSpheresPhase: boolean = false;
  isRedoLinksFadeOutPhase: boolean = false;
  constructor(private nodeMngmt: NodeManagerService) { }

  resetAllSettings() {
    this.isPlanesFadeOutPhaseDone = false;
    this.isMergeSpheresPhase = false;
    this.isMergeSphere2Done = false;
    this.isProjectSpheresPhase = false;
    this.isLinksFadeOutPhaseDone = false;
    this.isRedoPlanesFadeOutPhase = false;
    this.isredoProjectSpheresPhase = false;
    this.isRedoLinksFadeOutPhase = false;
  }

  fadingIn3D(scene: any): boolean {
    this.redoPlanesFadeOutPhase();
    if(this.isRedoPlanesFadeOutPhase) {
      this.redoProjectSpheresPhase();
      if(this.isredoProjectSpheresPhase)
        this.redoLinksFadeOutPhase(scene);
        if(this.isRedoLinksFadeOutPhase) {
          return true;
        }
          
    }
    return false;
  }

  fadingOut2D(): boolean {
    return true;
  }

  fadingIn2D(): boolean {
    for(let o of this.nodeMngmt.getGNPrOs()) {

    }
    return true;
  }

  faingOut3D(): boolean {
    this.linksFadeOutPhase();
    if(this.isLinksFadeOutPhaseDone) {
      this.planesFadeOutPhase();
      if(this.isPlanesFadeOutPhaseDone) {
        this.projectSpheresPhase();
        if(this.isProjectSpheresPhase) {
          return true;
        }
      }
    }
    return false;
  }

  private linksFadeOutPhase() {
    if(this.isLinksFadeOutPhaseDone)
      return;
    for(let l of this.nodeMngmt.getGLOs()) {
      l.mesh.visible = false;
    }
    this.isLinksFadeOutPhaseDone = true;
  }

  private mergeSpheresPhase() {
    if(this.isMergeSphere2Done) 
      return;
    let count_all_merged: number = 0;
    for(let o of this.nodeMngmt.getGNPrOs()) {
      let p: [number, number, number] = [0,0,0];
      let flag: boolean = false;
      let count = 0;
      for(let _o of this.nodeMngmt.getG3DNOs()) {
        if(_o.box_id == o.id) {
          count += 1;
          p[0] += _o.position[0];
          p[1] += _o.position[1];
          p[2] += _o.position[2];
        }
      }

      p = [p[0]/count, p[1]/count, p[2]/count];
      
      for(let _o of this.nodeMngmt.getG3DNOs()) {
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
    this.isMergeSphere2Done = (count_all_merged == this.nodeMngmt.getGNPrOs().length);
  }

  private planesFadeOutPhase() {
    if(this.isPlanesFadeOutPhaseDone)
      return;
    let planes = this.nodeMngmt.getGPOs();
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
    for(let o of this.nodeMngmt.getGNPrOs()) {
      for(let _o of this.nodeMngmt.getG3DNOs()) {
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
    this.isProjectSpheresPhase = (count == this.nodeMngmt.getG3DNOs().length);
    if(this.isProjectSpheresPhase) {
      for(let g of this.nodeMngmt.getG3DNOs())
        g.setVisible(false);
      for(let g of this.nodeMngmt.getGNPrOs())
        g.setVisible(true);
    }
    
  }

  private redoPlanesFadeOutPhase() {
    if(this.isRedoPlanesFadeOutPhase)
      return;
    
    let count = true;
    for(let p of this.nodeMngmt.getGPOs()) {
      p.setVisible(true);
      console.log("test");
      if(p.layer == OBJ.LAYER.WORLD)
        continue;
      let upperbound = 5;
      switch(p.layer) {
        case OBJ.LAYER.LAYER1:
          upperbound = 10;
          break;
        case OBJ.LAYER.IP:
          upperbound = 15;
          break;
        default:
          upperbound = 5;
      }

      if(p.position[1] + 1 <= upperbound) {
        p.updatePosition([p.position[0], p.position[1] + 1, p.position[2]]);
        count = false;
      }
    }
    this.isRedoPlanesFadeOutPhase = count;
  }

  private redoProjectSpheresPhase() {
    if(this.isredoProjectSpheresPhase) 
      return;
    let count = true;
    for(let o of this.nodeMngmt.getG3DNOs()) {
      o.setVisible(true);
      let upperbound = 5;
      switch(o.layer) {
        case OBJ.LAYER.LAYER1:
          upperbound = 10;
          break;
        case OBJ.LAYER.IP:
          upperbound = 15;
          break;
        default:
          upperbound = 5;
      }

      if(o.position[1] + 1 <= upperbound) {
        o.updatePosition([o.position[0], o.position[1] + 1, o.position[2]]);
        count = false;
      }
    }

    /* if(count) {
      for(let g of this.getGNPrOs())
        g.setVisible(false);
    } */
    this.isredoProjectSpheresPhase = count;
  }

  private redoLinksFadeOutPhase(scene: any) {
    if(this.isRedoLinksFadeOutPhase)
      return;
    for(let l of this.nodeMngmt.getGLOs()) {
      let m = scene.getObjectById(l.mesh.id, true);
      scene.remove(m);
      l.updatePosition(l.node1, l.node2);
      scene.add(l.mesh);
      l.mesh.visible = true;
    }
    this.isRedoLinksFadeOutPhase = true;
  }

}
