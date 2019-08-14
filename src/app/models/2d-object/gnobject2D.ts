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
  new GNObject2D (3, 'a', 'a', NODE_LEVEL.COUNTRY, '../../assets/images/world-data-center.png', [45, 45], [-78, 60])
];
  