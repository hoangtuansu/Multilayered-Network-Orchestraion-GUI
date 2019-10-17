import { NObject2D, LObject2D} from '../object-interfaces';
import { GNObject2D, G2DNOs } from './gnobject2D';
import { LINK_TYPE, CONSTANTS } from '../constants';
import * as THREE from 'three';

export class GLObject2D implements LObject2D {
    id: any = 0;
    name: string = "";
    color: string = "";
    width: number = 1;
    node1: GNObject2D = null;
    node1_if: string = "";
    node2: GNObject2D = null;
    node2_if: string = "";
    bandwidth: string;
    type: LINK_TYPE = LINK_TYPE.DOMAIN;

    position_3dtopo: [number, number, number] = [0, 0, 0];
    mesh_color: number = 0;
    mesh_emissive: number = 0;
    mesh_highlightcolor: number = 0;
    mesh: THREE.Mesh = null;
  
    constructor(_id: any, n: string, c: string, w: number, n1: GNObject2D, if1: string, n2: GNObject2D, if2: string, bw: string, tp: LINK_TYPE) {
      this.id = _id;
      this.name = n;
      this.color = c;
      this.width = w;
      this.node1 = n1;
      this.node1_if = if1;
      this.node2 = n2;
      this.node2_if = if2;
      this.bandwidth = bw;
      this.type = tp;
      this.mesh_color = (tp === LINK_TYPE.DOMAIN) ? CONSTANTS.LINK_DOMAIN[0] : CONSTANTS.LINK_BOUNDARY[0];
      this.mesh_emissive = (tp === LINK_TYPE.DOMAIN) ? CONSTANTS.LINK_DOMAIN[1] : CONSTANTS.LINK_BOUNDARY[1];
      this.mesh_highlightcolor = (tp === LINK_TYPE.DOMAIN) ? CONSTANTS.LINK_DOMAIN[2] : CONSTANTS.LINK_BOUNDARY[2];
    }

    setVisible(v: boolean) {
      if(this.node1.getVisible() && this.node2.getVisible()) {
        this.mesh.visible = v;
      } else {
        this.mesh.visible = false;
      }
    }

    get middlePosition2D(): [number, number] {
      return [(this.node1.position_2dtopo[0] + this.node2.position_2dtopo[0])/2, 
              (this.node1.position_2dtopo[1] + this.node2.position_2dtopo[1])/2];
    }

    generateHighlightedMesh(): THREE.Mesh {
      let A = new THREE.Vector3(this.node1.position_3dtopo[0], this.node1.position_3dtopo[1], this.node1.position_3dtopo[2]);
      let B = new THREE.Vector3(this.node2.position_3dtopo[0], this.node2.position_3dtopo[1], this.node2.position_3dtopo[2]);
      let vec = B.clone(); vec.sub(A);
      var h = vec.length();
      vec.normalize();
      let quaternion = new THREE.Quaternion();
      quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), vec);
      var geometry = new THREE.CylinderBufferGeometry(0.45, 0.45, h, 32);
      geometry.translate(0, h / 2, 0);
      let material14 = new THREE.MeshStandardMaterial({color: this.mesh_highlightcolor, emissive: this.mesh_emissive, roughness: 1, metalness: 1});
      let mesh = new THREE.Mesh(geometry, material14);
      mesh.applyQuaternion(quaternion);
      mesh.position.set(A.x, A.y, A.z);
      return mesh;
    }

    generateMesh(): THREE.Mesh {
      if(this.mesh != null) {
        this.mesh.geometry.dispose();
        (this.mesh.material as THREE.MeshStandardMaterial).dispose();
      }
      let A = new THREE.Vector3(this.node1.position_3dtopo[0], this.node1.position_3dtopo[1], this.node1.position_3dtopo[2]);
      let B = new THREE.Vector3(this.node2.position_3dtopo[0], this.node2.position_3dtopo[1], this.node2.position_3dtopo[2]);
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
      return this.mesh;
    }
  }
  
  export const G2DLOs: GLObject2D[] = [
    new GLObject2D ('globject2d1', 'qfx01-03', 'red', 3, G2DNOs[0], '48', G2DNOs[2], '49', '100Gbe', LINK_TYPE.DOMAIN),
    new GLObject2D ('globject2d2', 'qfx02-04', 'red', 3, G2DNOs[1], '48', G2DNOs[3], '49', '100Gbe', LINK_TYPE.DOMAIN),
    new GLObject2D ('globject2d3', 'qfx03-04', 'red', 3, G2DNOs[2], '48', G2DNOs[3], '48',  '40Gbe', LINK_TYPE.DOMAIN),
    new GLObject2D ('globject2d4', 'qfx03-04', 'red', 3, G2DNOs[2], '50', G2DNOs[3], '50',  '100Gbe', LINK_TYPE.DOMAIN),
    new GLObject2D ('globject2d5', 'site1-2', 'red', 3, G2DNOs[4], '1-5-1', G2DNOs[5], '1-5-1', 'OTU4', LINK_TYPE.DOMAIN),
    new GLObject2D ('globject2d6', 'site1-4', 'red', 3, G2DNOs[4], '1-6-2', G2DNOs[7], '1-6-2', 'OTU4', LINK_TYPE.DOMAIN),
    new GLObject2D ('globject2d7', 'site2-4', 'red', 3, G2DNOs[5], '1-6-1', G2DNOs[7], '1-6-1', 'OTU4', LINK_TYPE.DOMAIN),
    new GLObject2D ('globject2d8', 'site2-3', 'red', 3, G2DNOs[5], '1-6-2', G2DNOs[6], '1-6-2', 'OTU4', LINK_TYPE.DOMAIN),
    new GLObject2D ('globject2d9', 'site3-4', 'red', 3, G2DNOs[6], '1-5-1', G2DNOs[7], '1-5-1', 'OTU4', LINK_TYPE.DOMAIN),
    new GLObject2D ('globject2d10', 'poc01-02', 'red', 0.5, G2DNOs[15], 'N/A', G2DNOs[16], 'N/A', 'OCH', LINK_TYPE.DOMAIN),
    new GLObject2D ('globject2d11', 'poc01-03', 'red', 0.5, G2DNOs[15], 'N/A', G2DNOs[17], 'N/A', 'OCH', LINK_TYPE.DOMAIN),
    new GLObject2D ('globject2d12', 'poc02-03', 'red', 0.5, G2DNOs[16], 'N/A', G2DNOs[17], 'N/A', 'OCH', LINK_TYPE.DOMAIN),

    new GLObject2D ('globject2d13', 'qfx01-site1', 'red', 3, G2DNOs[0], '47', G2DNOs[4], '1-1-1', '10GbE', LINK_TYPE.BOUNDARY),
    new GLObject2D ('globject2d14', 'qfx01-poc01', 'red', 3, G2DNOs[0], '50', G2DNOs[15], '1-14-2', '100GbF', LINK_TYPE.BOUNDARY),
    new GLObject2D ('globject2d15', 'qfx02-site3', 'red', 3, G2DNOs[1], '47', G2DNOs[6], '1-1-1', '10GbE', LINK_TYPE.BOUNDARY),
    new GLObject2D ('globject2d16', 'qfx02-poc03', 'red', 3, G2DNOs[1], '50', G2DNOs[17], '1-14-2', '100GbE', LINK_TYPE.BOUNDARY),
    new GLObject2D ('globject2d17', 'site1-poc01', 'red', 3, G2DNOs[4], '1-6-1', G2DNOs[15], '1-12-1', 'OTU4', LINK_TYPE.BOUNDARY),
    new GLObject2D ('globject2d18', 'site3-poc03', 'red', 3, G2DNOs[6], '1-6-1', G2DNOs[17], '1-12-1', 'OTU4', LINK_TYPE.BOUNDARY),

    new GLObject2D ('globject2d19', 'site1-3', 'red', 3, G2DNOs[4], '1-1-2', G2DNOs[6], '1-1-2', '10GbE', LINK_TYPE.DOMAIN)
  ];