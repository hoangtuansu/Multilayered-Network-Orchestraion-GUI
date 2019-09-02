import { NObject2D, NODE_LEVEL } from '../object-interfaces';

const assets_path = 'assets/images/';

export class GNObject2D implements NObject2D {
  id: any = 0;
  name: string = "";
  level: NODE_LEVEL;
  full_name: string = "";
  icon_url: string;
  icon_hover_url: string;
  icon_selected_url: string;
  size: [number, number];
  long_pos: [number, number];
  interfaces: string[] = [];

  constructor(_id: any, n: string, fn: string, l: NODE_LEVEL, iu: string, ihu: string, isu: string, s: [number, number], lp: [number, number], ifs: string[]) {
    this.id = _id;
    this.name = n;
    this.full_name = fn;
    this.level = l;
    this.icon_url = iu;
    this.icon_hover_url = ihu;
    this.icon_selected_url = isu;
    this.size = s;
    this.long_pos = lp;
    this.interfaces = ifs;
  }
}

export const G2DNOs: GNObject2D[] = [
  new GNObject2D ('gnobject2d1', 'bdc', 'Bristish DC', NODE_LEVEL.COUNTRY, 
  assets_path + 'world-data-center.png', 
  assets_path + 'world-data-center-hover.png',
  assets_path + 'world-data-center-selected.png', 
  [45, 45], [-135, 65], ['/1', '/2', '3']),
  new GNObject2D ('gnobject2d2', 'adc', 'Alberta DC', NODE_LEVEL.COUNTRY, 
  assets_path + 'world-data-center.png', 
  assets_path + 'world-data-center-hover.png', 
  assets_path + 'world-data-center-selected.png', [45, 45], [-115, 60], ['/1', '/2', '3']),
  new GNObject2D ('gnobject2d3', 'mdc', 'Montreal DC', NODE_LEVEL.COUNTRY, 
  assets_path + 'world-data-center.png', 
  assets_path + 'world-data-center-hover.png', 
  assets_path + 'world-data-center-selected.png', [45, 45], [-78, 60], ['/1', '/2', '3']),
  new GNObject2D ('gnobject2d4', 'yco', 'Yukon CO', NODE_LEVEL.STATE, 
  assets_path + 'country-switch.png', 
  assets_path + 'country-switch-hover.png', 
  assets_path + 'country-switch-selected.png', [15, 15], [-140, 65], ['/1', '/2', '3']),
  new GNObject2D ('gnobject2d5', 'cco', 'Calgary CO', NODE_LEVEL.STATE, 
  assets_path + 'country-switch.png', 
  assets_path + 'country-switch-hover.png', 
  assets_path + 'country-switch-selected.png', [15, 15], [-118, 54], ['/1', '/2', '3']),
  new GNObject2D ('gnobject2d6', 'sco', 'Saskatoon CO', NODE_LEVEL.STATE, 
  assets_path + 'country-switch.png', 
  assets_path + 'country-switch-hover.png', 
  assets_path + 'country-switch-selected.png', [15, 15], [-109, 56], ['/1', '/2', '3']),
  new GNObject2D ('gnobject2d7', 'chco', 'Churchill CO', NODE_LEVEL.STATE, 
  assets_path + 'country-switch.png', 
  assets_path + 'country-switch-hover.png', 
  assets_path + 'country-switch-selected.png', [15, 15], [-100, 59], ['/1', '/2', '3']),
  new GNObject2D ('gnobject2d8', 'vco', 'Vancouver CO', NODE_LEVEL.STATE, 
  assets_path + 'country-switch.png', 
  assets_path + 'country-switch-hover.png', 
  assets_path + 'country-switch-selected.png', [15, 15], [-128, 58], ['/1', '/2', '3']),
  new GNObject2D ('gnobject2d9', 'ico', 'Inuvik CO', NODE_LEVEL.STATE, 
  assets_path + 'country-switch.png', 
  assets_path + 'country-switch-hover.png', 
  assets_path + 'country-switch-selected.png', [15, 15], [-130, 69], ['/1', '/2', '3']),
  new GNObject2D ('gnobject2d10', 'tco', 'ThunderBay CO', NODE_LEVEL.STATE, 
  assets_path + 'country-switch.png', 
  assets_path + 'country-switch-hover.png', 
  assets_path + 'country-switch-selected.png', [15, 15], [-90, 52], ['/1', '/2', '3']),
  new GNObject2D ('gnobject2d11', 'mco', 'Montreal CO', NODE_LEVEL.STATE, 
  assets_path + 'country-switch.png', 
  assets_path + 'country-switch-hover.png', 
  assets_path + 'country-switch-selected.png', [15, 15], [-78, 50], ['/1', '/2', '3']),
  new GNObject2D ('gnobject2d12', 'lco', 'Laval CO', NODE_LEVEL.STATE, 
  assets_path + 'country-switch.png', 
  assets_path + 'country-switch-hover.png', 
  assets_path + 'country-switch-selected.png', [15, 15], [-75, 57], ['/1', '/2', '3']),
  new GNObject2D ('gnobject2d13', 'rco', 'Rankin CO', NODE_LEVEL.STATE, 
  assets_path + 'country-switch.png', 
  assets_path + 'country-switch-hover.png', 
  assets_path + 'country-switch-selected.png', [15, 15], [-100, 65], ['/1', '/2', '3']),
  new GNObject2D ('gnobject2d14', 'fco', 'Fort CO', NODE_LEVEL.STATE, 
  assets_path + 'country-switch.png', 
  assets_path + 'country-switch-hover.png', 
  assets_path + 'country-switch-selected.png', [15, 15], [-115, 64], ['/1', '/2', '3']),
  new GNObject2D ('gnobject2d15', 'bbn', 'Buffalo Net', NODE_LEVEL.CITY, 
  assets_path + 'router.png', 
  assets_path + 'world-data-center-hover.png', 
  assets_path + 'world-data-center-selected.png', [6, 6], [-113, 55], ['/1', '/2', '3']),
  new GNObject2D ('gnobject2d16', 'edn', 'Edmonton Net', NODE_LEVEL.CITY, 
  assets_path + 'router.png', 
  assets_path + 'world-data-center-hover.png', 
  assets_path + 'world-data-center-selected.png', [6, 6], [-117, 53], ['/1', '/2', '3']),
  new GNObject2D ('gnobject2d17', 'can', 'Calgary Net', NODE_LEVEL.CITY, 
  assets_path + 'router.png', 
  assets_path + 'world-data-center-hover.png', 
  assets_path + 'world-data-center-selected.png', [6, 6], [-115, 59], ['/1', '/2', '3'])
];

