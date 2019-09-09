import { Injectable } from '@angular/core';
import * as OBJ from '../models';
import { EntityLocatorService } from './entity-locator.service';

@Injectable({
  providedIn: 'root'
})
export class NetworkManagerService {

  constructor(private locatorService: EntityLocatorService) { }

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

  get2DContainedNetworkElement(nid: string): OBJ.GNObject2D[] {
    let nlevel = this.getNode2DObject(nid).level;
    if(nlevel === OBJ.NODE_LEVEL.CITY) 
      return [];
    
    return this.getG2DNOs().filter(d => { 
      if(nlevel === OBJ.NODE_LEVEL.COUNTRY && d.level !== OBJ.NODE_LEVEL.STATE)
        return false;
      if(nlevel === OBJ.NODE_LEVEL.STATE && d.level !== OBJ.NODE_LEVEL.CITY)
        return false;
      for(let l of this.getG2DLOs()) {
        if((l.node1.id == nid && d.id == l.node2.id) || (l.node2.id == nid && d.id == l.node1.id)) {
          return true;
        }
      }
      return false;
    });
  }

  getNeighborNetworkElements(nid: string): OBJ.GNObject2D[] {
    return this.getG2DNOs().filter(d => { 
      for(let l of this.getG2DLOs()) {
        if((l.node1.id == nid && d.id == l.node2.id) || (l.node2.id == nid && d.id == l.node1.id)) {
          return true;
        }
      }
      return false;
    });
  }

  getConnected3DNetworkElements(nid: string): OBJ.GNObject[] {
    return null;
  }
}
