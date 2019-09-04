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
  }
  
}
