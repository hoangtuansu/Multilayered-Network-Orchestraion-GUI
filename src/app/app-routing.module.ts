import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* const routes: Routes = [
  {path: '', redirectTo: '/view/0', pathMatch: 'full'},
  {path: 'view/:displayMode', component: TopoVisualizationComponent}]; */

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}

