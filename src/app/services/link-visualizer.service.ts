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
    //return ['gnobject2d1', 'gnobject2d4', 'gnobject2d5', 'gnobject2d15', 'gnobject2d16', 'gnobject2d13', 'gnobject2d17', 'gnobject2d3' ];
    //return ['gnobject2d1', 'gnobject2d4', 'gnobject2d5', 'gnobject2d3' ];
    return ['gnobject2d1', 'gnobject2d2', 'gnobject2d3' ];
  }

  createLinkVisualization(mapRenderer: ElementRef): void {
    let element = mapRenderer.nativeElement;
    let listIDs = this.getLinkInfo();
    let width = mapRenderer.nativeElement.offsetWidth
    let height = listIDs.length*50;
    let svg = d3.select(element).append("svg").attr("preserveAspectRatio", "xMidYMid")
    .attr("viewBox", "0 0 " + width + " " + height)
    .attr("width", width).attr("height", height);

    let nbrCountryNode = listIDs.some(id => {return this.nodeMngmnt.getNode2DObject(id).level === NODE_LEVEL.COUNTRY;}) ? 1 : 0;
    let nbrStateNode = listIDs.some(id => {return this.nodeMngmnt.getNode2DObject(id).level === NODE_LEVEL.STATE;}) ? 1 : 0;
    let nbrCityNode = listIDs.some(id => {return this.nodeMngmnt.getNode2DObject(id).level === NODE_LEVEL.CITY;}) ? 1 : 0;
    let numLayers = nbrCountryNode + nbrStateNode + nbrCityNode;
    let prevNode = null;
    let prevPosY = 0;
    for(let nid of listIDs) {
      let node = this.nodeMngmnt.getNode2DObject(nid);
      let posX = width/6;
      if(numLayers == 1) {
        posX = width/2;
      } else if(numLayers == 2) {
        switch(node.level) {
          case NODE_LEVEL.COUNTRY:
            posX = width/4;
            break;
          case NODE_LEVEL.STATE:
            if(nbrCountryNode) {
              posX = width*3/4; //so state nodes will be printed in the SECOND column
            } else if(nbrCityNode) {
              posX = width/4; //so state nodes will be printed in the FIRST column
            }
            break;
          case NODE_LEVEL.CITY:
              posX = width*3/4;
              break;
        }
      } else {
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
      }
      let posY = prevPosY + 50;
      svg.append("rect").attr("x", posX).attr("y", posY)
                        .attr("width", 15).attr("height", 15);
      prevNode = node;
      prevPosY = posY;
    }
    
  }
}
