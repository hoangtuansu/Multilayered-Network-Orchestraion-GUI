import { Injectable } from '@angular/core';
import * as OBJ from '../models';
import { GNObject2D, PathStruct } from '../models/2d-object/gnobject2D';
import { NetworkManagerService } from './network-manager.service';
import { GLinkOBJ } from '../models/2d-object/glinkobj';

@Injectable({
  providedIn: 'root'
})
export class PathManagerService {
  listOfPaths = [
    [OBJ.GNOs[0], OBJ.GNOs[2], OBJ.GNOs[3], OBJ.GNOs[1]], //qfx1 -> qfx3 -> qfx4 -> qfx2 
    [OBJ.GNOs[0], OBJ.GNOs[15], OBJ.GNOs[17], OBJ.GNOs[1]], //qfx1 -> poc1 -> poc3 -> qfx2
    [OBJ.GNOs[0], OBJ.GNOs[4], OBJ.GNOs[7], OBJ.GNOs[6], OBJ.GNOs[1]], //qfx1 -> fws1 -> fws4 -> fws3 -> qfx2
    [OBJ.GNOs[0], OBJ.GNOs[4], OBJ.GNOs[5], OBJ.GNOs[6], OBJ.GNOs[1]], //qfx1 -> fws1 -> fws2 -> fws3 -> qfx2
    [OBJ.GNOs[4], OBJ.GNOs[7], OBJ.GNOs[6]],
    [OBJ.GNOs[4], OBJ.GNOs[5], OBJ.GNOs[6]],
    [OBJ.GNOs[5], OBJ.GNOs[7]],
    [OBJ.GNOs[4], OBJ.GNOs[15], OBJ.GNOs[17], OBJ.GNOs[6]], //fws1 -> poc1 -> poc3 -> fws3
    [OBJ.GNOs[4], OBJ.GNOs[15], OBJ.GNOs[16], OBJ.GNOs[17], OBJ.GNOs[6]] //fws1 -> poc1 -> poc2 -> poc3 -> fws3
  ];

  constructor(private netMngtService: NetworkManagerService) {}

  getBandwidth(listOfPaths: PathStruct[]): number[] {
    let bw: number[] = new Array(listOfPaths.length).fill(1000);
    for(let path of listOfPaths) {
      for(let n of path.nodes) {
        let idx = path.nodes.indexOf(n);
        if(idx == path.nodes.length -1)
          break;
        for(let l of this.netMngtService.getGLOs()) {
          if((l.node1 === n && l.node2 === path[idx+1]) 
          || (l.node2 === n && l.node1 === path[idx+1])) {
            if(l.bandwidth < bw[listOfPaths.indexOf(path)])
            bw[listOfPaths.indexOf(path)] = l.bandwidth;
          }
        }
      }
    }
    return bw;
  }

  getCrossingPath(nodeID: string): PathStruct[] {
    let arr: PathStruct[] = [];
    for(let p of this.netMngtService.getPaths()) {
      for(let n of p.nodes) {
        if(n.id == nodeID) {
          arr.push(p);
          break;
        }
      }
    }
    return arr;
    
  }

  getReachedNetworkElements(nid: string): [GNObject2D[], GLinkOBJ[]] {
    let target = this.netMngtService.getNodeObjByID(nid);
    let nodes = [], links = [];
    for(let p of this.listOfPaths) {
       if(p.indexOf(target) >= 0) {
         for(let np of p) {
           let  inp = p.indexOf(np);
           if(nodes.indexOf(np) < 0) {
             nodes.push(np);
           }
           
           if(inp < p.length - 1) {
            
            let l = this.netMngtService.getLink(np, p[inp+1])[0]
            if(links.indexOf(l) < 0)
              links.push(l)
           }
         }
       }
    }
    return [nodes, links];
  }
}
