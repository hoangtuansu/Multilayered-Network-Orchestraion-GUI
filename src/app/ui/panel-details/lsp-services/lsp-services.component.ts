import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet, monkeyPatchChartJsTooltip, monkeyPatchChartJsLegend } from 'ng2-charts';

@Component({
  selector: 'app-lsp-services',
  templateUrl: './lsp-services.component.html',
  styleUrls: ['./lsp-services.component.css']
})
export class LspServicesComponent implements OnInit {

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [['IP'], ['Frame'], 'MPLS'];
  public pieChartData: SingleDataSet = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  
  private _selectedLinkorPath: any = null;

  constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  @Input()
  set selectedLinkorPath(l: any) {
    if(l == undefined) {
      return;
    }
    
    this._selectedLinkorPath = l;
    if(l.length == undefined) {  //a link is selected
      this.pieChartLabels = this._selectedLinkorPath.traffic_components;
      this.pieChartData = this._selectedLinkorPath.bw_utilization_components;
    } else if(l.length > 0 ) { //a LSP is selected

    }
    
    
  }

  ngOnInit() {
  }

}
