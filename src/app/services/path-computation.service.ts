import { Injectable } from '@angular/core';
import { NetworkManagerService } from './network-manager.service';
import * as OBJ from '../models';
import { GNObject2D } from '../models/2d-object/gnobject2D';

@Injectable({
  providedIn: 'root'
})
export class PathComputationService {
  nbrSubPaths: number = 0;
  nodeIDsArr: string[][];
  constructor(private netMngtService: NetworkManagerService) {

  }

  getPath(node1: GNObject2D, node2: GNObject2D) {
    if((node1.name == "mdc" && node2.name == "bdc") || (node1.name == "bdc" && node2.name == "mdc")) {
      this.nbrSubPaths = 3;
      this.nodeIDsArr = [['gnobject2d1', 'gnobject2d2', 'gnobject2d3'], ['gnobject2d1, '], []];
    }
  }

  getLogicalLinks(subPathIdx: number): string[] { //return array of node ids, each two element represents an logical link
    let subPath = this.nodeIDsArr[subPathIdx];
    let logicalCountryArr = [], logicalStateArr = [];
    let prevCountryNodeID = null, prevStateNodeID = null;
    for(let nIdx of subPath) {
      let n = this.netMngtService.getNode2DObject(nIdx);
      let i = subPath.indexOf(nIdx);
      switch(n.level) {
        case OBJ.NODE_LEVEL.COUNTRY:
          if(prevCountryNodeID == null) {
            prevCountryNodeID = i;
            continue;
          }
          if(i > (prevCountryNodeID + 1)) {
            logicalCountryArr.push(prevCountryNodeID);
            logicalCountryArr.push(i);
            prevCountryNodeID = i;
            continue;
          }
          break;
        case OBJ.NODE_LEVEL.STATE:
          if(prevStateNodeID == null) {
            prevStateNodeID = i;
            continue;
          }
          if(i > (prevStateNodeID + 1)) {
            let lastNode = this.netMngtService.getNode2DObject(subPath[i-1]);
            if(lastNode.level != OBJ.NODE_LEVEL.COUNTRY) {
              logicalStateArr.push(prevStateNodeID);
              logicalStateArr.push(i);
            }
            prevStateNodeID = i;
            continue;
          }
          break;
      }
    }
    return logicalCountryArr.concat(logicalStateArr); 
  }
}
