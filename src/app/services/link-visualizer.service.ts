import { Injectable, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { NODE_LEVEL } from '../models/constants';
import { PathStruct } from '../models/2d-object/gnobject2D';

@Injectable({
  providedIn: 'root'
})
export class LinkVisualizerService {
  selectedLinkID: string = "";  //this is to identify the tooltip, not the ID of the GLinkOBJ link
  obtainedPath: PathStruct = null;
  constructor() { }

  setSelectedLinkID(lid: string, op: PathStruct) {
    this.selectedLinkID = lid;
    this.obtainedPath = op;
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

  private getNodePosition(svg, arrowID, width, numLayers, nbrCountryNode, nbrCityNode) {
    let prevNode = null, prevPosY = 0, prevPosX = 0;
    let nodePositionArr = [];
    for(let node of this.obtainedPath.nodes) {
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
        let prevOffset = (prevNode.level === NODE_LEVEL.CITY ? 0 : 10); 
        let curOffset = (node.level === NODE_LEVEL.CITY ? 0 : 10); 
        this.drawLinkBetweenNodes(svg, arrowID, prevPosX + prevOffset, prevPosY + prevOffset, posX + curOffset, posY + curOffset);
      }
      nodePositionArr.push([posX, posY, node, this.selectedLinkID]);
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
    let height = this.calculateHeight(100, 70);
    d3.select(element).append("div").attr("id", "tooltip" + this.selectedLinkID).attr("class", "nodeInfo");
    let svg = d3.select(element).append("svg")
                .attr("preserveAspectRatio", "xMidYMid")
                .attr("viewBox", "0 0 " + width + " " + height)
                .attr("width", width).attr("height", height);

    let nbrCountryNode = this.obtainedPath.nodes.some(n => {return n.level === NODE_LEVEL.COUNTRY;}) ? 1 : 0;
    let nbrStateNode = this.obtainedPath.nodes.some(n => {return n.level === NODE_LEVEL.STATE;}) ? 1 : 0;
    let nbrCityNode = this.obtainedPath.nodes.some(n => {return n.level === NODE_LEVEL.CITY;}) ? 1 : 0;
    let numLayers = nbrCountryNode + nbrStateNode + nbrCityNode;
    svg.append("svg:defs").append("svg:marker")
      .attr("id", "triangle" + this.selectedLinkID)
      .attr("refX", 12)
      .attr("refY", 12)
      .attr("markerUnits", "userSpaceOnUse")
      .attr("markerWidth", 30)
      .attr("markerHeight", 30)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M 0 0 24 12 0 24 6 12")
      .style("stroke", "black");
    let nodePositionArr = this.getNodePosition(svg, "triangle" + this.selectedLinkID, width, numLayers, nbrCountryNode, nbrCityNode);
    this.displayLogicalLink(svg, "triangle" + this.selectedLinkID, nodePositionArr);
    this.displayNodes(svg, nodePositionArr);
  }

  private displayLogicalLink(svg, arrowID, nodePositionArr) {
    let prevCountryNodeID = null, prevStateNodeID = null;
    for(let curNode of this.obtainedPath.nodes) {
      let i = this.obtainedPath.nodes.indexOf(curNode);
      let prevPos = null;
      let prevOffset = 10;
      let curOffset = 10; 

      if(curNode.level == NODE_LEVEL.COUNTRY) {
        if(prevCountryNodeID == null || i == (prevCountryNodeID + 1)) {
          prevCountryNodeID = i;
          continue;
        }
        if(i > (prevCountryNodeID + 1)){
          prevPos = nodePositionArr[prevCountryNodeID];
          this.drawLinkBetweenNodes(svg, arrowID,  prevPos[0] + prevOffset, prevPos[1] + prevOffset, 
            nodePositionArr[i][0] + curOffset, nodePositionArr[i][1] + curOffset, true);
          prevCountryNodeID = i;
        }
      } else if(curNode.level == NODE_LEVEL.STATE) {
        if(prevStateNodeID == null || i == (prevStateNodeID + 1)) {
          prevStateNodeID = i;
          continue;
        }
        if(i > (prevStateNodeID + 1)){
          prevPos = nodePositionArr[prevStateNodeID];
          if(this.obtainedPath.nodes[i-1].level == NODE_LEVEL.CITY)
            this.drawLinkBetweenNodes(svg, arrowID,  prevPos[0] + prevOffset, prevPos[1] + prevOffset, 
            nodePositionArr[i][0] + curOffset, nodePositionArr[i][1] + curOffset, true);
          prevStateNodeID = i;
        }
      }
      
    }
  }

  private displayNodes(svg, nodePositionArr) {
    let arr1 = nodePositionArr.filter(d => {return d[2].level == NODE_LEVEL.COUNTRY || d[2].level == NODE_LEVEL.STATE});
    let arr2 = nodePositionArr.filter(d => {return d[2].level == NODE_LEVEL.CITY});
    svg.selectAll(".noncity-nodes-of-link").data(arr1).enter().append("rect")
        .attr("x", d => {return d[0];})
        .attr("y", d => {return d[1];})
        .attr("width", 20).attr("height", 20)
        .attr("fill", "#2c3e50")
        .on("mouseover", this.entityHover)
        .on("mouseout", this.entityOut)
        .on("click", this.entitySelecting);
    svg.selectAll(".city-nodes-of-link").data(arr2).enter().append("circle")
        .attr("cx", d => {return d[0];})
        .attr("cy", d => {return d[1];}).attr("r", 12).attr("fill", "#2c3e50")
        .on("mouseover", this.entityHover)
        .on("mouseout", this.entityOut)
        .on("click", this.entitySelecting);

    svg.selectAll(".node-labels-of-link").data(nodePositionArr).enter().append("text")
        .attr("x", d => {return d[0] + (d[2].level == NODE_LEVEL.CITY ? 8 : (-d[2].name.length*10));})
        .attr("y", d => {return d[1] + (d[2].level == NODE_LEVEL.CITY ? (-12) : 15); })
        .attr("fill", "#2c3e50")
        .text(d => {return d[2].name;});
  }

  private drawLinkBetweenNodes(svg, arrowID, posX1, posY1, posX2, posY2, isDash?: boolean) {
    if(isDash) {
      svg.append("path").attr("d", "M" + posX1 + "," + posY1 + "L" + (posX1 + posX2)/2 + "," + (posY1+posY2)/2 + "L" + posX2 + "," + posY2)
        .attr("stroke-width", 6)
        .attr("stroke", "black")
        .attr("stroke-dasharray", 8)
        .attr("marker-mid", "url(#" + arrowID + ")");
        return;
    }
    svg.append("path").datum("abc").attr("d", "M" + posX1 + "," + posY1 + "L" + (posX1 + posX2)/2 + "," + (posY1+posY2)/2 + "L" + posX2 + "," + posY2)
        .attr("stroke-width", 6)
        .attr("stroke", "black")
        .attr("marker-mid", "url(#" + arrowID + ")")
        .on("click", this.linkSelecting);
  }

  
  private entityHover = selectedNode => {
    
    d3.select("#" + "tooltip" + selectedNode[3]).transition().duration(200).style("opacity", .9); 
    let posX = selectedNode[0] - selectedNode[2].full_name.length, posY = selectedNode[1] + 12;
    if(selectedNode[2].level === NODE_LEVEL.CITY) {
      posX = posX - 10;
    }
    d3.select("#" + "tooltip" + selectedNode[3]).html(selectedNode[2].full_name)
      .style("left", posX + "px")
      .style("top", posY + "px");
  }

  private linkSelecting = selectedLink => {
    console.log(selectedLink);
  }

  private entityOut = selectedNode => {
    d3.select("#" + "tooltip" + selectedNode[3]).transition().duration(200).style("opacity", 0);
  }

  private entitySelecting = selectedNode => {

  }
}