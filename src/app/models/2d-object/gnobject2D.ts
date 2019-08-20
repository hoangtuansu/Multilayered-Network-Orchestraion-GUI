import { NObject2D, NODE_LEVEL } from '../object-interfaces';

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

  constructor(_id: any, n: string, fn: string, l: NODE_LEVEL, iu: string, ihu: string, isu: string, s: [number, number], lp: [number, number]) {
    this.id = _id;
    this.name = n;
    this.full_name = fn;
    this.level = l;
    this.icon_url = iu;
    this.icon_hover_url = ihu;
    this.icon_selected_url = isu;
    this.size = s;
    this.long_pos = lp;
  }
}

export const G2DNOs: GNObject2D[] = [
  new GNObject2D ('gnobject2d1', 'a', 'a', NODE_LEVEL.COUNTRY, 
  'assets/images/world-data-center.png',
  'assets/images/world-data-center-hover.png',
  'assets/images/world-data-center-selected.png', [45, 45], [-135, 65]),
  new GNObject2D ('gnobject2d2', 'a', 'a', NODE_LEVEL.COUNTRY, 
  'assets/images/world-data-center.png', 
  'assets/images/world-data-center-hover.png', 
  'assets/images/world-data-center-selected.png', [45, 45], [-115, 60]),
  new GNObject2D ('gnobject2d3', 'a', 'a', NODE_LEVEL.COUNTRY, 
  'assets/images/world-data-center.png', 
  'assets/images/world-data-center-hover.png', 
  'assets/images/world-data-center-selected.png', [45, 45], [-78, 60]),
  new GNObject2D ('gnobject2d4', 'a', 'a', NODE_LEVEL.STATE, 
  'assets/images/country-switch.png', 
  'assets/images/country-switch-hover.png', 
  'assets/images/country-switch-selected.png', [15, 15], [-140, 65]),
  new GNObject2D ('gnobject2d5', 'a', 'a', NODE_LEVEL.STATE, 
  'assets/images/country-switch.png', 
  'assets/images/country-switch-hover.png', 
  'assets/images/country-switch-selected.png', [15, 15], [-118, 54]),
  new GNObject2D ('gnobject2d6', 'a', 'a', NODE_LEVEL.STATE, 
  'assets/images/country-switch.png', 
  'assets/images/country-switch-hover.png', 
  'assets/images/country-switch-selected.png', [15, 15], [-109, 56]),
  new GNObject2D ('gnobject2d7', 'a', 'a', NODE_LEVEL.STATE, 
  'assets/images/country-switch.png', 
  'assets/images/country-switch-hover.png', 
  'assets/images/country-switch-selected.png', [15, 15], [-100, 59]),
  new GNObject2D ('gnobject2d8', 'a', 'a', NODE_LEVEL.STATE, 
  'assets/images/country-switch.png', 
  'assets/images/country-switch-hover.png', 
  'assets/images/country-switch-selected.png', [15, 15], [-128, 58]),
  new GNObject2D ('gnobject2d9', 'a', 'a', NODE_LEVEL.STATE, 
  'assets/images/country-switch.png', 
  'assets/images/country-switch-hover.png', 
  'assets/images/country-switch-selected.png', [15, 15], [-130, 69]),
  new GNObject2D ('gnobject2d10', 'a', 'a', NODE_LEVEL.STATE, 
  'assets/images/country-switch.png', 
  'assets/images/country-switch-hover.png', 
  'assets/images/country-switch-selected.png', [15, 15], [-90, 52]),
  new GNObject2D ('gnobject2d11', 'a', 'a', NODE_LEVEL.STATE, 
  'assets/images/country-switch.png', 
  'assets/images/country-switch-hover.png', 
  'assets/images/country-switch-selected.png', [15, 15], [-78, 50]),
  new GNObject2D ('gnobject2d12', 'a', 'a', NODE_LEVEL.STATE, 
  'assets/images/country-switch.png', 
  'assets/images/country-switch-hover.png', 
  'assets/images/country-switch-selected.png', [15, 15], [-75, 57]),
  new GNObject2D ('gnobject2d13', 'a', 'a', NODE_LEVEL.STATE, 
  'assets/images/country-switch.png', 
  'assets/images/country-switch-hover.png', 
  'assets/images/country-switch-selected.png', [15, 15], [-100, 65]),
  new GNObject2D ('gnobject2d14', 'a', 'a', NODE_LEVEL.STATE, 
  'assets/images/country-switch.png', 
  'assets/images/country-switch-hover.png', 
  'assets/images/country-switch-selected.png', [15, 15], [-115, 64]),
  new GNObject2D ('gnobject2d15', 'a', 'a', NODE_LEVEL.CITY, 
  'assets/images/router.png', 
  'assets/images/world-data-center-hover.png', 
  'assets/images/world-data-center-selected.png', [6, 6], [-113, 55]),
  new GNObject2D ('gnobject2d16', 'a', 'a', NODE_LEVEL.CITY, 
  'assets/images/router.png', 
  'assets/images/world-data-center-hover.png', 
  'assets/images/world-data-center-selected.png', [6, 6], [-117, 53]),
  new GNObject2D ('gnobject2d17', 'a', 'a', NODE_LEVEL.CITY, 
  'assets/images/router.png', 
  'assets/images/world-data-center-hover.png', 
  'assets/images/world-data-center-selected.png', [6, 6], [-115, 59])
];