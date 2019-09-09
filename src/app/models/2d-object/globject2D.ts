import { NObject2D, LObject2D} from '../object-interfaces';
import { GNObject2D, G2DNOs } from './gnobject2D';
import { LINK_TYPE } from '../constants';

export class GLObject2D implements LObject2D {
    id: any = 0;
    name: string = "";
    color: string = "";
    width: number = 1;
    node1: GNObject2D = null;
    node1_if: string = "";
    node2: GNObject2D = null;
    node2_if: string = "";
    bandwidth: number;
    type: LINK_TYPE = LINK_TYPE.DOMAIN;
  
    constructor(_id: any, n: string, c: string, w: number, n1: GNObject2D, if1: string, n2: GNObject2D, if2: string, bw: number, tp: LINK_TYPE) {
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
    new GLObject2D ('globject2d1', 'bdc-adc', 'red', 3, G2DNOs[0], '1', G2DNOs[1], '1', 400, LINK_TYPE.DOMAIN),
    new GLObject2D ('globject2d2', 'adc-odc', 'red', 3, G2DNOs[1], '1', G2DNOs[17], '2', 250, LINK_TYPE.DOMAIN),
    new GLObject2D ('globject2d3', 'vco-ico', 'red', 3, G2DNOs[3], '1', G2DNOs[8], '2',  200, LINK_TYPE.DOMAIN),
    new GLObject2D ('globject2d4', 'cl1', 'red', 2, G2DNOs[3], '1', G2DNOs[13], '2', 110, LINK_TYPE.DOMAIN),
    new GLObject2D ('globject2d5', 'cl2', 'red', 2, G2DNOs[9], '1', G2DNOs[11], '2', 100, LINK_TYPE.DOMAIN),
    new GLObject2D ('globject2d6', 'cl3', 'red', 2, G2DNOs[3], '1', G2DNOs[7], '2', 80, LINK_TYPE.DOMAIN),
    new GLObject2D ('globject2d7', 'cl4', 'red', 2, G2DNOs[12], '1', G2DNOs[13], '2', 70, LINK_TYPE.DOMAIN),
    new GLObject2D ('globject2d8', 'yco-ico', 'red', 2, G2DNOs[7], '1', G2DNOs[8], '2', 140, LINK_TYPE.DOMAIN),
    new GLObject2D ('globject2d9', 'cl5', 'red', 2, G2DNOs[7], '1', G2DNOs[4], '2', 100, LINK_TYPE.DOMAIN),
    new GLObject2D ('globject2d10', 'cl6', 'red', 2, G2DNOs[7], '1', G2DNOs[13], '2', 60, LINK_TYPE.DOMAIN),
    new GLObject2D ('globject2d11', 'cl7', 'red', 2, G2DNOs[7], '1', G2DNOs[5], '2', 110, LINK_TYPE.DOMAIN),
    new GLObject2D ('globject2d12', 'cl8', 'red', 2, G2DNOs[9], '1', G2DNOs[10], '2', 180, LINK_TYPE.DOMAIN),
    new GLObject2D ('globject2d13', 'cl9', 'red', 2, G2DNOs[4], '1', G2DNOs[5], '2', 150, LINK_TYPE.DOMAIN),
    new GLObject2D ('globject2d14', 'cl10', 'red', 2, G2DNOs[4], '1', G2DNOs[9], '2', 120, LINK_TYPE.DOMAIN),
    new GLObject2D ('globject2d15', 'cl11', 'red', 2, G2DNOs[6], '1', G2DNOs[12], '2', 100, LINK_TYPE.DOMAIN),
    new GLObject2D ('globject2d16', 'cl12', 'red', 2, G2DNOs[6], '1', G2DNOs[13], '2', 80, LINK_TYPE.DOMAIN),
    new GLObject2D ('globject2d17', 'cl13', 'red', 2, G2DNOs[6], '1', G2DNOs[9], '2', 80, LINK_TYPE.DOMAIN),
    new GLObject2D ('globject2d18', 'cl14', 'red', 2, G2DNOs[6], '1', G2DNOs[11], '2', 100, LINK_TYPE.DOMAIN),
    new GLObject2D ('globject2d19', 'cl15', '#ffff00', 1, G2DNOs[14], '1', G2DNOs[15], '2', 20, LINK_TYPE.DOMAIN),
    new GLObject2D ('globject2d20', 'cl16', '#ffff00', 1, G2DNOs[15], '1', G2DNOs[16], '2', 10, LINK_TYPE.DOMAIN),
    new GLObject2D ('globject2d21', 'cl17', '#ffff00', 1, G2DNOs[14], '1', G2DNOs[16], '2', 40, LINK_TYPE.DOMAIN),

    new GLObject2D ('globject2d22', 'bdc-ico', 'red', 2, G2DNOs[0], '1', G2DNOs[8], '2', 110, LINK_TYPE.BOUNDARY),
    new GLObject2D ('globject2d23', 'bdc-yco', 'red', 2, G2DNOs[0], '1', G2DNOs[3], '2', 300, LINK_TYPE.BOUNDARY),
    new GLObject2D ('globject2d24', 'bdc-vco', 'red', 2, G2DNOs[0], '1', G2DNOs[7], '2', 110, LINK_TYPE.BOUNDARY),
    new GLObject2D ('globject2d25', 'adc-vco', 'red', 2, G2DNOs[1], '1', G2DNOs[7], '2', 100, LINK_TYPE.BOUNDARY),
    new GLObject2D ('globject2d26', 'adc-fco', 'red', 2, G2DNOs[1], '1', G2DNOs[13], '2', 100, LINK_TYPE.BOUNDARY),
    new GLObject2D ('globject2d27', 'adc-cco', 'red', 2, G2DNOs[1], '1', G2DNOs[4], '2', 80, LINK_TYPE.BOUNDARY),
    new GLObject2D ('globject2d28', 'adc-sco', 'red', 2, G2DNOs[1], '1', G2DNOs[5], '2', 70, LINK_TYPE.BOUNDARY),
    new GLObject2D ('globject2d28', 'odc-sco', 'red', 2, G2DNOs[17], '1', G2DNOs[5], '2', 70, LINK_TYPE.BOUNDARY),
    new GLObject2D ('globject2d29', 'odc-chco', 'red', 2, G2DNOs[17], '1', G2DNOs[6], '2', 140, LINK_TYPE.BOUNDARY),
    new GLObject2D ('globject2d30', 'odc-rco', 'red', 2, G2DNOs[17], '1', G2DNOs[12], '2', 100, LINK_TYPE.BOUNDARY),
    new GLObject2D ('globject2d31', 'odc-tco', 'red', 2, G2DNOs[17], '1', G2DNOs[9], '2', 60, LINK_TYPE.BOUNDARY),

    new GLObject2D ('globject2d32', 'mdc-tco', 'red', 2, G2DNOs[2], '1', G2DNOs[9], '2', 60, LINK_TYPE.BOUNDARY),
    new GLObject2D ('globject2d33', 'mdc-mco', 'red', 2, G2DNOs[2], '1', G2DNOs[10], '2', 110, LINK_TYPE.BOUNDARY),
    new GLObject2D ('globject2d34', 'mdc-lco', 'red', 2, G2DNOs[2], '1', G2DNOs[11], '2', 180, LINK_TYPE.BOUNDARY),

    new GLObject2D ('globject2d35', 'cco-bbn', 'red', 2, G2DNOs[4], '1', G2DNOs[14], '2', 180, LINK_TYPE.BOUNDARY),
    new GLObject2D ('globject2d36', 'cco-edn', 'red', 2, G2DNOs[4], '1', G2DNOs[15], '2', 180, LINK_TYPE.BOUNDARY),
    new GLObject2D ('globject2d37', 'cco-can', 'red', 2, G2DNOs[4], '1', G2DNOs[16], '2', 180, LINK_TYPE.BOUNDARY),

    new GLObject2D ('globject2d38', 'odc-mdc', 'red', 3, G2DNOs[17], '1', G2DNOs[2], '2', 250, LINK_TYPE.DOMAIN),
    new GLObject2D ('globject2d39', 'bdc-mdc', 'red', 3, G2DNOs[0], '1', G2DNOs[2], '2', 250, LINK_TYPE.DOMAIN)

  ];