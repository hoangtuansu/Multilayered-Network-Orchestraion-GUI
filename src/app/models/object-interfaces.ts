import { LAYER } from './constants';

export interface Object {
  id: any;
  name: string;
}

export interface NPrObject extends Object {
  full_name: string;
}

export interface NObject extends Object{
  full_name: string;
  layer: LAYER;
  generateMesh(): THREE.Group;
}
export interface LObject extends Object{
  node1: NObject;
  node2: NObject;
  generateMesh(): THREE.Group;
}

export interface NObject2D extends Object {
  icon_url: string;
  icon_size: [number, number],
  position_2dtopo: [number, number]
  position_3dtopo: [number, number, number]
}

export interface LObject2D extends Object{
  node1: NObject2D;
  node2: NObject2D;
}