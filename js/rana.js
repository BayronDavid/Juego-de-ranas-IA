import * as THREE from 'three';

export default class Rana{
    constructor(x, y, position, color){
        this.color      = color || new THREE.Color(0x00ff00);
        this.geometry   = new THREE.BoxGeometry(1, 1, 1);;
        this.material   = new THREE.MeshBasicMaterial({ color: this.color });
        this.position   = position;

        
        this.newRana(x, y);
        
        this.x  = this.rana.position.x;
        this.y  = this.rana.position.y;
        this.x0 = this.rana.position.x; //Posición inicial eje x
        this.y0 = this.rana.position.y; //Posición inicial eje y
        this.t  = 0; //Se inicia el tiempo a t = 0
        this.g  = 9.81; //Aceleración de gravedad
        this.steps  = 0.03; //Aumento del tiempo 
    }

    newRana(x, y){
        this.rana = new THREE.Mesh(this.geometry, this.material);
        this.rana.position.set(x, y, 0);
    }

    getRana(){
        return this.rana;
    }
    setPosition(position){
        this.position = position;
    }

    parabolic_shot(v0, angulo0, xMax) {
        let distancia_recorrida = Math.abs(this.x0 - this.x);

        if (distancia_recorrida <= xMax) {
            this.x = this.x0 + v0 * Math.cos(angulo0 * Math.PI / 180) * this.t;
            distancia_recorrida = Math.abs(this.x0 - this.x);
        }

        this.y = this.y0 + v0 * Math.sin(angulo0 * Math.PI / 180) * this.t - 0.5 * this.g * this.t * this.t;
        this.y = this.y <= 0 ? 0 : this.y;
        this.t += this.steps

        this.rana.position.set(this.x, this.y, 0);
    }

    mover_derecha_dos_pasos(){
        this.parabolic_shot(7.8, 70, 4);
    }
    mover_derecha_un_paso(){
        this.parabolic_shot(5.5, 70, 2);
    }

    mover_izquierda_dos_pasos(){
        this.parabolic_shot(7, 120, 4);
    }
    mover_izquierda_un_paso(){
        this.parabolic_shot(5, 120, 2);
    }

    logger(){
        console.log('Ranna', this.position);
    }
}