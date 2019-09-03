import { Injectable, ElementRef } from '@angular/core';
import { AnimatorService } from './animator.service';
import * as d3 from 'd3';
import * as OBJ from '../models';
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

  provinceColorMapping : any = { };
  
  g: any = null;
  selectedCountry: any = null;
  selectedState: any = null;
  projection: any = null;
  path: any = null;
  isWorldMapShown = true;
  isCountryMapShown = false;
  isStateMapShown = false;
  displayWorldLevelNotifier: Subject<boolean> = new Subject<boolean>();
  isDetailEnabled: boolean = false;
  selectedNodeForDetailNotifier: Subject<any> = new Subject<any>();

  constructor(private animatorService: AnimatorService) {
    let colors = ["#e74c3c", "#2ecc71", "#34495e", "#5b2c6f", "#117a65", "#f1c40f", "#2e86c1", "#1abc9c", "#8e44ad", "#e67e22", 
  "#1e8449", "#b9770e"];
    ["Ont.", "B.C.", "Alta.", "Sask.", "Man.", "Que.", "N.B.", "Yuk.", "Nun.", "N.L.", "N.S.",
	"N.W.T.", "P.E.I."]
		.forEach((d, idx) => { 
			this.provinceColorMapping[d]={color:colors[idx]}; 
		});
   }

  enableDetailView(e: boolean) {
    this.isDetailEnabled = e;
    this.resetSelectedEntity();
  }

  private zoom = (xyz: any) => {
    this.resetSelectedEntity();
    this.g.transition().duration(750)
        .attr("transform", "translate(" + this.projection.translate() + ") scale(" + xyz[2] + ") translate(-" + xyz[0] + ",-" + xyz[1] + ")")
    this.g.selectAll("#states").style("stroke-width", 1.0 / xyz[2] + "px");
    this.g.selectAll("#countries").style("stroke-width", 1.0 / xyz[2] + "px");
  }

  private scale_ratio = (d: any) => {
    let window_width = window.innerWidth, window_height = window.innerHeight;
    let bounds = this.path.bounds(d);
    let w_scale = (bounds[1][0] - bounds[0][0]) / (window_width);
    let h_scale = (bounds[1][1] - bounds[0][1]) / (window_height);
    let z = .96 / Math.max(w_scale, h_scale);
    let x = (bounds[1][0] + bounds[0][0]) / 2;
    let y = (bounds[1][1] + bounds[0][1]) / 2+ (window_height / z / 6);
    return [x, y, z];
  }

  private updateShownMode = (isWorldShown: boolean, isCountryShown: boolean, isStateShown: boolean) => {
    this.isWorldMapShown = isWorldShown;
    this.g.selectAll(".country-level-mark").transition().duration(750).style("opacity", isWorldShown ? 1 : 0);
    this.g.selectAll(".country-level-link").transition().duration(750).style("opacity", isWorldShown ? 1 : 0);
    this.displayWorldLevelNotifier.next(isWorldShown);
    this.isCountryMapShown = isCountryShown
    this.g.selectAll(".state-level-mark").remove();
    this.g.selectAll(".state-level-link").remove();
    this.isStateMapShown = isStateShown
    this.g.selectAll(".city-level-mark").remove();
    this.g.selectAll(".city-level-link").remove();
  }

  private resetSelectedEntity = () => {
    d3.selectAll('.country-level-mark').attr('selected', null);
    d3.selectAll('.country-level-mark').attr("xlink:href", (e) => {return e['icon_url'];});
    d3.selectAll('.country-level-link').attr('selected', null);
    d3.selectAll('.state-level-mark').attr('selected', null);
    d3.selectAll('.state-level-mark').attr("xlink:href", (e) => {return e['icon_url'];});
  }

  private stateClicked = (d) => {
    if (d && this.selectedState !== d) {
      let xyz = this.scale_ratio(d);
      this.selectedState = d;
      this.updateShownMode(false, false, true)
      this.zoom(xyz);

      this.g.selectAll(".city-level-link").data(OBJ.G2DLOs.filter((d) => { return d.node1.level == OBJ.NODE_LEVEL.CITY && d.node2.level == OBJ.NODE_LEVEL.CITY;}))
        .enter().append("line").attr('class', 'city-level-link')
        .style("stroke", (d) => {return d.color;}).style("stroke-width", (d) => {return d.width;})
        .attr("id", (d) => {return d.name;})
        .attr("x1", (d) => {return this.projection([d.node1.long_pos[0], d.node1.long_pos[1]])[0] + d.node1.size[0]/2;})
        .attr("y1", (d) => {return this.projection([d.node1.long_pos[0], d.node1.long_pos[1]])[1] + d.node1.size[1]/2;})
        .attr("x2", (d) => {return this.projection([d.node2.long_pos[0], d.node2.long_pos[1]])[0] + d.node2.size[0]/2;})
        .attr("y2", (d) => {return this.projection([d.node2.long_pos[0], d.node2.long_pos[1]])[1] + d.node2.size[0]/2;})
        .on("click", this.entitySelecting)
        .on("mouseover", this.entityMouseOver)
        .on("mouseout", this.entityMouseOut);

      this.g.selectAll(".city-level-mark")
        .data(OBJ.G2DNOs.filter(function(d) { return d.level == OBJ.NODE_LEVEL.CITY; }))
        .enter().append("image")
        .attr('id', d => {return d.id;})
        .attr('class', 'city-level-mark')
        .attr('width', (d) => {return d.size[0];})
        .attr('height', (d) => {return d.size[1];})
        .attr("xlink:href", (d) => {return d.icon_url;})
        .attr("transform", (d) => {return "translate(" + this.projection([d.long_pos[0], d.long_pos[1]]) + ")";})
        .on("click", this.entitySelecting)
        .on("mouseover", this.entityMouseOver)
        .on("mouseout", this.entityMouseOut);
      
    } else {
      this.selectedState = null;
      this.countryClicked(this.selectedCountry);
    }
  }
  
  private countryClicked = (d) => {
    let width = window.innerWidth*0.8, height = window.innerHeight;
    this.g.selectAll("#states").remove();
    if (this.selectedCountry) {
      this.g.selectAll("#" + this.selectedCountry.id).style('display', null);
    }

    if (d && this.selectedCountry !== d) {
      this.updateShownMode(false, true, false)
      
      let xyz = this.scale_ratio(d);
      this.selectedCountry = d;

      if (d["id"]  == 'CAN') {
        d3.json("../../assets/states.topo.json").then((us: any) => {
          this.g.append("g")
            .attr("id", "states").selectAll("path")
            .data(t.feature(us, us["objects"]["states"])["features"]).enter().append("path")
            .attr("id", function(d) { return "state" + d["properties"]["gn_id"]; })
            .attr("class", "active")
            .style("fill",d => { return this.provinceColorMapping[d["properties"]["abbrev"]].color; })
            .style("opacity", 0.8).attr("d", this.path)
            .on("click", this.stateClicked);

          this.g.selectAll("#" + d["id"]).style('display', 'none');

          this.g.selectAll(".state-level-link").data(OBJ.G2DLOs.filter((d) => { return d.node1.level == OBJ.NODE_LEVEL.STATE && d.node2.level == OBJ.NODE_LEVEL.STATE;}))
            .enter().append("line").attr('class', 'state-level-link')
            .style("stroke", d => {return d.color;}).style("stroke-width", 1)
            .attr("id", (d) => {return d.name;})
            .attr("x1", (d) => {return this.projection([d.node1.long_pos[0], d.node1.long_pos[1]])[0] + d.node1.size[0]/2;})
            .attr("y1", (d) => {return this.projection([d.node1.long_pos[0], d.node1.long_pos[1]])[1] + d.node1.size[1]/2;})
            .attr("x2", (d) => {return this.projection([d.node2.long_pos[0], d.node2.long_pos[1]])[0] + d.node2.size[0]/2;})
            .attr("y2", (d) => {return this.projection([d.node2.long_pos[0], d.node2.long_pos[1]])[1] + d.node2.size[0]/2;})
            .on("click", this.entitySelecting)
            .on("mouseover", this.entityMouseOver)
            .on("mouseout", this.entityMouseOut);

          this.g.selectAll(".state-level-mark")
            .data(OBJ.G2DNOs.filter(function(d) { return d.level == OBJ.NODE_LEVEL.STATE; }))
            .enter().append("image")
            .attr('id', d => {return d.id;})
            .attr('class', 'state-level-mark')
            .attr('width', (d) => {return d.size[0];})
            .attr('height', (d) => {return d.size[1];})
            .attr("xlink:href", (d) => {return d.icon_url;})
            .attr("transform", (d) => {return "translate(" + this.projection([d.long_pos[0], d.long_pos[1]]) + ")";})
            .on("click", this.entitySelecting)
            .on("mouseover", this.entityMouseOver)
            .on("mouseout", this.entityMouseOut);
            
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
    let width = window.innerWidth, height = window.innerHeight;

    let svg = d3.select(element).append("svg")
      .attr("preserveAspectRatio", "xMidYMid")
      .attr("viewBox", "0 0 " + width + " " + height)
      .attr("width", width).attr("height", height);

    this.projection = d3.geoMercator().scale(150).translate([width / 2, height / 1.5]);

    this.path = d3.geoPath().projection(this.projection);

    svg.append("rect").attr("class", "background").attr("width", width)
      .attr("height", height).on("click", this.countryClicked);

    this.g = svg.append("g");

    d3.json("../../assets/countries.topo.json").then((us: any) => {
      this.g.append("g")
        .attr("id", "countries").selectAll("path")
        .data(t.feature(us, us["objects"]["countries"])["features"])
        .enter().append("path")
        .attr("id", function(d) { return d["id"]; })
        .attr("d", this.path).on("click", this.countryClicked);

      this.g.selectAll(".country-level-link").data(OBJ.G2DLOs.filter((d) => { return d.node1.level == OBJ.NODE_LEVEL.COUNTRY && d.node2.level == OBJ.NODE_LEVEL.COUNTRY;}))
        .enter().append("line").attr('class', 'country-level-link')
        .style("stroke", "red").style("stroke-width", 3)
        .attr("id", (d) => {return d.name;})
        .attr("x1", (d) => {return this.projection([d.node1.long_pos[0], d.node1.long_pos[1]])[0] + d.node1.size[0]/2;})
        .attr("y1", (d) => {return this.projection([d.node1.long_pos[0], d.node1.long_pos[1]])[1] + d.node1.size[1]/2;})
        .attr("x2", (d) => {return this.projection([d.node2.long_pos[0], d.node2.long_pos[1]])[0] + d.node2.size[0]/2;})
        .attr("y2", (d) => {return this.projection([d.node2.long_pos[0], d.node2.long_pos[1]])[1] + d.node2.size[0]/2;})
        .on("click", this.entitySelecting)
        .on("mouseover", this.entityMouseOver)
        .on("mouseout", this.entityMouseOut);

      this.g.selectAll(".country-level-mark").data(OBJ.G2DNOs.filter(function(d) { return d.level == OBJ.NODE_LEVEL.COUNTRY; }))
        .enter().append("image").attr('class', 'country-level-mark')
        .attr('id', d => {return d.id;})
        .attr('width', d => {return d.size[0];}).attr('height', d => {return d.size[1];})
        .attr("xlink:href", d => {return d.icon_url;})
        .attr("transform", d => {return "translate(" + this.projection([d.long_pos[0], d.long_pos[1]]) + ")";})
        .on("click", this.entitySelecting)
        .on("mouseover", this.entityMouseOver)
        .on("mouseout", this.entityMouseOut);
    });

    this.updateShownMode(true, false, false)
  }

  //#region Handling mouse click, hover, out event on network nodes/links
  private entitySelecting = (d) => {
    if(!this.isDetailEnabled)
      return;
    this.resetSelectedEntity();
    console.log(d.id);
    d3.select('#' + d.id).attr('selected', true)
    .attr('xlink:href', (e) => {return e["icon_selected_url"];});
    this.selectedNodeForDetailNotifier.next(d);
  }


  private entityMouseOver = (d) => {
    if(!this.isDetailEnabled)
      return;
    let did = '#' + d.id;
    if(d3.select(did).attr('selected') == null) {
      d3.select(did).attr("xlink:href", (e) => {return e["icon_hover_url"];});
    }
  }

  private entityMouseOut = (d) => {
    if(!this.isDetailEnabled)
      return;
    let did = '#' + d.id;
    if(d3.select(did).attr('selected') == null) {
      d3.select(did).attr("xlink:href", (e) => {return e["icon_url"];});
    }
  }

  //#endregion



}
