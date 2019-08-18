import { NObject, LAYER, NPrObject } from '../object-interfaces';
import * as THREE from 'three';

export class GNObject implements NObject{
    id: number = 0;
    box_id: number = -1;  //this should match with the id of a certain GNObject2D
    name: string = "";
    full_name: string = "";
    layer: LAYER = LAYER.OPTICAL;
    position: [number, number, number] = [0, 0, 0];
    mesh_color: number = 0;
    mesh_emissive: number = 0;
    mesh: THREE.Mesh = null;
  
    constructor(_ndi: number, sid: number, n: string, fn: string, l: LAYER, p: [number, number, number], mc: number, me: number) {
      this.id = _ndi; 
      this.box_id = sid;
      this.name = n;
      this.full_name = fn;
      this.layer = l;
      this.position = p;
      this.mesh_color = mc;
      this.mesh_emissive = me;
    }
  
    updatePosition(_p): void {
      this.position = _p;
      this.mesh.position.set(this.position[0], this.position[1], this.position[2]);
    }
  
    getVisible(): boolean {
      return this.mesh.visible;
    }
  
    setVisible(v: boolean) {
      this.mesh.visible = v;
    }
  
    generateMesh(): THREE.Mesh {
      let geometry11 = new THREE.SphereBufferGeometry(1, 128, 128);
      let material11 = new THREE.MeshStandardMaterial({color: this.mesh_color, emissive: this.mesh_emissive, roughness: 0.5, metalness: 0.5});
      this.mesh = new THREE.Mesh(geometry11, material11);
      this.mesh.position.set(this.position[0], this.position[1], this.position[2]);
      this.mesh.visible = false;
      return this.mesh;
    }
  
  };

  export class GNPrObject implements NPrObject {
    id: number = 0;
    name: string = "";
    full_name: string = "";
    position: [number, number, number] = [1, 1, 1];
    mesh_color: number = 0;
    color2d: string = "";
    mesh_emissive: number = 0;
    mesh: THREE.Mesh = null;
  
    constructor(_id: number, n: string, fn: string, p: [number, number, number], mc: number, me: number, c2d: string) {
      this.id = _id;
      this.name = n;
      this.full_name = fn;
      this.position = p;
      this.mesh_color = mc;
      this.mesh_emissive = me;
      this.color2d = c2d;
    }

    getMesh() {
      if(this.mesh == null) {
        return this.generateMesh();
      }
      return this.mesh;
    }
  
    private generateMesh(): THREE.Mesh {
      let geometry14 = new THREE.CylinderBufferGeometry( 1, 1, 0.4, 32, 32);
      let material14 = new THREE.MeshStandardMaterial({color: this.mesh_color, emissive: this.mesh_emissive, roughness: 1, metalness: 1});
      this.mesh = new THREE.Mesh(geometry14, material14);
      this.mesh.position.set(this.position[0], this.position[1], this.position[2]);
      return this.mesh;
    }
  
    setVisible(v: boolean) {
      this.mesh.visible = v;
    }
  
    convertToD3Position(): [number, number] {
      let scaleX = window.innerWidth*0.8/40, scaleY = window.innerHeight/20;
      return [this.position[0]*scaleX, this.position[2]*scaleY];
    }
  }

  export const GNPrOs: GNPrObject[] = [
    new GNPrObject (1, 'site1', 'SITE-01', [0, 1, 12.5], 0x008000, 0x008000, "#008000"),
    new GNPrObject (2, 'site2', 'SITE-02', [4, 1, 10.5], 0x4B0082, 0x4B0082, "#4B0082"),
    new GNPrObject (3, 'site3', 'SITE-03', [-5, 1, 0], 0x008000, 0x008000, "#008000"),
    new GNPrObject (4, 'site4', 'SITE-04', [5, 1, -5], 0x008000, 0x008000, "#008000"),
    new GNPrObject (5, 'site6', 'SITE-04', [-2.5, 1, -12.5], 0x0080ff, 0x0080ff, "#0080ff"),
    new GNPrObject (6, 'site5', 'SITE-04', [7.5, 1, 2.5], 0x008000, 0x008000, "#008000")
  ];

  /* export const G3DNOs: GNObject[] = [
    new GNObject (1, 2, 'poc1', 'EDTNLABPOC-01', 0, [0, 5, 12.5], 0x4B0082, 0x400080),
    new GNObject (2, 3, 'poc2', 'EDTNLABPOC-02', 0, [-5, 5, 0], 0x4B0082, 0x400080),
    new GNObject (3, 4, 'poc3', 'EDTNLABPOC-03', 0, [5, 5, -5], 0x4B0082, 0x400080),
    new GNObject (4, 5, 'poc4', 'EDTNLABPOC-04', 0, [-2.5, 5, -12.5], 0x4B0082, 0x400080),
  
    new GNObject (5, 1, 'fws1', 'FW9500-SITE1', 1, [0, 10, 12.5], 0x0080ff, 0x404040),
    new GNObject (6, 3, 'fws2', 'FW9500-SITE2', 1, [-5, 10, 0], 0x0080ff, 0x404040),
    new GNObject (7, 6, 'fws3', 'FW9500-SITE3', 1, [7.5, 10, 2.5], 0x0080ff, 0x404040),
    new GNObject (8, 5, 'fws4', 'FW9500-SITE4', 1, [-2.5, 10, -12.5], 0x0080ff, 0x404040),
  
    new GNObject (9, 1, 'qfx2', 'EDTNLABQFX-01', 2, [0, 15, 12.5], 0x008000, 0x008000),
    new GNObject (10, 3, 'qfx2', 'EDTNLABQFX-02', 2, [-5, 15, 0], 0x008000, 0x008000),
    new GNObject (11, 4, 'qfx3', 'EDTNLABQFX-03', 2, [5, 15, -5], 0x008000, 0x008000),
    new GNObject (12, 6, 'qfx4', 'EDTNLABQFX-04', 2, [7.5, 15, 2.5], 0x008000, 0x008000)
    
  ]; */

  export const G3DNOs: GNObject[] = [
    new GNObject (1, 2, 'poc1', 'EDTNLABPOC-01', LAYER.OPTICAL, [4, 1, 10.5], 0x4B0082, 0x400080),
    new GNObject (2, 3, 'poc2', 'EDTNLABPOC-02', LAYER.OPTICAL, [-5, 1, 0], 0x4B0082, 0x400080),
    new GNObject (3, 4, 'poc3', 'EDTNLABPOC-03', LAYER.OPTICAL, [5, 1, -5], 0x4B0082, 0x400080),
    new GNObject (4, 5, 'poc4', 'EDTNLABPOC-04', LAYER.OPTICAL, [-2.5, 1, -12.5], 0x4B0082, 0x400080),
  
    new GNObject (5, 1, 'fws1', 'FW9500-SITE1', LAYER.LAYER1, [0, 1, 12.5], 0x0080ff, 0x404040),
    new GNObject (6, 3, 'fws2', 'FW9500-SITE2', LAYER.LAYER1, [-5, 1, 0], 0x0080ff, 0x404040),
    new GNObject (7, 6, 'fws3', 'FW9500-SITE3', LAYER.LAYER1, [7.5, 1, 2.5], 0x0080ff, 0x404040),
    new GNObject (8, 5, 'fws4', 'FW9500-SITE4', LAYER.LAYER1, [-2.5, 1, -12.5], 0x0080ff, 0x404040),
  
    new GNObject (9, 1, 'qfx2', 'EDTNLABQFX-01', LAYER.IP, [0, 1, 12.5], 0x008000, 0x008000),
    new GNObject (10, 3, 'qfx2', 'EDTNLABQFX-02', LAYER.IP, [-5, 1, 0], 0x008000, 0x008000),
    new GNObject (11, 4, 'qfx3', 'EDTNLABQFX-03', LAYER.IP, [5, 1, -5], 0x008000, 0x008000),
    new GNObject (12, 6, 'qfx4', 'EDTNLABQFX-04', LAYER.IP, [7.5, 1, 2.5], 0x008000, 0x008000)
    
  ];