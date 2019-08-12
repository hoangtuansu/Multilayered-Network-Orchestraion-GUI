import { Injectable, ViewChild, ElementRef } from '@angular/core';
import { AnimatorService } from './animator.service';
import * as d3 from 'd3';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Engine2DService {
  
  is2DFadingOut: boolean = false;
  is2DFadingIn: boolean = false;
  is2DFadingOutComplete: boolean = false;
  is2DFadingInStart: boolean = false;
  fadingOutCompleteNotifier: Subject<boolean> = new Subject<boolean>();
  fadingInStartNotifier: Subject<boolean> = new Subject<boolean>();

  constructor(private animatorService: AnimatorService) { }

  createChart(rendererContainer: ElementRef) {
    let element = rendererContainer.nativeElement;
    let width = window.innerWidth*0.75, height = window.innerHeight*0.75;
    let scaleWidth = width/40, scaleHeight = height/20;
    let translateStr: string = "translate(" + (width/2 + 30) + "," + (height/2 - 30) + ")";
    let scaleStr: string = "scale(" + scaleWidth + "," + scaleHeight + ")";
    let svgContainer = d3.select(element).append("svg")
      .attr("width", width).attr("height", height)
      .attr("x", 0).attr("y", 0)
      .attr("viewBox", "0 0 " + width + " " + height).append("g")
      .attr("transform", translateStr + " " + scaleStr + " " + "rotate(90)");
    
    for(let o of this.animatorService.getG2DNOs()) {
      svgContainer.append("circle").attr("cx", o.position[0]).attr("cy", o.position[2])
        .attr("r", 1).style("fill", o.color2d)
        .on("click", function(){});
    }

  }
  update() {
    if(this.is2DFadingOut) {
      this.is2DFadingOutComplete = this.animatorService.fadingOut2D();
      if(this.is2DFadingOutComplete) {
        this.fadingOutCompleteNotifier.next(this.is2DFadingOutComplete);
      } else {
        this.update();
      }
    }

    if(this.is2DFadingIn) {
      if(!this.animatorService.fadingIn2D())
        this.update();
      
    }

  }



}
