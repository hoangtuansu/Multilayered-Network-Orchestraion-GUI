import { LObject2D} from '../object-interfaces';
import { GNObject2D, G2DNOs } from './gnobject2D';
import { LINK_TYPE, CONSTANTS } from '../constants';
import * as THREE from 'three';

export class GLinkOBJ implements LObject2D {
    id: any = 0;
    name: string = "";
    color: string = "";
    width: number = 1;
    node1: GNObject2D = null;
    node1_if: string = "";
    node2: GNObject2D = null;
    node2_if: string = "";
    bandwidth: string;
    traffic_components: string[];
    bw_utilization_components: number[];
    type: LINK_TYPE = LINK_TYPE.DOMAIN;

    position_3dtopo: [number, number, number] = [0, 0, 0];
    mesh_color: number = 0;
    mesh_emissive: number = 0;
    mesh_highlightcolor: number = 0;
    mesh: THREE.Mesh = null;

    constructor(_id: any, n: string, c: string, w: number, n1: GNObject2D, if1: string, n2: GNObject2D, if2: string, bw: string, tp: LINK_TYPE, buc: number[], tc: string[]) {
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
      this.traffic_components = tc;
      this.bw_utilization_components = buc;
    }

    get visibility() {
      return this.node1.visibility && this.node2.visibility;
    }

    set visibility(v: boolean) {
      if(this.node1.visibility && this.node2.visibility) {
        this.mesh.visible = v;
      } else {
        this.mesh.visible = false;
      }
    }

    get middlePosition2D(): [number, number] {
      return [(this.node1.position_2dtopo[0] + this.node2.position_2dtopo[0])/2, 
              (this.node1.position_2dtopo[1] + this.node2.position_2dtopo[1])/2];
    }

    generateMesh(): THREE.Group {
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
      var geometry = new THREE.CylinderBufferGeometry(0.15, 0.15, h, 32);
      geometry.translate(0, h / 2, 0);
      let material14 = new THREE.MeshStandardMaterial({color: this.mesh_color, emissive: this.mesh_emissive, roughness: 1, metalness: 1});
      this.mesh = new THREE.Mesh(geometry, material14);
      this.mesh.applyQuaternion(quaternion);
      this.mesh.position.set(A.x, A.y, A.z);

      let g = new THREE.Group();
      g.add(this.mesh);
      return g;
    }
  }
  
  export const G2DLOs: GLinkOBJ[] = [
    new GLinkOBJ ('GLinkOBJ1', 'QFX1-3', 'red', 3, G2DNOs[0], '48', G2DNOs[2], '49', '100Gbe', LINK_TYPE.DOMAIN, [60, 40], ["IP", "Unused"]),
    new GLinkOBJ ('GLinkOBJ2', 'QFX2-4', 'red', 3, G2DNOs[1], '48', G2DNOs[3], '49', '100Gbe', LINK_TYPE.DOMAIN,[30, 70], ["IP", "Unused"]),
    new GLinkOBJ ('GLinkOBJ3', 'QFX3-4', 'red', 3, G2DNOs[2], '48', G2DNOs[3], '48',  '40Gbe', LINK_TYPE.DOMAIN, [20, 80], ["IP", "Unused"]),
    new GLinkOBJ ('GLinkOBJ4', 'QFX3-4', 'red', 3, G2DNOs[2], '50', G2DNOs[3], '50',  '100Gbe', LINK_TYPE.DOMAIN, [90, 10], ["IP", "Unused"]),
    new GLinkOBJ ('GLinkOBJ5', 'SITE1-2', 'red', 3, G2DNOs[4], '1-5-1', G2DNOs[5], '1-5-1', 'OTU4', LINK_TYPE.DOMAIN, [], []),
    new GLinkOBJ ('GLinkOBJ6', 'SITE1-4', 'red', 3, G2DNOs[4], '1-6-2', G2DNOs[7], '1-6-2', 'OTU4', LINK_TYPE.DOMAIN, [], []),
    new GLinkOBJ ('GLinkOBJ7', 'SITE2-4', 'red', 3, G2DNOs[5], '1-6-1', G2DNOs[7], '1-6-1', 'OTU4', LINK_TYPE.DOMAIN, [], []),
    new GLinkOBJ ('GLinkOBJ8', 'SITE2-3', 'red', 3, G2DNOs[5], '1-6-2', G2DNOs[6], '1-6-2', 'OTU4', LINK_TYPE.DOMAIN, [], []),
    new GLinkOBJ ('GLinkOBJ9', 'SITE3-4', 'red', 3, G2DNOs[6], '1-5-1', G2DNOs[7], '1-5-1', 'OTU4', LINK_TYPE.DOMAIN, [], []),
    new GLinkOBJ ('GLinkOBJ10', 'POC1-2', 'red', 0.5, G2DNOs[15], 'N/A', G2DNOs[16], 'N/A', 'OCH', LINK_TYPE.DOMAIN, [], []),
    new GLinkOBJ ('GLinkOBJ11', 'POC1-3', 'red', 0.5, G2DNOs[15], 'N/A', G2DNOs[17], 'N/A', 'OCH', LINK_TYPE.DOMAIN, [], []),
    new GLinkOBJ ('GLinkOBJ12', 'POC2-3', 'red', 0.5, G2DNOs[16], 'N/A', G2DNOs[17], 'N/A', 'OCH', LINK_TYPE.DOMAIN, [], []),

    new GLinkOBJ ('GLinkOBJ13', 'QFX1-SITE1', 'red', 3, G2DNOs[0], '47', G2DNOs[4], '1-1-1', '10GbE', LINK_TYPE.BOUNDARY, [], []),
    new GLinkOBJ ('GLinkOBJ14', 'QFX1-POC1', 'red', 3, G2DNOs[0], '50', G2DNOs[15], '1-14-2', '100GbF', LINK_TYPE.BOUNDARY, [], []),
    new GLinkOBJ ('GLinkOBJ15', 'QFX2-SITE3', 'red', 3, G2DNOs[1], '47', G2DNOs[6], '1-1-1', '10GbE', LINK_TYPE.BOUNDARY, [], []),
    new GLinkOBJ ('GLinkOBJ16', 'QFX2-POC3', 'red', 3, G2DNOs[1], '50', G2DNOs[17], '1-14-2', '100GbE', LINK_TYPE.BOUNDARY, [], []),
    new GLinkOBJ ('GLinkOBJ17', 'SITE1-POC1', 'red', 3, G2DNOs[4], '1-6-1', G2DNOs[15], '1-12-1', 'OTU4', LINK_TYPE.BOUNDARY, [], []),
    new GLinkOBJ ('GLinkOBJ18', 'SITE3-POC3', 'red', 3, G2DNOs[6], '1-6-1', G2DNOs[17], '1-12-1', 'OTU4', LINK_TYPE.BOUNDARY, [], []),

    new GLinkOBJ ('GLinkOBJ19', 'SITE1-3', 'red', 3, G2DNOs[4], '1-1-2', G2DNOs[6], '1-1-2', '10GbE', LINK_TYPE.DOMAIN, [], [])
  ];

  export class GHighlightedLinkOBJ extends GLinkOBJ {
    arrow_mesh: THREE.Mesh = null;

    constructor(l: GLinkOBJ) {
      super(l.id, l.name, l.color, l.width, l.node1, l.node1_if, l.node2, l.node2_if, l.bandwidth, l.type, l.bw_utilization_components, l.traffic_components);
    }

    generateMesh(): THREE.Group {
      let A = new THREE.Vector3(this.node1.position_3dtopo[0], this.node1.position_3dtopo[1], this.node1.position_3dtopo[2]);
      let B = new THREE.Vector3(this.node2.position_3dtopo[0], this.node2.position_3dtopo[1], this.node2.position_3dtopo[2]);
      let vec = B.clone(); vec.sub(A);
      var h = vec.length();
      vec.normalize();
      let quaternion = new THREE.Quaternion();
      quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), vec);
      var geometry = new THREE.CylinderBufferGeometry(0.25, 0.25, h, 32);
      geometry.translate(0, h / 2, 0);
      let material14 = new THREE.MeshStandardMaterial({color: this.mesh_highlightcolor, emissive: this.mesh_emissive, roughness: 1, metalness: 1});
      this.mesh = new THREE.Mesh(geometry, material14);
      this.mesh.applyQuaternion(quaternion);
      this.mesh.position.set(A.x, A.y, A.z);

      let arrow_geo = new THREE.ConeBufferGeometry(1, 2.5, 10);
      arrow_geo.translate(0, h/3, 0);
      this.arrow_mesh = new THREE.Mesh(arrow_geo, material14);
      this.arrow_mesh.applyQuaternion(quaternion);
      this.arrow_mesh.position.set(A.x, A.y, A.z);

      let g = new THREE.Group();
      g.name = CONSTANTS.HIGHLIGHTED_LINK_PREFIX;
      g.add(this.mesh);
      g.add(this.arrow_mesh);
      return g;
    }
  }