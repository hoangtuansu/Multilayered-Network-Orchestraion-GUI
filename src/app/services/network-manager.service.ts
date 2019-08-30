import { Injectable } from '@angular/core';
import * as OBJ from '../models';

@Injectable({
  providedIn: 'root'
})
export class NetworkManagerService {

  constructor() { }

  getGPOs(): OBJ.GPOjbect[] {
    return OBJ.GPOs;
  }

  getG3DNOs(): OBJ.GNObject[] {
    return OBJ.G3DNOs;
  }

  getG2DNOs(): OBJ.GNObject2D[] {
    return OBJ.G2DNOs;
  }

  getGLOs(): OBJ.GLObject[] {
    return OBJ.GLOs;
  }

  getG2DLOs(): OBJ.GLObject2D[] {
    return OBJ.G2DLOs;
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

  get2DDomainLinksOfNode(nid: string): OBJ.GLObject2D[] {
    return this.getG2DLOs().filter(d => {return (d.node1.id === nid || d.node2.id === nid) && d.type == OBJ.LINK_TYPE.DOMAIN;});
  }

  get2DBoundaryLinksOfNode(nid: string): OBJ.GLObject2D[] {
    return this.getG2DLOs().filter(d => {return (d.node1.id === nid || d.node2.id === nid) && d.type == OBJ.LINK_TYPE.BOUNDARY;});
  }
}
