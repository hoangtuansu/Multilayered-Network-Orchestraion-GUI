import { Injectable, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { GNObject2D } from '../models/2d-object/gnobject2D';
import { NodeManagerService } from './node-manager.service';
import { NODE_LEVEL } from '../models/object-interfaces';

@Injectable({
  providedIn: 'root'
})
export class LinkVisualizerService {
  listOfNodeIDs: string[] = null;
  constructor(private nodeMngmnt: NodeManagerService) { }

  getLinkInfo(): string[] {
    return ['gnobject2d1', 'gnobject2d4', 'gnobject2d5', 'gnobject2d15', 'gnobject2d16', 'gnobject2d13', 'gnobject2d17', 'gnobject2d3' ];
  }

  createLinkVisualization(mapRenderer: ElementRef): void {
    let element = mapRenderer.nativeElement;
    let listIDs = this.getLinkInfo();
    let width = mapRenderer.nativeElement.offsetWidth
    let height = listIDs.length*50;
    let svg = d3.select(element).append("svg").attr("preserveAspectRatio", "xMidYMid")
    .attr("viewBox", "0 0 " + width + " " + height)
    .attr("width", width).attr("height", height);

    let prevNode = null;
    let prevPosY = 0;
    for(let nid of listIDs) {
      let node = this.nodeMngmnt.getNode2DObject(nid);
      let posX = width/6;
      switch(node.level) {
        case NODE_LEVEL.COUNTRY:
          break;
        case NODE_LEVEL.STATE:
          posX = width/2;
          break;
        case NODE_LEVEL.CITY:
            posX = width*5/6;
            break;
      }
      let posY = prevPosY + 50;
      svg.append("rect").attr("x", posX).attr("y", posY)
                        .attr("width", 5).attr("height", 5);
      prevNode = node;
      prevPosY = posY;
    }
    
  }
}
