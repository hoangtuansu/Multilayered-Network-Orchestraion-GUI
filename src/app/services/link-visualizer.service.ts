import { Injectable, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { GNObject2D } from '../models/2d-object/gnobject2D';
import { NodeManagerService } from './node-manager.service';
import { NODE_LEVEL } from '../models/object-interfaces';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';

@Injectable({
  providedIn: 'root'
})
export class LinkVisualizerService {
  listOfNodeIDs: string[] = null;
  constructor(private nodeMngmnt: NodeManagerService) { }

  getLinkInfo(): string[] {
    return ['gnobject2d1', 'gnobject2d4', 'gnobject2d5', 'gnobject2d15', 'gnobject2d16', 'gnobject2d13', 'gnobject2d17', 'gnobject2d3' ];
    //return ['gnobject2d1', 'gnobject2d4', 'gnobject2d5', 'gnobject2d3' ];
    //return ['gnobject2d1', 'gnobject2d2', 'gnobject2d3' ];
  }

  createLinkVisualization(mapRenderer: ElementRef): void {
    let element = mapRenderer.nativeElement;
    let listIDs = this.getLinkInfo();
    let width = mapRenderer.nativeElement.offsetWidth
    let height = this.calculateHeight(listIDs, 100, 70);
    let svg = d3.select(element).append("svg").attr("preserveAspectRatio", "xMidYMid")
    .attr("viewBox", "0 0 " + width + " " + height)
    .attr("width", width).attr("height", height);

    this.displayNodes(svg, listIDs, width);
  }

  private calculateHeight(nodeIDs: string[], offsetHeight1: number, offsetHeight2: number): number {
    let h = 0;
    let prevNode = null;
    for(let nid of nodeIDs) {
      let curNode = this.nodeMngmnt.getNode2DObject(nid);
      if(prevNode != null) {
        h += (prevNode.level == curNode.level) ? offsetHeight1 : offsetHeight2;
      }
      prevNode = curNode;
    }
    return h+30;  //for displaying the last node
  }

  private displayNodes(svg, listIDs: string[], width: number) {
    let nbrCountryNode = listIDs.some(id => {return this.nodeMngmnt.getNode2DObject(id).level === NODE_LEVEL.COUNTRY;}) ? 1 : 0;
    let nbrStateNode = listIDs.some(id => {return this.nodeMngmnt.getNode2DObject(id).level === NODE_LEVEL.STATE;}) ? 1 : 0;
    let nbrCityNode = listIDs.some(id => {return this.nodeMngmnt.getNode2DObject(id).level === NODE_LEVEL.CITY;}) ? 1 : 0;
    let numLayers = nbrCountryNode + nbrStateNode + nbrCityNode;
    let prevNode = null;
    let prevPosY = 0;
    let prevPosX = 0;
    svg.append("svg:defs").append("svg:marker")
      .attr("id", "triangle")
      .attr("refX", 6)
      .attr("refY", 6)
      .attr("markerWidth", 30)
      .attr("markerHeight", 30)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M 0 0 12 6 0 12 3 6")
      .style("stroke", "black");
  
  //line              
  

    for(let i in listIDs) {
      let node = this.nodeMngmnt.getNode2DObject(listIDs[i]);
      let posX = 0, posY = 0;
      
      switch(node.level) {
        case NODE_LEVEL.COUNTRY:
          posX = (numLayers == 1) ? width/2 : (numLayers == 2 ? width/4 : width/6);
          break;
        case NODE_LEVEL.STATE:
          if(numLayers == 1 || numLayers == 3)
            posX = width/2;
          else {
            if(nbrCountryNode) {
              posX = width*3/4; //so state nodes will be printed in the SECOND column
            } else if(nbrCityNode) {
              posX = width/4; //so state nodes will be printed in the FIRST column
            }
          }
          break;
        case NODE_LEVEL.CITY:
            posX = (numLayers == 1) ? width/2 : (numLayers == 2 ? width*3/4 : width*5/6);
            break;
      }

      if(prevNode !== null) {
        posY = prevPosY + (prevNode.level === node.level ? 100 : 70);
        this.drawLinkBetweenNodes(svg, posX + 10, posY + 10, prevPosX + 10, prevPosY + 10);
      }
      //this.drawNode(svg, node, i == '0', posX, posY);
      
      prevNode = node;
      prevPosY = posY;
      prevPosX = posX;
    }
  }

  private drawLinkBetweenNodes(svg, posX1, posY1, posX2, posY2) {

    svg.append("line")
        .attr("x1", posX2)
        .attr("y1", posY2)
        .attr("x2", posX1)
        .attr("y2", posY1)          
        .attr("stroke-width", 2)
        .attr("stroke", "black")
        .attr("marker-end", "url(#triangle)");
  }

  private drawNode(svg, node, isSrcNode: boolean, posX: number, posY: number) {
    if(node.level == NODE_LEVEL.COUNTRY || node.level == NODE_LEVEL.STATE) {
      if(isSrcNode) {
        svg.append("rect").attr("x", posX).attr("y", posY)
        .attr("width", 20).attr("height", 20)
        .attr("fill", "none").attr("stroke-width", 1).attr("stroke", "black");
        svg.append("rect").attr("x", posX + 3).attr("y", posY + 3)
          .attr("width", 14).attr("height", 14)
          .attr("fill", "#2c3e50");
      } else {
        svg.append("rect").attr("x", posX).attr("y", posY)
        .attr("width", 20).attr("height", 20)
        .attr("fill", "#2c3e50");
      }
    } else {
      if(isSrcNode) {
        svg.append("circle").attr("cx", posX).attr("cy", posY)
        .attr("r", 12).attr("fill", "none").attr("stroke-width", 1).attr("stroke", "black");
        svg.append("circle").attr("cx", posX + 3).attr("cy", posY + 3)
          .attr("r", 10).attr("fill", "#2c3e50");
      } else {
        svg.append("circle").attr("cx", posX).attr("cy", posY)
        .attr("r", 12).attr("fill", "#2c3e50");
      }
    }
  }

}
