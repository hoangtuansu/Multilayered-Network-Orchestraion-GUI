import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Topo3dComponent } from './ui/topo3d/topo3d.component';
import { Topo2dComponent } from './ui/topo2d/topo2d.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { TopoManagerComponent } from './ui/topo-manager/topo-manager.component';
import { PanelDetailsComponent } from './ui/panel-details/panel-details.component';

@NgModule({
  declarations: [
    AppComponent,
    Topo3dComponent,
    Topo2dComponent,
    TopoManagerComponent,
    PanelDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
