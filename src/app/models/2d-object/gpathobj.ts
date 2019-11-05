import { GLinkOBJ} from './glinkobj';
import * as THREE from 'three';

export class GPathOBJ {
    id: any = 0;
    name: string;
    linkIDs: string[];
  
    constructor(lids: string[]) {
        this.linkIDs = lids;
    }
  
    generateMesh(): THREE.Group {
        let g = new THREE.Group();
        for(let lid of this.linkIDs) {
            
        }
        //g.add(this.mesh);
        return g;
    }
  }