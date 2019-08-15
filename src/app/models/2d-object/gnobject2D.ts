import { NObject2D, NODE_LEVEL } from '../object-interfaces';

export class GNObject2D implements NObject2D {
  id: number = 0;
  name: string = "";
  level: NODE_LEVEL;
  full_name: string = "";
  icon_url: string;
  size: [number, number];
  long_pos: [number, number];

  constructor(_id: number, n: string, fn: string, l: NODE_LEVEL, iu: string, s: [number, number], lp: [number, number]) {
    this.id = _id;
    this.name = n;
    this.full_name = fn;
    this.level = l;
    this.icon_url = iu;
    this.size = s;
    this.long_pos = lp;
  }
}

export const G2DNOs: GNObject2D[] = [
  new GNObject2D (1, 'a', 'a', NODE_LEVEL.COUNTRY, '../../assets/images/world-data-center.png', [45, 45], [-135, 65]),
  new GNObject2D (2, 'a', 'a', NODE_LEVEL.COUNTRY, '../../assets/images/world-data-center.png', [45, 45], [-115, 60]),
  new GNObject2D (3, 'a', 'a', NODE_LEVEL.COUNTRY, '../../assets/images/world-data-center.png', [45, 45], [-78, 60]),
  new GNObject2D (4, 'a', 'a', NODE_LEVEL.STATE, '../../assets/images/country-switch.png', [15, 15], [-140, 65]),
  new GNObject2D (5, 'a', 'a', NODE_LEVEL.STATE, '../../assets/images/country-switch.png', [15, 15], [-118, 54]),
  new GNObject2D (6, 'a', 'a', NODE_LEVEL.STATE, '../../assets/images/country-switch.png', [15, 15], [-109, 56]),
  new GNObject2D (7, 'a', 'a', NODE_LEVEL.STATE, '../../assets/images/country-switch.png', [15, 15], [-100, 59]),
  new GNObject2D (8, 'a', 'a', NODE_LEVEL.STATE, '../../assets/images/country-switch.png', [15, 15], [-128, 58]),
  new GNObject2D (9, 'a', 'a', NODE_LEVEL.STATE, '../../assets/images/country-switch.png', [15, 15], [-130, 69]),
  new GNObject2D (10, 'a', 'a', NODE_LEVEL.STATE, '../../assets/images/country-switch.png', [15, 15], [-90, 52]),
  new GNObject2D (11, 'a', 'a', NODE_LEVEL.STATE, '../../assets/images/country-switch.png', [15, 15], [-78, 50]),
  new GNObject2D (12, 'a', 'a', NODE_LEVEL.STATE, '../../assets/images/country-switch.png', [15, 15], [-75, 57]),
  new GNObject2D (13, 'a', 'a', NODE_LEVEL.STATE, '../../assets/images/country-switch.png', [15, 15], [-100, 65]),
  new GNObject2D (14, 'a', 'a', NODE_LEVEL.STATE, '../../assets/images/country-switch.png', [15, 15], [-115, 64]),
  new GNObject2D (15, 'a', 'a', NODE_LEVEL.CITY, '../../assets/images/router.png', [6, 6], [-113, 55]),
  new GNObject2D (16, 'a', 'a', NODE_LEVEL.CITY, '../../assets/images/router.png', [6, 6], [-117, 53]),
  new GNObject2D (17, 'a', 'a', NODE_LEVEL.CITY, '../../assets/images/router.png', [6, 6], [-115, 59])
];