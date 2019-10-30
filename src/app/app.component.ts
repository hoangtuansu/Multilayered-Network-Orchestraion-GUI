import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mlo-gui';
  
  constructor(private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {
      this.matIconRegistry.addSvgIcon(
        "world-dc",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/world-data-center.svg")
      );

      this.matIconRegistry.addSvgIcon(
        "country-sw",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/country-switch.svg")
      );

      this.matIconRegistry.addSvgIcon(
        "city-router",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/router.svg")
      );

      this.matIconRegistry.addSvgIcon(
        "switch-3d",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/switch-view-3d.svg")
      );

      this.matIconRegistry.addSvgIcon(
        "layer0",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/layer0.svg")
      );

      this.matIconRegistry.addSvgIcon(
        "layer1",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/layer1.svg")
      );

      this.matIconRegistry.addSvgIcon(
        "layer2",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/layer2.svg")
      );

      this.matIconRegistry.addSvgIcon(
        "go-back",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/arrow_back-24px.svg")
      );

      
  }
  
}
