import { Injectable } from '@angular/core';
import * as OBJ from '../models';
import { BreakpointObserver } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class PathComputationService {
  construct() {
    
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
