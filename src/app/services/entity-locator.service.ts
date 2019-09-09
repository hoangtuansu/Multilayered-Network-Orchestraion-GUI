import { Injectable } from '@angular/core';
import * as THREE from 'three';
import * as OBJ from '../models';

@Injectable({
  providedIn: 'root'
})
export class EntityLocatorService {

  constructor() { }

  locatingNetworkElements(e: OBJ.GNObject2D[]): THREE.Vector2[] {
    let posArr: THREE.Vector2[] = [];
    let nbrCountries = e.filter(d => d.level == OBJ.NODE_LEVEL.COUNTRY).length,
        nbrStates = e.filter(d => d.level == OBJ.NODE_LEVEL.STATE).length,
        nbrCities= e.filter(d => d.level == OBJ.NODE_LEVEL.CITY).length;
    
    let c = Math.ceil(Math.sqrt(nbrCountries)), 
        s = Math.ceil(Math.sqrt(nbrStates)),
        ci = Math.ceil(Math.sqrt(nbrCities));
    let deltaCountryX = 40/c, deltaCountryY = 20/c,
        deltaStateX = 40/s, deltaStateY = 20/s,
        deltaCityX = 40/ci, deltaCityY = 20/ci;
    let idxCountry = 0, idxState = 0, idxCity = 0;
    for(let node of e) {
      switch(node.level) {
        case OBJ.NODE_LEVEL.COUNTRY:
          node.update3DPosition([(idxCountry%c)*deltaCountryX + deltaCountryX/2, 1, Math.floor(idxCountry/c)*deltaCountryY + deltaCountryY/2]);
          idxCountry++;
          break;
        case OBJ.NODE_LEVEL.STATE:
          node.update3DPosition([(idxState%s)*deltaStateX + deltaStateX/2, 1, Math.floor(idxState/s)*deltaStateY + deltaStateY/2]);
          idxState++;
          break;
        case OBJ.NODE_LEVEL.CITY:
          node.update3DPosition([(idxCity%ci)*deltaCityX + deltaCityX/2, 1, Math.floor(idxCity/ci)*deltaCityY + deltaCityY/2]);
          idxCity++;
          break;
        }
    }
    return posArr;
  }
}
