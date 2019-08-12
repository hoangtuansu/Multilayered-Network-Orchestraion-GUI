import * as THREE from 'three';
import { NObject2D } from '../object-interfaces';

export class GNObject2D implements NObject2D {
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
  
    generateMesh(): THREE.Mesh {
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
      let scaleX = window.innerWidth*0.75/40, scaleY = window.innerHeight*0.75/20;
      return [this.position[0]*scaleX, this.position[2]*scaleY];
    }
  }

  export const G2DNOs: GNObject2D[] = [
    new GNObject2D (1, 'site1', 'SITE-01', [0, 1, 12.5], 0x008000, 0x008000, "#008000"),
    new GNObject2D (2, 'site2', 'SITE-02', [4, 1, 10.5], 0x4B0082, 0x4B0082, "#4B0082"),
    new GNObject2D (3, 'site3', 'SITE-03', [-5, 1, 0], 0x008000, 0x008000, "#008000"),
    new GNObject2D (4, 'site4', 'SITE-04', [5, 1, -5], 0x008000, 0x008000, "#008000"),
    new GNObject2D (5, 'site6', 'SITE-04', [-2.5, 1, -12.5], 0x0080ff, 0x0080ff, "#0080ff"),
    new GNObject2D (6, 'site5', 'SITE-04', [7.5, 1, 2.5], 0x008000, 0x008000, "#008000")
  ];