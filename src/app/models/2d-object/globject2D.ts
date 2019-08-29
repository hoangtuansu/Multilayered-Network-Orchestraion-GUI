import { NObject2D, LObject2D } from '../object-interfaces';
import { GNObject2D, G2DNOs } from './gnobject2D';

export class GLObject2D implements LObject2D {
    id: any = 0;
    name: string = "";
    color: string = "";
    width: number = 1;
    node1: GNObject2D = null;
    node2: GNObject2D = null;
    bandwidth: string;
  
    constructor(_id: any, n: string, c: string, w: number, n1: GNObject2D, n2: GNObject2D, bw: string) {
      this.id = _id;
      this.name = n;
      this.color = c;
      this.width = w;
      this.node1 = n1;
      this.node2 = n2;
      this.bandwidth = bw;
    }
  }
  
  export const G2DLOs: GLObject2D[] = [
    new GLObject2D ('globject2d1', 'bdc-adc', 'red', 3, G2DNOs[0], G2DNOs[1], "400Gbps"),
    new GLObject2D ('globject2d2', 'adc-mdc', 'red', 3, G2DNOs[1], G2DNOs[2], "250Gbps"),
    new GLObject2D ('globject2d3', 'vco-ico', 'red', 3, G2DNOs[3], G2DNOs[8], "300Gbps"),
    new GLObject2D ('globject2d4', 'cl3', 'white', 2, G2DNOs[3], G2DNOs[13], "110Gbps"),
    new GLObject2D ('globject2d5', 'cl3', 'white', 2, G2DNOs[9], G2DNOs[11], "100Gbps"),
    new GLObject2D ('globject2d6', 'cl3', 'white', 2, G2DNOs[3], G2DNOs[7], "80Gbps"),
    new GLObject2D ('globject2d7', 'cl3', 'white', 2, G2DNOs[12], G2DNOs[13], "70Gbps"),
    new GLObject2D ('globject2d8', 'yco-ico', 'white', 2, G2DNOs[7], G2DNOs[8], "140Gbps"),
    new GLObject2D ('globject2d9', 'cl3', 'white', 2, G2DNOs[7], G2DNOs[4], "100Gbps"),
    new GLObject2D ('globject2d10', 'cl3', 'white', 2, G2DNOs[7], G2DNOs[13], "60Gbps"),
    new GLObject2D ('globject2d11', 'cl3', 'white', 2, G2DNOs[7], G2DNOs[5], "110Gbps"),
    new GLObject2D ('globject2d12', 'cl3', 'white', 2, G2DNOs[9], G2DNOs[10], "180Gbps"),
    new GLObject2D ('globject2d13', 'cl3', 'white', 2, G2DNOs[4], G2DNOs[5], "150Gbps"),
    new GLObject2D ('globject2d14', 'cl3', 'white', 2, G2DNOs[4], G2DNOs[9], "120Gbps"),
    new GLObject2D ('globject2d15', 'cl3', 'white', 2, G2DNOs[6], G2DNOs[12], "100Gbps"),
    new GLObject2D ('globject2d16', 'cl3', 'white', 2, G2DNOs[6], G2DNOs[13], "80Gbps"),
    new GLObject2D ('globject2d17', 'cl3', 'white', 2, G2DNOs[6], G2DNOs[9], "80Gbps"),
    new GLObject2D ('globject2d18', 'cl3', 'white', 2, G2DNOs[6], G2DNOs[11], "100Gbps"),
    new GLObject2D ('globject2d19', 'cl3', '#ffff00', 1, G2DNOs[14], G2DNOs[15], "20Gbps"),
    new GLObject2D ('globject2d20', 'cl3', '#ffff00', 1, G2DNOs[15], G2DNOs[16], "10Gbps"),
    new GLObject2D ('globject2d21', 'cl3', '#ffff00', 1, G2DNOs[14], G2DNOs[16], "40Gbps")
  ];
    