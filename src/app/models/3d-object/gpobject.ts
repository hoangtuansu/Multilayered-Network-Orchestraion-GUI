import { NObject, LAYER } from '../object-interfaces';
import * as THREE from 'three';

export class GPOjbect implements NObject {
    id: number = 0;
    name: string = "";
    full_name: string = "";
    layer: LAYER = LAYER.OPTICAL;
    position: [number, number, number] = [0, 0, 0];
    background_image: string = "";
    mesh: THREE.Mesh = null;

    constructor(n: string, fn: string, l: LAYER, p: [number, number, number], bg_im?: string) {
      this.name = n;
      this.full_name = fn;
      this.layer = l;
      this.position = p;
      this.background_image = bg_im;
    }
  
    updatePosition(_p): void {
      this.position = _p;
      this.mesh.position.set(this.position[0], this.position[1], this.position[2]);
    }

    setVisible(v: boolean) {
      this.mesh.visible = v;
    }
  
    generateMesh(): THREE.Mesh {
      let geometry = new THREE.BoxBufferGeometry(40, 20, 0.1);
      let material = null;
      let isVisible: boolean = false;
      if(this.background_image !== undefined) {
        let texture = new THREE.TextureLoader().load( this.background_image);
        texture.anisotropy = 0;
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.LinearFilter;
        material = new THREE.MeshBasicMaterial();
        material.map = texture;
        material.transparent = true;
        isVisible = true;
      } else {
        material = new THREE.MeshStandardMaterial({color: 0xffffff, emissive: 0x000000, roughness: 1.0, metalness: 0.0, opacity: 0.6, transparent: true});
      }
      this.mesh = new THREE.Mesh(geometry, material);
      this.mesh.position.set(this.position[0], this.position[1], this.position[2]);
      this.mesh.rotation.set(Math.PI/2, 0, Math.PI/2);
      this.mesh.visible = isVisible;
      return this.mesh;
    }
  }

  /* export const GPOs: GPOjbect[] = [
    new GPOjbect ( 'OPT', "OPTICAL", 0, [1, 5, 1]),
    new GPOjbect ( 'DLK', "DLK", 1, [1, 10, 1]),
    new GPOjbect ( 'IP', "IP", 2, [1, 15, 1]),
    new GPOjbect ( 'WD', "WORLD", 0, [1, 1, 1], "assets/canada-alberta.png"),
  ]; */

  export const GPOs: GPOjbect[] = [
    new GPOjbect ( 'OPT', "OPTICAL", LAYER.OPTICAL, [1, 1, 1]),
    new GPOjbect ( 'DLK', "DLK", LAYER.LAYER1, [1, 1, 1]),
    new GPOjbect ( 'IP', "IP", LAYER.IP, [1, 1, 1]),
    new GPOjbect ( 'WD', "WORLD", LAYER.WORLD, [1, 1, 1], "assets/canada-alberta.png"),
  ];