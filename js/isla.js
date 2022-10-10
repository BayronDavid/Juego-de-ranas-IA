import * as THREE from 'three';

export default class Isla{
    constructor(x){
        this.geometry   = new THREE.CylinderGeometry(0.6, 0.6, 0.1, 8);
        this.material   = new THREE.MeshBasicMaterial({ color: 0x289C05 });
        this.generarIsla(x);
    }

    generarIsla(x){
        this.isla = new THREE.Mesh(this.geometry, this.material);
        this.isla.position.set(x, -0.6, 0);
    }
    
    getIsla(){
        return this.isla;
    }

}