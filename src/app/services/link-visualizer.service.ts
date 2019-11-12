import { Injectable, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import * as OBJ from '../models';
import { NetworkManagerService } from './network-manager.service';
import { EngineCoordinatorService } from './engine-coordinator.service';

@Injectable({
  providedIn: 'root'
})
export class LinkVisualizerService {
  selectedPathIndex: string = "";  //this is to identify the tooltip, not the ID of the GLinkOBJ link
  obtainedPath: OBJ.PathStruct = null;
  arrowID: string = "";
  svg: d3.Selection<SVGElement, {}, HTMLElement, any> = null;
  height: number = 0;
  constructor(private netMngtService: NetworkManagerService, 
    private engineService: EngineCoordinatorService) { }

  setSelectedPath(pidx: string, op: OBJ.PathStruct) {
    this.selectedPathIndex = pidx;
    this.obtainedPath = op;
    this.arrowID = "triangle" + this.selectedPathIndex;
  }

  private calculateHeight(offsetHeight1: number, offsetHeight2: number): number {
    let h = 0;
    let prevNode = null;
    for(let curNode of this.obtainedPath.nodes) {
      if(prevNode != null) {
        h += (prevNode.level == curNode.level) ? offsetHeight1 : offsetHeight2;
      }
      prevNode = curNode;
    }
    return h+60;  //for displaying the last node
  }

  private getNodePosition(width, numLayers, nbrCountryNode, nbrCityNode) {
    let prevNode = null, prevPosY = 0, prevPosX = 0;
    let nodePositionArr = [];
    for(let node of this.obtainedPath.nodes) {
      let posX = 0, posY = 0;
      
      switch(node.level) {
        case OBJ.NODE_LEVEL.COUNTRY:
          posX = (numLayers == 1) ? width/2 : (numLayers == 2 ? width/4 : width/6);
          break;
        case OBJ.NODE_LEVEL.STATE:
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
        case OBJ.NODE_LEVEL.CITY:
            posX = (numLayers == 1) ? width/2 : (numLayers == 2 ? width*3/4 : width*5/6);
            break;
      }
      if(prevNode !== null) {
        posY = prevPosY + (prevNode.level === node.level ? 100 : 70);
        let prevOffset = (prevNode.level === OBJ.NODE_LEVEL.CITY ? 0 : 10); 
        let curOffset = (node.level === OBJ.NODE_LEVEL.CITY ? 0 : 10); 
        let pos1: [number, number] = [prevPosX + prevOffset, prevPosY + prevOffset];
        let pos2: [number, number] = [posX + curOffset, posY + curOffset];
        this.drawLinkBetweenNodes(pos1, pos2, this.netMngtService.getLink(prevNode, node)[0]);
      }
      nodePositionArr.push([posX, posY, node, this.selectedPathIndex]);
      prevNode = node;
      prevPosY = posY;
      prevPosX = posX;
    }
    return nodePositionArr;
  }

  createPathVisualization(mapRenderer: ElementRef): void {
    let element = mapRenderer.nativeElement;
    //let width = mapRenderer.nativeElement.offsetWidth;
    let width = (window.innerWidth/4) - (window.innerWidth/20);
    this.height = this.calculateHeight(100, 70);
    d3.select(element).append("div").attr("id", "tooltip" + this.selectedPathIndex).attr("class", "nodeInfo");
    this.svg = d3.select(element).append("svg")
                .attr("preserveAspectRatio", "xMidYMid")
                .attr("viewBox", "0 0 " + width + " " + this.height)
                .attr("width", width).attr("height", this.height);

    let nbrCountryNode = this.obtainedPath.nodes.some(n => {return n.level === OBJ.NODE_LEVEL.COUNTRY;}) ? 1 : 0;
    let nbrStateNode = this.obtainedPath.nodes.some(n => {return n.level === OBJ.NODE_LEVEL.STATE;}) ? 1 : 0;
    let nbrCityNode = this.obtainedPath.nodes.some(n => {return n.level === OBJ.NODE_LEVEL.CITY;}) ? 1 : 0;
    let numLayers = nbrCountryNode + nbrStateNode + nbrCityNode;
    this.svg.append("svg:defs").append("svg:marker")
      .attr("id", this.arrowID)
      .attr("refX", 12)
      .attr("refY", 12)
      .attr("markerUnits", "userSpaceOnUse")
      .attr("markerWidth", 30)
      .attr("markerHeight", 30)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M 0 0 24 12 0 24 6 12")
      .style("stroke", "black");
    let nodePositionArr = this.getNodePosition(width, numLayers, nbrCountryNode, nbrCityNode);
    this.displayLogicalLink(nodePositionArr);
    this.displayNodes(nodePositionArr);
  }

  private displayLogicalLink(nodePositionArr) {
    let prevCountryNodeID = null, prevStateNodeID = null;
    for(let curNode of this.obtainedPath.nodes) {
      let i = this.obtainedPath.nodes.indexOf(curNode);
      let prevOffset = 10, curOffset = 10, prevPos = null;
      let pos1: [number, number] = null;
      let pos2: [number, number] = [nodePositionArr[i][0] + curOffset, nodePositionArr[i][1] + curOffset];
      if(curNode.level == OBJ.NODE_LEVEL.COUNTRY) {
        if(prevCountryNodeID == null || i == (prevCountryNodeID + 1)) {
          prevCountryNodeID = i;
          continue;
        }
        if(i > (prevCountryNodeID + 1)){
          prevPos = nodePositionArr[prevCountryNodeID];
          pos1 = [prevPos[0] + prevOffset, prevPos[1] + prevOffset];
          this.drawLinkBetweenNodes(pos1, pos2, null);
          prevCountryNodeID = i;
        }
      } else if(curNode.level == OBJ.NODE_LEVEL.STATE) {
        if(prevStateNodeID == null || i == (prevStateNodeID + 1)) {
          prevStateNodeID = i;
          continue;
        }
        if(i > (prevStateNodeID + 1)){
          prevPos = nodePositionArr[prevStateNodeID];
          if(this.obtainedPath.nodes[i-1].level == OBJ.NODE_LEVEL.CITY) {
            pos1 = [prevPos[0] + prevOffset, prevPos[1] + prevOffset];
            this.drawLinkBetweenNodes(pos1, pos2, null);
          }
          prevStateNodeID = i;
        }
      }
      
    }
  }

  private displayNodes(nodePositionArr) {
    let arr1 = nodePositionArr.filter(d => {return d[2].level == OBJ.NODE_LEVEL.COUNTRY || d[2].level == OBJ.NODE_LEVEL.STATE});
    let arr2 = nodePositionArr.filter(d => {return d[2].level == OBJ.NODE_LEVEL.CITY});
    this.svg.selectAll(".noncity-nodes-of-link").data(arr1).enter().append("rect")
      .attr("x", d => {return d[0];})
      .attr("y", d => {return d[1];})
      .attr("width", 20).attr("height", 20)
      .attr("fill", "#2c3e50")
      .on("mouseover", this.entityHover)
      .on("mouseout", this.entityOut)
      .on("click", this.entitySelecting);
    this.svg.selectAll(".city-nodes-of-link").data(arr2).enter().append("circle")
      .attr("cx", d => {return d[0];})
      .attr("cy", d => {return d[1];}).attr("r", 12).attr("fill", "#2c3e50")
      .on("mouseover", this.entityHover)
      .on("mouseout", this.entityOut)
      .on("click", this.entitySelecting);

    this.svg.selectAll(".node-labels-of-link").data(nodePositionArr).enter().append("text")
      .attr("x", d => {return d[0] + (d[2].level == OBJ.NODE_LEVEL.CITY ? 8 : (-d[2].name.length*10));})
      .attr("y", d => {return d[1] + (d[2].level == OBJ.NODE_LEVEL.CITY ? (-12) : 15); })
      .attr("fill", "#2c3e50")
      .text(d => {return d[2].name;});
  }

  private drawLinkBetweenNodes(pos1: [number, number], pos2: [number, number], linkObj: OBJ.GLinkOBJ) {
    this.svg.append("path").datum(linkObj).attr("d", "M" + pos1[0] + "," + pos1[1] + "L" + (pos1[0] + pos2[0])/2 + "," + (pos1[1] + pos2[1])/2 + "L" + pos2[0] + "," + pos2[1])
        .attr("stroke-width", 6)
        .attr("stroke", "black")
        .attr("stroke-dasharray", (linkObj == null) ? 8 : 0)
        .attr("marker-mid", "url(#" + this.arrowID + ")")
        .on("click", this.linkSelecting);
        return;
  }

  
  private entityHover = selectedNode => {
    d3.select("#" + "tooltip" + selectedNode[3]).transition().duration(200).style("opacity", .9); 
    let posX = selectedNode[0] - selectedNode[2].full_name.length - 20, posY = selectedNode[1] + 8;
    if(selectedNode[2].level === OBJ.NODE_LEVEL.CITY) {
      posX = posX - 10;
    }
    d3.select("#" + "tooltip" + selectedNode[3]).html(selectedNode[2].full_name)
      .style("left", posX + "px")
      .style("top", posY + "px");
    console.log('width: ', (window.innerWidth/4) - (window.innerWidth/20), 'height: ', this.height);
    console.log(posX, ' pos ', + posY);
    console.log(d3.event.pageX - posX, ' difference ', (d3.event.pageY - posY));
  }

  private linkSelecting = selectedLink => {
    this.engineService.engine3DService.highlightLink(selectedLink);
    d3.event.stopPropagation();
    
  }

  private entityOut = selectedNode => {
    d3.select("#" + "tooltip" + selectedNode[3]).transition().duration(200).style("opacity", 0);
  }

  private entitySelecting = selectedNode => {

  }
 
}