import { NObject2D, LObject2D, LINK_TYPE } from '../object-interfaces';
import { GNObject2D, G2DNOs } from './gnobject2D';

export class GLObject2D implements LObject2D {
    id: any = 0;
    name: string = "";
    color: string = "";
    width: number = 1;
    node1: GNObject2D = null;
    node1_if: string = "";
    node2: GNObject2D = null;
    node2_if: string = "";
    bandwidth: string;
    type: LINK_TYPE = LINK_TYPE.DOMAIN;
  
    constructor(_id: any, n: string, c: string, w: number, n1: GNObject2D, if1: string, n2: GNObject2D, if2: string, bw: string, tp: LINK_TYPE) {
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
    }
  }
  
  export const G2DLOs: GLObject2D[] = [
    new GLObject2D ('globject2d1', 'bdc-adc', 'red', 3, G2DNOs[0], '/1', G2DNOs[1], '/1', '400Gbps', LINK_TYPE.DOMAIN),
    new GLObject2D ('globject2d2', 'adc-mdc', 'red', 3, G2DNOs[1], '/1', G2DNOs[2], '/2', '250Gbps', LINK_TYPE.DOMAIN),
    new GLObject2D ('globject2d3', 'vco-ico', 'red', 3, G2DNOs[3], '/1', G2DNOs[8], '/2',  '200Gbps', LINK_TYPE.DOMAIN),
    new GLObject2D ('globject2d4', 'cl1', 'white', 2, G2DNOs[3], '/1', G2DNOs[13], '/2', '110Gbps', LINK_TYPE.DOMAIN),
    new GLObject2D ('globject2d5', 'cl2', 'white', 2, G2DNOs[9], '/1', G2DNOs[11], '/2', '100Gbps', LINK_TYPE.DOMAIN),
    new GLObject2D ('globject2d6', 'cl3', 'white', 2, G2DNOs[3], '/1', G2DNOs[7], '/2', '80Gbps', LINK_TYPE.DOMAIN),
    new GLObject2D ('globject2d7', 'cl4', 'white', 2, G2DNOs[12], '/1', G2DNOs[13], '/2', '70Gbps', LINK_TYPE.DOMAIN),
    new GLObject2D ('globject2d8', 'yco-ico', 'white', 2, G2DNOs[7], '/1', G2DNOs[8], '/2', '140Gbps', LINK_TYPE.DOMAIN),
    new GLObject2D ('globject2d9', 'cl5', 'white', 2, G2DNOs[7], '/1', G2DNOs[4], '/2', '100Gbps', LINK_TYPE.DOMAIN),
    new GLObject2D ('globject2d10', 'cl6', 'white', 2, G2DNOs[7], '/1', G2DNOs[13], '/2', '60Gbps', LINK_TYPE.DOMAIN),
    new GLObject2D ('globject2d11', 'cl7', 'white', 2, G2DNOs[7], '/1', G2DNOs[5], '/2', '110Gbps', LINK_TYPE.DOMAIN),
    new GLObject2D ('globject2d12', 'cl8', 'white', 2, G2DNOs[9], '/1', G2DNOs[10], '/2', '180Gbps', LINK_TYPE.DOMAIN),
    new GLObject2D ('globject2d13', 'cl9', 'white', 2, G2DNOs[4], '/1', G2DNOs[5], '/2', '150Gbps', LINK_TYPE.DOMAIN),
    new GLObject2D ('globject2d14', 'cl10', 'white', 2, G2DNOs[4], '/1', G2DNOs[9], '/2', '120Gbps', LINK_TYPE.DOMAIN),
    new GLObject2D ('globject2d15', 'cl11', 'white', 2, G2DNOs[6], '/1', G2DNOs[12], '/2', '100Gbps', LINK_TYPE.DOMAIN),
    new GLObject2D ('globject2d16', 'cl12', 'white', 2, G2DNOs[6], '/1', G2DNOs[13], '/2', '80Gbps', LINK_TYPE.DOMAIN),
    new GLObject2D ('globject2d17', 'cl13', 'white', 2, G2DNOs[6], '/1', G2DNOs[9], '/2', '80Gbps', LINK_TYPE.DOMAIN),
    new GLObject2D ('globject2d18', 'cl14', 'white', 2, G2DNOs[6], '/1', G2DNOs[11], '/2', '100Gbps', LINK_TYPE.DOMAIN),
    new GLObject2D ('globject2d19', 'cl15', '#ffff00', 1, G2DNOs[14], '/1', G2DNOs[15], '/2', '20Gbps', LINK_TYPE.DOMAIN),
    new GLObject2D ('globject2d20', 'cl16', '#ffff00', 1, G2DNOs[15], '/1', G2DNOs[16], '/2', '10Gbps', LINK_TYPE.DOMAIN),
    new GLObject2D ('globject2d21', 'cl17', '#ffff00', 1, G2DNOs[14], '/1', G2DNOs[16], '/2', '40Gbps', LINK_TYPE.DOMAIN),

    new GLObject2D ('globject2d22', 'bdc-ico', 'white', 2, G2DNOs[0], '/1', G2DNOs[8], '/2', '110Gbps', LINK_TYPE.BOUNDARY),
    new GLObject2D ('globject2d23', 'bdc-yco', 'red', 2, G2DNOs[0], '/1', G2DNOs[3], '/2', '300Gbps', LINK_TYPE.BOUNDARY),
    new GLObject2D ('globject2d24', 'bdc-vco', 'white', 2, G2DNOs[0], '/1', G2DNOs[7], '/2', '110Gbps', LINK_TYPE.BOUNDARY),
    new GLObject2D ('globject2d25', 'adc-fco', 'white', 2, G2DNOs[1], '/1', G2DNOs[13], '/2', '100Gbps', LINK_TYPE.BOUNDARY),
    new GLObject2D ('globject2d26', 'adc-cco', 'white', 2, G2DNOs[1], '/1', G2DNOs[4], '/2', '80Gbps', LINK_TYPE.BOUNDARY),
    new GLObject2D ('globject2d27', 'adc-sco', 'white', 2, G2DNOs[1], '/1', G2DNOs[5], '/2', '70Gbps', LINK_TYPE.BOUNDARY),
    new GLObject2D ('globject2d28', 'adc-chco', 'white', 2, G2DNOs[1], '/1', G2DNOs[6], '/2', '140Gbps', LINK_TYPE.BOUNDARY),
    new GLObject2D ('globject2d29', 'adc-rco', 'white', 2, G2DNOs[1], '/1', G2DNOs[12], '/2', '100Gbps', LINK_TYPE.BOUNDARY),

    new GLObject2D ('globject2d30', 'mdc-tco', 'white', 2, G2DNOs[2], '/1', G2DNOs[9], '/2', '60Gbps', LINK_TYPE.BOUNDARY),
    new GLObject2D ('globject2d31', 'mdc-mco', 'white', 2, G2DNOs[2], '/1', G2DNOs[10], '/2', '110Gbps', LINK_TYPE.BOUNDARY),
    new GLObject2D ('globject2d32', 'mdc-lco', 'white', 2, G2DNOs[2], '/1', G2DNOs[11], '/2', '180Gbps', LINK_TYPE.BOUNDARY)

  ];