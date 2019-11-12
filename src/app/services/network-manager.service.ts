import { Injectable } from '@angular/core';
import * as OBJ from '../models';
import { EntityLocatorService } from './entity-locator.service';
import { PathStruct } from '../models/2d-object/gnobject2D';

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

  getGNOs(): OBJ.GNObject2D[] {
    return OBJ.GNOs;
  }

  getGLOs(): OBJ.GLinkOBJ[] {
    return OBJ.GLOs;
  }

  getGNPrOs(): OBJ.GNPrObject[] {
    return OBJ.GNPrOs;
  }

  getPaths(): PathStruct[] {
    return OBJ.Paths;
  }

  getLinkObjByID(lid: string): OBJ.Object {
    return this.getGLOs().filter(d => d.id === lid)[0];
  }

  getNodeObjByID(nid: string): OBJ.Object {
    return this.getGNOs().filter(d => d.id === nid)[0];
  }

  get2DDomainLinksOfNode(nid: string): OBJ.GLinkOBJ[] {
    return this.getGLOs().filter(d => {return (d.node1.id === nid || d.node2.id === nid) && d.type == OBJ.LINK_TYPE.DOMAIN;});
  }

  get2DBoundaryLinksOfNode(nid: string): OBJ.GLinkOBJ[] {
    return this.getGLOs().filter(d => {return (d.node1.id === nid || d.node2.id === nid) && d.type == OBJ.LINK_TYPE.BOUNDARY;});
  }

  getLink(src: OBJ.GNObject2D, dst: OBJ.GNObject2D): OBJ.GLinkOBJ[] {
    return this.getGLOs().filter(l => {return (l.node1.id === src.id && l.node2.id === dst.id) || ((l.node2.id === src.id && l.node1.id === dst.id));});
    /* for(let l of this.getGLOs()) {
      if((l.node1.id === src.id && l.node2.id === dst.id) || ((l.node2.id === src.id && l.node1.id === dst.id)))
        return l;
    }
    return null; */
  }

  get2DContainedNetworkElement(nid: string): OBJ.GNObject2D[] {
    let nlevel = this.getNodeObjByID(nid).level;
    if(nlevel === OBJ.NODE_LEVEL.CITY) 
      return [];
    
    return this.getGNOs().filter(d => { 
      if(nlevel === OBJ.NODE_LEVEL.COUNTRY && d.level !== OBJ.NODE_LEVEL.STATE)
        return false;
      if(nlevel === OBJ.NODE_LEVEL.STATE && d.level !== OBJ.NODE_LEVEL.CITY)
        return false;
      for(let l of this.getGLOs()) {
        if((l.node1.id == nid && d.id == l.node2.id) || (l.node2.id == nid && d.id == l.node1.id)) {
          return true;
        }
      }
      return false;
    });
  }

  getNeighborNetworkElements(nid: string): OBJ.GNObject2D[] {
    return this.getGNOs().filter(d => { 
      for(let l of this.getGLOs()) {
        if((l.node1.id == nid && d.id == l.node2.id) || (l.node2.id == nid && d.id == l.node1.id)) {
          return true;
        }
      }
      return false;
    });
  }

}
