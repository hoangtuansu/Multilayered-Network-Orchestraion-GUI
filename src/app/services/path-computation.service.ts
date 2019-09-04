import { Injectable } from '@angular/core';
import * as OBJ from '../models';
import { GNObject2D } from '../models/2d-object/gnobject2D';
import { NetworkManagerService } from './network-manager.service';

@Injectable({
  providedIn: 'root'
})
export class PathComputationService {
  constructor(private netMngtService: NetworkManagerService) {}

  getBandwidth(listOfPaths: GNObject2D[][]): number[] {
    let bw: number[] = new Array(listOfPaths.length).fill(1000);
    for(let path of listOfPaths) {
      for(let n of path) {
        let idx = path.indexOf(n);
        if(idx == path.length -1)
          break;
        for(let l of this.netMngtService.getG2DLOs()) {
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

  getCrossingPath(nodeID: string): any {
    let listOfPaths = [
      [OBJ.G2DNOs[0], OBJ.G2DNOs[1], OBJ.G2DNOs[2]], 
      [OBJ.G2DNOs[0], OBJ.G2DNOs[7], OBJ.G2DNOs[1], OBJ.G2DNOs[4], OBJ.G2DNOs[15], OBJ.G2DNOs[16], OBJ.G2DNOs[9], OBJ.G2DNOs[10], OBJ.G2DNOs[2]], 
      [OBJ.G2DNOs[0], OBJ.G2DNOs[3], OBJ.G2DNOs[13], OBJ.G2DNOs[6], OBJ.G2DNOs[9], OBJ.G2DNOs[2]],
      [OBJ.G2DNOs[0], OBJ.G2DNOs[1]],
      [OBJ.G2DNOs[0], OBJ.G2DNOs[7], OBJ.G2DNOs[1]],
      [OBJ.G2DNOs[1], OBJ.G2DNOs[2]],
      [ OBJ.G2DNOs[1], OBJ.G2DNOs[4], OBJ.G2DNOs[15], OBJ.G2DNOs[16], OBJ.G2DNOs[9], OBJ.G2DNOs[10], OBJ.G2DNOs[2]]
    ];
    let arr = [];
    for(let p of listOfPaths) {
      for(let n of p) {
        if(n.id == nodeID) {
          arr.push(p);
          break;
        }
      }
    }
    return arr;
    
  }
}
