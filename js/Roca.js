import * as THREE from 'three';

export default class Roca{
    constructor(x){
        this.geometry   = new THREE.CylinderGeometry(0.6, 0.6, 0.1, 8);
        this.material   = new THREE.MeshBasicMaterial({ color: 0x289C05 });
        this.generarRoca(x);
    }

    generarRoca(x){
        this.roca = new THREE.Mesh(this.geometry, this.material);
        this.roca.position.set(x, -0.6, 0);
    }
    
    getRoca(){
        return this.roca;
    }

}