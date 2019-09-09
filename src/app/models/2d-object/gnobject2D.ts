import { NObject2D} from '../object-interfaces';
import { CONSTANTS, NODE_LEVEL } from '../constants';
import * as THREE from 'three';

export class GNObject2D implements NObject2D{
  id: any = 0;
  name: string = "";
  level: NODE_LEVEL;
  full_name: string = "";
  icon_url: string;
  icon_hover_url: string;
  icon_selected_url: string;
  icon_size: [number, number];
  position_2dtopo: [number, number];
  position_3dtopo: [number, number, number];
  interfaces: string[] = [];

  mesh_color: number = 0;
  mesh_emissive: number = 0;
  mesh: THREE.Mesh = null;

  constructor(_id: any, n: string, fn: string, l: NODE_LEVEL, p2: [number, number], ifs: string[]) {
    this.id = _id;
    this.name = n;
    this.full_name = fn;
    this.level = l;
    let a: any = (l == NODE_LEVEL.COUNTRY) ? CONSTANTS.COUNTRY_PAR : (l == NODE_LEVEL.STATE ? CONSTANTS.STATE_PAR : CONSTANTS.CITY_PAR);
    this.icon_url = a[0];
    this.icon_hover_url = a[1];
    this.icon_selected_url = a[2];
    this.icon_size = a[3];
    this.mesh_color = a[4];
    this.mesh_emissive = a[5];
    this.position_2dtopo = p2;
    this.position_3dtopo = [0, 0, 0];
    this.interfaces = ifs;
  }

  getInterfaces(): string {
    let str = '';
    for(let i in this.interfaces) {
      str += (i === '0' ? '' : '/') + this.interfaces[i]
    }
    return str;
  }

  update3DPosition(_p): void {
    this.position_3dtopo = _p;
    if(this.mesh != null)
      this.mesh.position.set(this.position_3dtopo[0], this.position_3dtopo[1], this.position_3dtopo[2]);
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
    this.mesh.position.set(this.position_3dtopo[0], this.position_3dtopo[1], this.position_3dtopo[2]);
    this.mesh.visible = false;
    return this.mesh;
  }
}

export const G2DNOs: GNObject2D[] = [
  new GNObject2D ('gnobject2d1', 'qfx1', 'EDTNLABQFX-01', NODE_LEVEL.COUNTRY, [-135, 65], ['1', '2', '3']),
  new GNObject2D ('gnobject2d2', 'qfx2', 'EDTNLABQFX-02', NODE_LEVEL.COUNTRY, [-118, 56], ['1', '2', '3']),
  new GNObject2D ('gnobject2d3', 'qfx4', 'EDTNLABQFX-04', NODE_LEVEL.COUNTRY, [-78, 60], ['1', '2', '3']),
  new GNObject2D ('gnobject2d4', 'fws1', 'FW9500-SITE1', NODE_LEVEL.STATE, [-140, 65], ['1', '2', '3']),
  new GNObject2D ('gnobject2d5', 'fws2', 'FW9500-SITE2', NODE_LEVEL.STATE, [-118, 54], ['1', '2', '3']),
  new GNObject2D ('gnobject2d6', 'fws3', 'FW9500-SITE3', NODE_LEVEL.STATE, [-109, 56], ['1', '2', '3']),
  new GNObject2D ('gnobject2d7', 'fws4', 'FW9500-SITE4', NODE_LEVEL.STATE, [-100, 59], ['1', '2', '3']),
  new GNObject2D ('gnobject2d8', 'fws5', 'FW9500-SITE5', NODE_LEVEL.STATE, [-128, 58], ['1', '2', '3']),
  new GNObject2D ('gnobject2d9', 'fws6', 'FW9500-SITE6', NODE_LEVEL.STATE, [-130, 69], ['1', '2', '3']),
  new GNObject2D ('gnobject2d10', 'tco', 'ThunderBay CO', NODE_LEVEL.STATE, [-90, 52], ['1', '2', '3']),
  new GNObject2D ('gnobject2d11', 'mco', 'Montreal CO', NODE_LEVEL.STATE, [-78, 50], ['1', '2', '3']),
  new GNObject2D ('gnobject2d12', 'lco', 'Laval CO', NODE_LEVEL.STATE, [-75, 57], ['1', '2', '3']),
  new GNObject2D ('gnobject2d13', 'rco', 'Rankin CO', NODE_LEVEL.STATE, [-100, 65], ['1', '2', '3']),
  new GNObject2D ('gnobject2d14', 'fco', 'Fort CO', NODE_LEVEL.STATE, [-115, 64], ['1', '2', '3']),
  new GNObject2D ('gnobject2d15', 'poc1', 'EDTNLABPOC-01', NODE_LEVEL.CITY, [-113, 55], ['1', '2', '3']),
  new GNObject2D ('gnobject2d16', 'poc2', 'EDTNLABPOC-02', NODE_LEVEL.CITY, [-117, 53], ['1', '2', '3']),
  new GNObject2D ('gnobject2d17', 'poc3', 'EDTNLABPOC-03', NODE_LEVEL.CITY, [-115, 59], ['1', '2', '3']),

  new GNObject2D ('gnobject2d18', 'qfx3', 'EDTNLABQFX-03', NODE_LEVEL.COUNTRY, [-98, 55], ['1', '2', '3']),
];

