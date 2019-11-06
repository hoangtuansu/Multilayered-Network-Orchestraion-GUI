import { NObject2D, NPrObject} from '../object-interfaces';
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

  mesh_text: THREE.Mesh = null;
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

    new THREE.FontLoader().load( 'assets/fonts/optimer_bold.typeface.json', font => {
      let textGeom = new THREE.TextGeometry( this.name, { size: 0.75, height: 0, curveSegments: 3, font: font}),
          textMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff} );
      this.mesh_text = new THREE.Mesh(textGeom, textMaterial );
      this.mesh_text.rotation.set(this.level == NODE_LEVEL.CITY ? -Math.PI/4 : -Math.PI/2, 0, 0);
      this.mesh_text.position.set(this.position_3dtopo[0] - 1, this.position_3dtopo[1] + 0.75, this.position_3dtopo[2] + 0.25);
    } );

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
    if(this.mesh != null) {
      this.mesh.position.set(this.position_3dtopo[0], this.position_3dtopo[1], this.position_3dtopo[2]);
    }
      
    if(this.mesh_text != null)
      if(this.level == NODE_LEVEL.CITY) {
        this.mesh_text.position.set(this.position_3dtopo[0] - 1, this.position_3dtopo[1] + 1.75, this.position_3dtopo[2] + 1.25);
      } else {
        this.mesh_text.position.set(this.position_3dtopo[0] - 1, this.position_3dtopo[1] + 0.75, this.position_3dtopo[2] + 0.25);
      }
      
  }

  get visibility(): boolean {
    return this.mesh.visible && this.mesh_text.visible;
  }

  set visibility(v: boolean) {
    this.mesh.visible = v;
    this.mesh_text.visible = v;
  }

  generateMesh(): THREE.Group {
    let geometry11 = null;
    let g: THREE.Group = new THREE.Group();
    switch(this.level) {
      case NODE_LEVEL.COUNTRY:
        geometry11 = new THREE.CylinderBufferGeometry(1.5, 1.5, 1, 32);
        break;
      case NODE_LEVEL.STATE:
        geometry11 = new THREE.BoxBufferGeometry(3, 1, 3);
        break;
      case NODE_LEVEL.CITY:
        geometry11 = new THREE.OctahedronGeometry( 2 );
        break;
    }

    let material11 = new THREE.MeshStandardMaterial({color: this.mesh_color, emissive: this.mesh_emissive, roughness: 0.5, metalness: 0.5});
    this.mesh = new THREE.Mesh(geometry11, material11);
    this.mesh.name = this.name;
    this.mesh.position.set(this.position_3dtopo[0], this.position_3dtopo[1], this.position_3dtopo[2]);
    g.add(this.mesh);
    g.add(this.mesh_text);
    g.name = this.name;
    return g;
  }
}

export interface PathStruct {
  name: string;
  nodes: GNObject2D[];
  capacity: string;
}