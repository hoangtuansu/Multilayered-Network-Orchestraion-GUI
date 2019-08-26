import { Injectable } from '@angular/core';
import * as OBJ from '../models';

@Injectable({
  providedIn: 'root'
})
export class NodeManagerService {

  constructor() { }

  getGPOs(): OBJ.GPOjbect[] {
    return OBJ.GPOs;
  }

  getG3DNOs(): OBJ.GNObject[] {
    return OBJ.G3DNOs;
  }

  getG2DNOs(): OBJ.GNObject[] {
    return OBJ.G2DNOs;
  }

  getGLOs(): OBJ.GLObject[] {
    return OBJ.GLOs;
  }

  getGNPrOs(): OBJ.GNPrObject[] {
    return OBJ.GNPrOs;
  }

  getNode2DObject(id: string): OBJ.Object {
    for(let n of this.getG2DNOs()) {
      if(n.id === id) {
        return n;
      }
    }
  }
}
