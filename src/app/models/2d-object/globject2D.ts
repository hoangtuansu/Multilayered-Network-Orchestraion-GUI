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
    new GLObject2D (3, 'cl3', G2DNOs[3], G2DNOs[8]),
    new GLObject2D (4, 'cl3', G2DNOs[3], G2DNOs[13]),
    new GLObject2D (5, 'cl3', G2DNOs[9], G2DNOs[11]),
    new GLObject2D (6, 'cl3', G2DNOs[3], G2DNOs[7]),
    new GLObject2D (7, 'cl3', G2DNOs[12], G2DNOs[13]),
    new GLObject2D (8, 'cl3', G2DNOs[7], G2DNOs[8]),
    new GLObject2D (9, 'cl3', G2DNOs[7], G2DNOs[4]),
    new GLObject2D (10, 'cl3', G2DNOs[7], G2DNOs[13]),
    new GLObject2D (11, 'cl3', G2DNOs[7], G2DNOs[5]),
    new GLObject2D (12, 'cl3', G2DNOs[9], G2DNOs[10]),
    new GLObject2D (13, 'cl3', G2DNOs[4], G2DNOs[5]),
    new GLObject2D (14, 'cl3', G2DNOs[4], G2DNOs[9]),
    new GLObject2D (15, 'cl3', G2DNOs[6], G2DNOs[12]),
    new GLObject2D (16, 'cl3', G2DNOs[6], G2DNOs[13]),
    new GLObject2D (17, 'cl3', G2DNOs[6], G2DNOs[9]),
    new GLObject2D (18, 'cl3', G2DNOs[6], G2DNOs[11])
  ];
    