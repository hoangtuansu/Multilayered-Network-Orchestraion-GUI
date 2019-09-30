import { Component, OnInit, ViewChild, ElementRef, OnChanges, SimpleChange, Input, ViewEncapsulation } from '@angular/core';
import { Engine2DService } from 'src/app/services/engine2d.service';
import { trigger, style, state, transition, animate } from '@angular/animations';
import * as OBJ from '../../../models';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { FormControl } from '@angular/forms';

export interface Node {
  icon: string;
  name: string;
}

@Component({
  selector: 'app-topo2d',
  templateUrl: './topo2d.component.html',
  styleUrls: ['./topo2d.component.css'],
  animations: [trigger('fadeOut2DDiv', [
    state('2d-show', style({
      width: '100%',
      height: '100vh',
      position: 'absolute',
      'z-index': 1,
      opacity: 1
    })),
    state('2d-hide', style({
      position: 'absolute',
      width: '100%',
      height: '100vh',
      display: 'none',
      'z-index': 0,
      opacity: 0
    })),
    transition('2d-hide <=> 2d-show', animate('1500ms'))])],
    encapsulation: ViewEncapsulation.None
})
export class Topo2dComponent implements OnInit, OnChanges {
  ngOnInit(): void {
  }
  @ViewChild('renderer2DContainer', { static: false }) renderer2DContainer: ElementRef;
  @Input() isDetailShown: boolean = false;
  
  nodeCtrl = new FormControl();
  filteredNodes: Observable<Node[]>;

  nodes: Node[] = [
    {
      name: 'Arkansas',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
    },
    {
      name: 'California',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
    },
    {
      name: 'Florida',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      icon: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
    },
    {
      name: 'Texas',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
    }
  ];

  constructor(private engine2DService: Engine2DService) {
    this.filteredNodes = this.nodeCtrl.valueChanges
      .pipe(startWith(''), map(node => node ? this._filteredNodes(node as string) : this.nodes.slice())
      );
  }

  private _filteredNodes(value: string): Node[] {
    const filterValue = value.toLowerCase();

    return this.nodes.filter(node => node.name.toLowerCase().indexOf(filterValue) === 0);
  }

  ngAfterViewInit() {
    this.engine2DService.createChart(this.renderer2DContainer);
  }

  ngOnChanges(changes: {[property: number]: SimpleChange}) {
    if(changes["isDetailShown"] != undefined){
      this.engine2DService.enableDetailView(changes["isDetailShown"].currentValue);
      return;
    }
  }

  
}
