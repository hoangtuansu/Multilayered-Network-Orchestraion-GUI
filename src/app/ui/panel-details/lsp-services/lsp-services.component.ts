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
  
  public pieChartLabels: Label[] = [['IP'], ['Unused']];
  public pieChartData: SingleDataSet = [20, 80];
  public pieChartLabels1: Label[] = [['Service 1'], ['Service 2'], ['Service 3']];
  public pieChartData1: SingleDataSet = [20, 30, 50];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
    this.pieChartLabels = [['IP'], ['Unused']];
    this.pieChartData = [Math.round(Math.random()*50), Math.round(Math.random()*50)];
    if(Math.random() < 0.3) {
      this.pieChartLabels1 = [['Service 1'], ['Service 2'], ['Service 3']];
      this.pieChartData1 = [Math.round(Math.random()*33), Math.round(Math.random()*33), Math.round(Math.random()*33)];
    } else if(Math.random() < 0.6) {
      this.pieChartLabels1 = [['Service A'], ['Service B'], ['Service C'], ['Service D'], ['Service E']];
      this.pieChartData1 = [Math.round(Math.random()*20), Math.round(Math.random()*20), Math.round(Math.random()*20), Math.round( Math.random()*20), Math.round(Math.random()*20)];
    } else {
      this.pieChartLabels1 = [['Service Cienna'], ['Service Virtuora'], ['Service NorthStar'], ['Service Synchro'] ];
      this.pieChartData1 = [Math.round(Math.random()*25), Math.round(Math.random()*25), Math.round(Math.random()*25), Math.round(Math.random()*25)];
    }
    
  }

  ngOnInit() {
  }
  

}
