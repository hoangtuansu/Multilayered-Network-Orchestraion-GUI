export enum LAYER { WORLD, OPTICAL, LAYER1, IP }
export enum DISPLAY_MODE {D2 = 0, D3 = 1, ONGOING = 2, D2WORLD = 3}
export enum NODE_LEVEL {COUNTRY, STATE, CITY}
export enum LINK_TYPE {DOMAIN, BOUNDARY}

export interface Object {
    id: number;
    name: string;
  }
  
  export interface NPrObject extends Object {
    full_name: string;
  }
  
  export interface NObject extends Object{
    full_name: string;
    layer: LAYER;
    generateMesh(): THREE.Mesh;
  }
  export interface LObject extends Object{
    node1: NObject;
    node2: NObject;
    generateMesh(): THREE.Mesh;
  }

  export interface NObject2D extends Object {
    icon_url: string;
    size: [number, number],
    long_pos: [number, number]
  }

  export interface LObject2D extends Object{
    node1: NObject2D;
    node2: NObject2D;
  }