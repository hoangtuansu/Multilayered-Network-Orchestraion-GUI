import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Topo3dComponent } from './ui/topo/topo3d/topo3d.component';
import { Topo2dComponent } from './ui/topo/topo2d/topo2d.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { TopoManagerComponent } from './ui/topo/topo-manager/topo-manager.component';
import { DialogDetailsComponent } from './ui/panel-details/dialog/dialog-details.component';
import {DemoMaterialModule} from './material-module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LinkVisualComponent } from './ui/panel-details/link-visual/link-visual.component';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { LspServicesComponent } from './ui/panel-details/lsp-services/lsp-services.component';
import { LinkTrafficDetailsComponent } from './ui/panel-details/link-traffic-details/link-traffic-details.component';

@NgModule({
  declarations: [
    AppComponent,
    Topo3dComponent,
    Topo2dComponent,
    TopoManagerComponent,
    DialogDetailsComponent,
    LinkVisualComponent,
    LspServicesComponent,
    LinkTrafficDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    DemoMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    ChartsModule
  ],
  entryComponents: [DialogDetailsComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
