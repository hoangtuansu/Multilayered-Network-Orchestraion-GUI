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
    let deltaCountryX = OBJ.CONSTANTS.PLANE_SIZE[1]/c, deltaCountryY = OBJ.CONSTANTS.PLANE_SIZE[0]/c,
        deltaStateX = OBJ.CONSTANTS.PLANE_SIZE[1]/s, deltaStateY = OBJ.CONSTANTS.PLANE_SIZE[0]/s,
        deltaCityX = OBJ.CONSTANTS.PLANE_SIZE[1]/ci, deltaCityY = OBJ.CONSTANTS.PLANE_SIZE[0]/ci;
    let idxCountry = 0, idxState = 0, idxCity = 0;
    for(let node of e) {
      switch(node.level) {
        case OBJ.NODE_LEVEL.COUNTRY:
          let t1 = Math.floor(idxCountry/c)%2;
          let x1 = (idxCountry%c)*deltaCountryX + deltaCountryX/2;
          node.update3DPosition([(t1 == 0 ? x1 : (20 - x1)) - OBJ.CONSTANTS.PLANE_SIZE[1]/2, 15, Math.floor(idxCountry/c)*deltaCountryY + deltaCountryY/2 - OBJ.CONSTANTS.PLANE_SIZE[0]/2]);
          idxCountry++;
          break;
        case OBJ.NODE_LEVEL.STATE:
          let t2 = Math.floor(idxState/s)%2;
          let x2 = (idxState%s)*deltaStateX + deltaStateX/2;
          node.update3DPosition([(t2 == 0 ? x2 : (20 - x2)) - OBJ.CONSTANTS.PLANE_SIZE[1]/2, 10, Math.floor(idxState/s)*deltaStateY + deltaStateY/2 - OBJ.CONSTANTS.PLANE_SIZE[0]/2]);
          idxState++;
          break;
        case OBJ.NODE_LEVEL.CITY:
          let t3 = Math.floor(idxCity/s)%2;
          let x3 = (idxCity%s)*deltaCityX + deltaCityX/2;
          node.update3DPosition([(t3 == 0 ? x3 : (20 - x3)) - OBJ.CONSTANTS.PLANE_SIZE[1]/2, 5, Math.floor(idxCity/ci)*deltaCityY + deltaCityY/2 - OBJ.CONSTANTS.PLANE_SIZE[0]/2]);
          idxCity++;
          break;
        }
    }
    return posArr;
  }
}
