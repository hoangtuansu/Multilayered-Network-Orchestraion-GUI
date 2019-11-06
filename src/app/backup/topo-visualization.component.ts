import {Component, ViewChild, ElementRef, Input, SimpleChange, ViewEncapsulation} from '@angular/core';
import {Visualizer, AnimationTriggers} from './network-object';
import * as d3 from 'd3';
import * as OBJ from '../models';

@Component({
  selector: 'topo-visual',
  templateUrl: './topo-visualization.component.html',
  styles: ['.visual2d { background-image: url("assets/map.png");}'],
  animations: AnimationTriggers,
  encapsulation: ViewEncapsulation.None
})
export class TopoVisualizationComponent {
  @ViewChild('renderer3DContainer', { static: false }) renderer3DContainer: ElementRef;
  @ViewChild('renderer2DContainer', { static: false }) renderer2DContainer: ElementRef;

  visualizer: Visualizer = null;
  @Input() displayMode: number = OBJ.DISPLAY_MODE.D3;
  isHide3DDiv: boolean = false;

  constructor() {
    this.visualizer = new Visualizer(OBJ.G3DNOs, OBJ.GLOs, OBJ.GPOs, OBJ.GNOs);
    this.visualizer.setTopoComponent(this);
  }

  ngOnInit() {
  }

  createChart() {
    let element = this.renderer2DContainer.nativeElement;
    let width = window.innerWidth*0.75, height = window.innerHeight*0.75;
    let scaleWidth = width/40, scaleHeight = height/20;
    let translateStr: string = "translate(" + (width/2 + 30) + "," + (height/2 - 30) + ")";
    let scaleStr: string = "scale(" + scaleWidth + "," + scaleHeight + ")";
    let svgContainer = d3.select(element).append("svg")
      .attr("width", width).attr("height", height)
      .attr("x", 0).attr("y", 0)
      .attr("viewBox", "0 0 " + width + " " + height)
      .append("g").attr("transform", translateStr + " " + scaleStr + " " + "rotate(90)");
    
    for(let o of OBJ.GNOs) {
      svgContainer.append("circle").attr("cx", o.position[0]).attr("cy", o.position[2])
        .attr("r", 1).style("fill", o.color2d)
        .on("click", function(){});
    }

    /* let circles = svgContainer.selectAll("circle").data(this.jsonCircles).enter().append("circle");
    circles.attr("cx", function (d) { return d.x_axis; }).attr("cy", function (d) { return d.y_axis; }).attr("r", function (d) { return d.radius; }).style("fill", function(d) { return d.color; }); */
  }

  ngAfterViewInit() {
    this.renderer3DContainer.nativeElement.appendChild(this.visualizer.renderer.domElement);
    this.visualizer.render();
    this.createChart();
  }

  ngOnChanges(changes: {[property: number]: SimpleChange}) {
    let change = changes["displayMode"];
    if(change.firstChange)
      return;
    this.visualizer.isSwitchBack2D = false;
    this.visualizer.isSwitchBack3D = false;
    this.visualizer.isSwitch3DTo2DDone = false;
    this.visualizer.isSwitch2DTo3DDone = false;

    if(change.previousValue == OBJ.DISPLAY_MODE.D2 && change.currentValue == OBJ.DISPLAY_MODE.D3) {
      this.visualizer.isSwitch2DTo3D = true;
      this.visualizer.isSwitch3DTo2D = false;
    } else if(change.previousValue == OBJ.DISPLAY_MODE.D3 && change.currentValue == OBJ.DISPLAY_MODE.D2) {
      this.visualizer.isSwitch2DTo3D = false;
      this.visualizer.isSwitch3DTo2D = true;
    }
  }

  animation3DEnd($event) {
    if($event.fromState == "void") {
      return;
    }
    //when the 3D is completed faded out, then start drawing 2D
    if(this.visualizer.isSwitch3DTo2DDone) {
      this.visualizer.isSwitchBack2D = true;
      this.visualizer.isSwitchBack3D = false;
      this.visualizer.isSwitch3DTo2D = false;
    } 
    
    if(this.visualizer.isSwitch2DTo3DDone) {
      this.visualizer.isSwitchBack2D = false;
      this.visualizer.isSwitchBack3D = true;
      this.visualizer.isSwitch2DTo3D = false;
    }
      
  }

  detach3DLayout() {
    this.isHide3DDiv = true;
  }

  attach3DLayout() {
    this.isHide3DDiv = false;
  }

}