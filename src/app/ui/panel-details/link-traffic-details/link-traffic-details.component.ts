import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsTooltip, monkeyPatchChartJsLegend } from 'ng2-charts';
import * as OBJ from '../../../models';

@Component({
  selector: 'app-link-traffic-details',
  templateUrl: './link-traffic-details.component.html',
  styleUrls: ['./link-traffic-details.component.css']
})
export class LinkTrafficDetailsComponent implements OnInit {

  
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [['IP'], ['Frame'], ['MPLS']];
  public pieChartData: SingleDataSet = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  
  private _selectedLink: any = null;
  private linkComponentTitle: string = '';
  constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  @Input()
  set selectedLink(l: any) {
    if(l == undefined || l.traffic_components == undefined) {
      return;
    }
    
    this._selectedLink = l;
    this.pieChartLabels = this._selectedLink.traffic_components;
    this.pieChartData = this._selectedLink.bw_utilization_components;
    this.linkComponentTitle = 'Traffic Components'
    if(l.type == OBJ.LINK_TYPE.DOMAIN) {
      if(l.node1.level == OBJ.NODE_LEVEL.STATE) {
        this.linkComponentTitle = 'Traffic Components';
      } else if(l.node1.level == OBJ.NODE_LEVEL.CITY) {
        this.linkComponentTitle = 'Link Services';
      }
    }
    
  }

  ngOnInit() {
  }

}
