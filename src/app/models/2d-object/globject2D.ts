import { NObject2D, LObject2D } from '../object-interfaces';
import { GNObject2D, G2DNOs } from './gnobject2D';

export class GLObject2D implements LObject2D {
    id: number = 0;
    name: string = "";
    node1: GNObject2D = null;
    node2: GNObject2D = null;
  
    constructor(_id: number, n: string, n1: GNObject2D, n2: GNObject2D) {
      this.id = _id;
      this.name = n;
      this.node1 = n1;
      this.node2 = n2;
    }
  }
  
  export const G2DLOs: GLObject2D[] = [
    new GLObject2D (1, 'cl1', G2DNOs[0], G2DNOs[1]),
    new GLObject2D (2, 'cl2', G2DNOs[1], G2DNOs[2]),
  ];
    