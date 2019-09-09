import { NObject, NPrObject } from '../object-interfaces';
import * as THREE from 'three';
import { LAYER } from '../constants';

export class GNObject implements NObject{
    id: any = 0;
    box_id: any = -1;  //this should match with the id of a certain GNObject2D
    name: string = "";
    full_name: string = "";
    layer: LAYER = LAYER.OPTICAL;
    position: [number, number, number] = [0, 0, 0];
    mesh_color: number = 0;
    mesh_emissive: number = 0;
    mesh: THREE.Mesh = null;
  
    constructor(_ndi: any, sid: any, n: string, fn: string, l: LAYER, p: [number, number, number], mc: number, me: number) {
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
  id: any = 0;
  name: string = "";
  full_name: string = "";
  position: [number, number, number] = [1, 1, 1];
  mesh_color: number = 0;
  color2d: string = "";
  mesh_emissive: number = 0;
  mesh: THREE.Mesh = null;

  constructor(_id: any, n: string, fn: string, p: [number, number, number], mc: number, me: number, c2d: string) {
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
    new GNPrObject ('gnprobj0', 'site1', 'SITE-01', [0, 1, 12.5], 0x008000, 0x008000, "#008000"),
    new GNPrObject ('gnprobj1', 'site2', 'SITE-02', [4, 1, 10.5], 0x4B0082, 0x4B0082, "#4B0082"),
    new GNPrObject ('gnprobj2', 'site3', 'SITE-03', [-5, 1, 0], 0x008000, 0x008000, "#008000"),
    new GNPrObject ('gnprobj3', 'site4', 'SITE-04', [5, 1, -5], 0x008000, 0x008000, "#008000"),
    new GNPrObject ('gnprobj4', 'site6', 'SITE-04', [-2.5, 1, -12.5], 0x0080ff, 0x0080ff, "#0080ff"),
    new GNPrObject ('gnprobj5', 'site5', 'SITE-04', [7.5, 1, 2.5], 0x008000, 0x008000, "#008000")
  ];

  export const G3DNOs: GNObject[] = [
    new GNObject ('gnobj0', 'gnprobj1', 'poc1', 'EDTNLABPOC-01', LAYER.OPTICAL, [4, 1, 10.5], 0x4B0082, 0x400080),
    new GNObject ('gnobj1', 'gnprobj2', 'poc2', 'EDTNLABPOC-02', LAYER.OPTICAL, [-5, 1, 0], 0x4B0082, 0x400080),
    new GNObject ('gnobj2', 'gnprobj3', 'poc3', 'EDTNLABPOC-03', LAYER.OPTICAL, [5, 1, -5], 0x4B0082, 0x400080),
    new GNObject ('gnobj3', 'gnprobj4', 'poc4', 'EDTNLABPOC-04', LAYER.OPTICAL, [-2.5, 1, -12.5], 0x4B0082, 0x400080),
  
    new GNObject ('gnobj4', 'gnprobj0', 'fws1', 'FW9500-SITE1', LAYER.LAYER1, [0, 1, 12.5], 0x0080ff, 0x404040),
    new GNObject ('gnobj5', 'gnprobj2', 'fws2', 'FW9500-SITE2', LAYER.LAYER1, [-5, 1, 0], 0x0080ff, 0x404040),
    new GNObject ('gnobj6', 'gnprobj5', 'fws3', 'FW9500-SITE3', LAYER.LAYER1, [7.5, 1, 2.5], 0x0080ff, 0x404040),
    new GNObject ('gnobj7', 'gnprobj4', 'fws4', 'FW9500-SITE4', LAYER.LAYER1, [-2.5, 1, -12.5], 0x0080ff, 0x404040),
  
    new GNObject ('gnobj8', 'gnprobj0', 'qfx1', 'EDTNLABQFX-01', LAYER.IP, [0, 1, 12.5], 0x008000, 0x008000),
    new GNObject ('gnobj9', 'gnprobj2', 'qfx2', 'EDTNLABQFX-02', LAYER.IP, [-5, 1, 0], 0x008000, 0x008000),
    new GNObject ('gnobj10', 'gnprobj3', 'qfx3', 'EDTNLABQFX-03', LAYER.IP, [5, 1, -5], 0x008000, 0x008000),
    new GNObject ('gnobj11', 'gnprobj5', 'qfx4', 'EDTNLABQFX-04', LAYER.IP, [7.5, 1, 2.5], 0x008000, 0x008000)
    
  ];

  