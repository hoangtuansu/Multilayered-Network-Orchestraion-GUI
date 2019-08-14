import * as THREE from 'three';
import { NObject2D } from '../object-interfaces';

export class GNObject2D implements NObject2D {
    id: number = 0;
    name: string = "";
    full_name: string = "";
    icon_url: string;
    size: [number, number];
    long_pos: [number, number];
  
    constructor(_id: number, n: string, fn: string, iu: string, s: [number, number], lp: [number, number]) {
      this.id = _id;
      this.name = n;
      this.full_name = fn;
      this.icon_url = iu;
      this.size = s;
      this.long_pos = lp;
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