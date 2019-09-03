import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import * as OBJ from '../../../models';
import { EngineCoordinatorService } from 'src/app/services/engine-coordinator.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogDetailsComponent } from '../../panel-details/dialog/dialog-details.component';


@Component({
  selector: 'app-topo-manager',
  templateUrl: './topo-manager.component.html',
  styleUrls: ['./topo-manager.component.css']
})
export class TopoManagerComponent implements OnInit {

  isDetailViewActivate: boolean = false;
  constructor(private engineCoordinatorService: EngineCoordinatorService, public dialog: MatDialog) { }

  ngOnInit() {
  }
}
