import { LObject2D} from '../object-interfaces';
import { GNObject2D} from './gnobject2D';
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
  latency: string;
  traffic_components: string[];
  bw_utilization_components: number[];
  type: LINK_TYPE = LINK_TYPE.DOMAIN;
  link_dash_or_solid: boolean = true; //true: solid, false: dash 

  position_3dtopo: [number, number, number] = [0, 0, 0];
  mesh_color: number = 0;
  mesh_emissive: number = 0;
  mesh_highlightcolor: number = 0;
  mesh: THREE.Mesh = null;
  group_meshes: THREE.Group = null;

  constructor(_id: any, n: string, c: string, w: number, n1: GNObject2D, if1: string, n2: GNObject2D, if2: string, bw: string, latency: string, tp: LINK_TYPE, buc: number[], tc: string[], ldos: boolean) {
    this.id = _id;
    this.name = n;
    this.color = c;
    this.width = w;
    this.node1 = n1;
    this.node1_if = if1;
    this.node2 = n2;
    this.node2_if = if2;
    this.bandwidth = bw;
    this.latency = latency;
    this.type = tp;
    this.mesh_color = (tp === LINK_TYPE.DOMAIN) ? CONSTANTS.LINK_DOMAIN[0] : CONSTANTS.LINK_BOUNDARY[0];
    this.mesh_emissive = (tp === LINK_TYPE.DOMAIN) ? CONSTANTS.LINK_DOMAIN[1] : CONSTANTS.LINK_BOUNDARY[1];
    this.mesh_highlightcolor = (tp === LINK_TYPE.DOMAIN) ? CONSTANTS.LINK_DOMAIN[2] : CONSTANTS.LINK_BOUNDARY[2];
    this.traffic_components = tc;
    this.bw_utilization_components = buc;
    this.group_meshes = new THREE.Group();
    this.link_dash_or_solid = ldos;
  }

  get visibility() {
    return this.node1.visibility && this.node2.visibility;
  }

  set visibility(v: boolean) {
    if(this.node1.visibility && this.node2.visibility) {
      this.group_meshes.visible = v;
    } else {
      this.group_meshes.visible = false;
    }
  }

  get middlePosition2D(): [number, number] {
    return [(this.node1.position_2dtopo[0] + this.node2.position_2dtopo[0])/2, 
            (this.node1.position_2dtopo[1] + this.node2.position_2dtopo[1])/2];
  }

  generateMesh(): THREE.Group {
    if(this.group_meshes.children.length > 0) {
      for(let i = this.group_meshes.children.length - 1; i >= 0; i--) {
        let m = (this.group_meshes.children[i] as THREE.Mesh);
        m.geometry.dispose();
        (m.material as THREE.MeshStandardMaterial).dispose();
      }
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

    this.group_meshes.name = this.name;
    this.group_meshes.add(this.mesh);
    return this.group_meshes;
  }
}

export class GHighlightedLinkOBJ extends GLinkOBJ {
  arrow_mesh: THREE.Mesh = null;
  dir: boolean = true;  //to control the direction of arrow_mesh, true: node1 -> node2, false: node2 -> node1
  constructor(l: GLinkOBJ, d?: boolean) {
    super(l.id, l.name, l.color, l.width, l.node1, l.node1_if, l.node2, l.node2_if, l.bandwidth, l.latency, l.type, l.bw_utilization_components, l.traffic_components, l.link_dash_or_solid);
    this.dir = d;
  }

  generateMesh(): THREE.Group {
    let A = new THREE.Vector3(this.node1.position_3dtopo[0], this.node1.position_3dtopo[1], this.node1.position_3dtopo[2]);
    let B = new THREE.Vector3(this.node2.position_3dtopo[0], this.node2.position_3dtopo[1], this.node2.position_3dtopo[2]);
    if(!this.dir) {
      B = new THREE.Vector3(this.node1.position_3dtopo[0], this.node1.position_3dtopo[1], this.node1.position_3dtopo[2]);
      A = new THREE.Vector3(this.node2.position_3dtopo[0], this.node2.position_3dtopo[1], this.node2.position_3dtopo[2]);
    }
    let vec = A.clone(); vec.sub(B);
    var h = vec.length();
    vec.normalize();
    let quaternion = new THREE.Quaternion();
    quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), vec);
    var geometry = new THREE.CylinderBufferGeometry(0.25, 0.25, h, 32);
    geometry.translate(0, h / 2, 0);
    let material14 = new THREE.MeshStandardMaterial({color: this.mesh_highlightcolor, emissive: this.mesh_emissive, roughness: 1, metalness: 1});
    this.mesh = new THREE.Mesh(geometry, material14);
    this.mesh.applyQuaternion(quaternion);
    this.mesh.position.set(B.x, B.y, B.z);

    let arrow_geo = new THREE.ConeBufferGeometry(1, 2.5, 10);
    let material15 = new THREE.MeshStandardMaterial({color: 0xffff00, emissive: 0xffff00, roughness: 1, metalness: 1});
    arrow_geo.translate(0, h/3, 0);
    this.arrow_mesh = new THREE.Mesh(arrow_geo, material15);
    this.arrow_mesh.applyQuaternion(quaternion);
    this.arrow_mesh.position.set(B.x, B.y, B.z);

    let g = new THREE.Group();
    g.name = CONSTANTS.HIGHLIGHTED_LINK_PREFIX;
    g.add(this.mesh);
    g.add(this.arrow_mesh);
    return g;
  }
}