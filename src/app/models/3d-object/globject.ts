import { LObject } from '../object-interfaces';
import * as THREE from 'three';
import { GNObject, G3DNOs, GNPrOs } from './gnobject';

export class GLObject implements LObject {
    id: number = 0;
    name: string = "";
    node1: any = null;
    node2: any = null;
    position: [number, number, number] = [0, 0, 0];
    height: number = 0;
    mesh_color: number = 0;
    mesh_emissive: number = 0;
    mesh: THREE.Mesh = null;
  
    constructor(_id: number, n: string, n1: any, n2: any, h: number, mc: number, me: number) {
      this.id = _id; 
      this.name = n;
      this.node1 = n1;
      this.node2 = n2;
      let p: [number, number, number] = [(n1.position[0] + n2.position[0])/2, (n1.position[1] + n2.position[1])/2, (n1.position[2] + n2.position[2])/2]
      this.position = p;
      this.height = h;
      this.mesh_color = mc;
      this.mesh_emissive = me;
    }

    updatePosition(n1: any, n2: any) {
      this.node1 = n1;
      this.node2 = n2;
      let A = new THREE.Vector3(this.node1.position[0], this.node1.position[1], this.node1.position[2]);
      let B = new THREE.Vector3(this.node2.position[0], this.node2.position[1], this.node2.position[2]);

      let vec = B.clone(); vec.sub(A);
      var h = vec.length();
      vec.normalize();
      let quaternion = new THREE.Quaternion();
      quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), vec);
      var geometry = new THREE.CylinderBufferGeometry(0.25, 0.25, h, 32);
      geometry.translate(0, h / 2, 0);
      let material14 = new THREE.MeshStandardMaterial({color: this.mesh_color, emissive: this.mesh_emissive, roughness: 1, metalness: 1});
      this.mesh = new THREE.Mesh(geometry, material14);
      this.mesh.applyQuaternion(quaternion);
      this.mesh.position.set(A.x, A.y, A.z);
    }

    generateMesh(): THREE.Mesh {
      let h = Math.sqrt(Math.pow(this.node1.position[0] - this.node2.position[0], 2) + Math.pow(this.node1.position[1] - this.node2.position[1], 2) + Math.pow(this.node1.position[2] - this.node2.position[2],2));
      let geometry14 = new THREE.CylinderBufferGeometry( 0.25, 0.25, this.height, 32, 32);
      let material14 = new THREE.MeshStandardMaterial({color: this.mesh_color, emissive: this.mesh_emissive, roughness: 1, metalness: 1});
      this.mesh = new THREE.Mesh(geometry14, material14);
      this.mesh.position.set(this.position[0], this.position[1], this.position[2]);
      this.mesh.visible = false;
      return this.mesh;
    }
  
  };

  export const GLOs: GLObject[] = [
    new GLObject (1, '100GB', G3DNOs[0], GNPrOs[1], 5, 0xffff00, 0x66C6C),
    new GLObject (2, '10GB', G3DNOs[9], GNPrOs[2], 5, 0xffff00, 0x66C6C),
  
    new GLObject (3, '20GB', G3DNOs[10], GNPrOs[3], 5, 0xffff00, 0x66C6C),
    new GLObject (4, '40GB', G3DNOs[7], GNPrOs[4], 5, 0xffff00, 0x66C6C),
  
    new GLObject (5, '200GB', G3DNOs[8], GNPrOs[0], 10, 0xffff00, 0x66C6C),
  
    new GLObject (6, '100GB', G3DNOs[11], GNPrOs[5], 5, 0xffff00, 0x66C6C)
  
  ];

  /* export const GLOs: GLObject[] = [
    new GLObject (1, '100GB', G3DNOs[0], G3DNOs[4], 5, 0xffff00, 0x66C6C),
    new GLObject (2, '10GB', G3DNOs[4], G3DNOs[8], 5, 0xffff00, 0x66C6C),
  
    new GLObject (3, '20GB', G3DNOs[1], G3DNOs[5], 5, 0xffff00, 0x66C6C),
    new GLObject (4, '40GB', G3DNOs[5], G3DNOs[9], 5, 0xffff00, 0x66C6C),
  
    new GLObject (5, '200GB', G3DNOs[2], G3DNOs[10], 10, 0xffff00, 0x66C6C),
  
    new GLObject (6, '100GB', G3DNOs[3], G3DNOs[7], 5, 0xffff00, 0x66C6C),
  
    new GLObject (7, '50GB', G3DNOs[6], G3DNOs[11], 5, 0xffff00, 0x66C6C)
  ]; */