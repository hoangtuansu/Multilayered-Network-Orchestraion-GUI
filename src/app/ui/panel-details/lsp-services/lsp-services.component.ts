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
  public pieChartLabels1: Label[] = [['Service 1'], ['Service 2'], ['Service']];
  public pieChartData1: SingleDataSet = [20, 30, 50];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
  }
  

}
