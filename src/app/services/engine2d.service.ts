import { Injectable, ViewChild, ElementRef } from '@angular/core';
import { AnimatorService } from './animator.service';
import * as d3 from 'd3';
import { Subject } from 'rxjs';
import * as t from 'topojson-client';

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

  sampleData: any = { };
  country_ne_coordinations = [{long: -135, lat: 65},{long: -115, lat: 60},{long: -78, lat: 60}];
  state_ne_coordinations = [{long: -135, lat: 65},{long: -115, lat: 58}, {long: -90, lat: 60}, {long: -78, lat: 60}, {long: -116, lat: 52}, {long: -120, lat: 70}];
  city_ne_coordinations = [{long: -114, lat: 54}, {long: -116, lat: 52}, {long: -115, lat: 58}];
  g: any = null;
  selectedCountry: any = null;
  selectedState: any = null;
  projection: any = null;
  path: any = null;
  isWorldMapShown = true;
  isCountryMapShown = false;
  isStateMapShown = false;

  constructor(private animatorService: AnimatorService) {
    let colors = ["#e74c3c", "#b03a2e", "#34495e", "#5b2c6f", "#117a65", "#f1c40f", "#2e86c1", "#1abc9c", "#8e44ad", "#e67e22", 
  "#1e8449", "#b9770e"];
    ["Ont.", "B.C.", "Alta.", "Sask.", "Man.", "Que.", "N.B.", "Yuk.", "Nun.", "N.L.", "N.S.",
	"N.W.T.", "P.E.I."]
		.forEach((d, idx) => { 
			this.sampleData[d]={color:colors[idx]}; 
		});
   }

  createChart1(rendererContainer: ElementRef) {
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

  private zoom = (xyz: any) => {
    this.g.transition().duration(750)
        .attr("transform", "translate(" + this.projection.translate() + ") scale(" + xyz[2] + ") translate(-" + xyz[0] + ",-" + xyz[1] + ")")
    this.g.selectAll("#states").style("stroke-width", 1.0 / xyz[2] + "px");
    this.g.selectAll("#countries").style("stroke-width", 1.0 / xyz[2] + "px");
  }

  private scale_ratio = (d: any) => {
    let window_width = window.innerWidth*0.75, window_height = window.innerHeight*0.75;
    let bounds = this.path.bounds(d);
    let w_scale = (bounds[1][0] - bounds[0][0]) / (window_width);
    let h_scale = (bounds[1][1] - bounds[0][1]) / (window_height);
    let z = .96 / Math.max(w_scale, h_scale);
    let x = (bounds[1][0] + bounds[0][0]) / 2;
    let y = (bounds[1][1] + bounds[0][1]) / 2+ (window_height / z / 6);
    return [x, y, z];
  }

  private tooltipHtml = (n, d) => {	/* function to create html content string in tooltip div. */
    return "<h4>"+n+"</h4><table>"+
      "<tr><td>Low</td><td>"+(d.low)+"</td></tr>"+
      "<tr><td>Average</td><td>"+(d.avg)+"</td></tr>"+
      "<tr><td>High</td><td>"+(d.high)+"</td></tr>"+
      "</table>";
  }

  private updateShownMode = (isWorldShown: boolean, isCountryShown: boolean, isStateShown: boolean) => {
    this.isWorldMapShown = isWorldShown;
    this.g.selectAll(".country-level-mark").transition().duration(200).style("opacity", isWorldShown ? 1 : 0);
    this.isCountryMapShown = isCountryShown
    this.g.selectAll(".state-level-mark").remove();
    this.isStateMapShown = isStateShown
    this.g.selectAll(".city-level-mark").remove();
  }

  private stateNetworkInfo = (d) => {
    d3.select("#tooltip").transition().duration(200).style("opacity", .9); 

    d3.select("#tooltip").html(this.tooltipHtml(d["properties"]["name"], this.sampleData[d["properties"]["abbrev"]]))  
      .style("left", (d3.event.pageX) + "px")     
      .style("top", (d3.event.pageY - 150) + "px");
  }
  
  private stateNetworkInfoHide = () => {
    d3.select("#tooltip").transition().duration(500).style("opacity", 0); 
  }

  private cityClicked = (d) => {
    console.log(d);
  }

  private stateClicked = (d) => {
    if (d && this.selectedState !== d) {
      let xyz = this.scale_ratio(d);
      this.selectedState = d;
      this.updateShownMode(false, false, true)
      this.zoom(xyz);

      this.g.selectAll(".city-level-mark")
        .data(this.city_ne_coordinations).enter().append("image")
        .attr('class', 'city-level-mark')
        .attr('width', 4).attr('height', 4)
        .attr("xlink:href", '../../assets/images/router.png')
        .attr("transform", (d: any) => {return "translate(" + this.projection([d.long, d.lat]) + ")";})
        .on("click", this.cityClicked);;
    } else {
      this.selectedState = null;
      this.countrySelecting(this.selectedCountry);
    }
  }

  
  private countrySelecting = (d) => {
    let width = window.innerWidth*0.75, height = window.innerHeight*0.75;
    this.g.selectAll("#states").remove();
    if (this.selectedCountry) {
      this.g.selectAll("#" + this.selectedCountry.id).style('display', null);
    }

    if (d && this.selectedCountry !== d) {
      this.updateShownMode(false, true, false)
      
      let xyz = this.scale_ratio(d);
      this.selectedCountry = d;

      if (d["id"]  == 'CAN') {
        d3.json("../../assets/states.topo.json").then((us) => {
          this.g.append("g")
            .attr("id", "states").selectAll("path")
            .data(t.feature(us, us["objects"]["states"])["features"]).enter().append("path")
            .attr("id", function(d) { return "state" + d["properties"]["gn_id"]; })
            .attr("class", "active")
            .style("fill",d => { return this.sampleData[d["properties"]["abbrev"]].color; })
            .style("opacity", 0.8).attr("d", this.path)
            .on("mouseover", this.stateNetworkInfo).on("mouseout", this.stateNetworkInfoHide)
            .on("click", this.stateClicked);

          this.g.selectAll("#" + d["id"]).style('display', 'none');

          this.g.selectAll(".state-level-mark")
            .data(this.state_ne_coordinations).enter().append("image")
            .attr('class', 'state-level-mark')
            .attr('width', 20).attr('height', 20)
            .attr("xlink:href", '../../assets/images/switch.png')
            .attr("transform", (d) => {return "translate(" + this.projection([d.long, d.lat]) + ")";
            });
            
        }); 
      }
      this.zoom(xyz);
    } else {
      let xyz = [width / 2, height / 1.5, 1];
      this.selectedCountry = null;
      this.zoom(xyz);
      this.updateShownMode(true, false, false)
    }
  }

  createChart(mapRenderer: ElementRef) {
    let element = mapRenderer.nativeElement;
    let width = window.innerWidth*0.75, height = window.innerHeight*0.75;

    let cityNetworkInfo = (d) => {

    }

    let cityNetworkInfoHide = () => {

    }

    

    let svg = d3.select(element).append("svg")
      .attr("preserveAspectRatio", "xMidYMid")
      .attr("viewBox", "0 0 " + width + " " + height)
      .attr("width", width).attr("height", height);

    this.projection = d3.geoMercator().scale(150).translate([width / 2, height / 1.5]);

    this.path = d3.geoPath().projection(this.projection);

    svg.append("rect").attr("class", "background").attr("width", width)
      .attr("height", height).on("click", this.countrySelecting);

    this.g = svg.append("g");

    d3.json("../../assets/countries.topo.json").then((us) => {
      this.g.append("g")
        .attr("id", "countries").selectAll("path")
        .data(t.feature(us, us["objects"]["countries"])["features"])
        .enter().append("path")
        .attr("id", function(d) { return d["id"]; })
        .attr("d", this.path).on("click", this.countrySelecting);

      this.g.selectAll(".country-level-mark")
        .data(this.country_ne_coordinations)
        .enter().append("image")
        .attr('class', 'country-level-mark')
        .attr('width', 20).attr('height', 20)
        .attr("xlink:href", 'https://cdn3.iconfinder.com/data/icons/softwaredemo/PNG/24x24/DrawingPin1_Blue.png')
        .attr("transform", (d) => {return "translate(" + this.projection([d.long, d.lat]) + ")";
        });
      this.isWorldMapShown = true;
    });

    this.updateShownMode(true, false, false)
    

    
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
