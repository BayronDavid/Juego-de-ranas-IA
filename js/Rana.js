import * as THREE from 'three';

export default class Rana{
    constructor(x, y, position, color, id){
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
        this.id = id;
        this.en_movimiento = false;

        this.idice_mov = 990;
    }

    newRana(x, y){
        this.rana = new THREE.Mesh(this.geometry, this.material);
        this.rana.position.set(x, y, 0);
        this.rana.name = this.id;
    }

    getRana(){
        return this.rana;
    }

    setPosition(position){
        this.position = position;
    }
    getPosition(){
        return this.position;
    }

    getEnMovimiento(){
        return this.en_movimiento;
    }

    activarParaMover(indice){ //setEnMovimiento
        if(this.indice != indice){
            this.indice = indice;
            this.en_movimiento = true;
        }
    }

    parabolic_shot(v0, angulo0, xMax) {
        let distancia_recorrida = Math.abs(this.x0 - this.x);

        if (distancia_recorrida >= xMax && this.y <= 0) {
            this.x0 = this.rana.position.x;
            this.t = 0;
            this.en_movimiento = false;
            return;
        }
        
        this.x = this.x0 + v0 * Math.cos(angulo0 * Math.PI / 180) * this.t;
        this.y = this.y0 + v0 * Math.sin(angulo0 * Math.PI / 180) * this.t - 0.5 * this.g * this.t * this.t;
        this.y = this.y <= 0 ? 0 : this.y; // para que pare en el suelo y=0; 

        this.t += this.steps
        
        this.rana.position.set(this.x, this.y, 0);
        this.en_movimiento = true;
    }

    mover_derecha_dos_pasos(){
        this.parabolic_shot(6.69, 60, 4);
    }
    mover_derecha_un_paso(){
        this.parabolic_shot(4.6, 60, 2); //5.5
    }

    mover_izquierda_dos_pasos(){
        this.parabolic_shot(6.67, 120, 4);
    }
    mover_izquierda_un_paso(){
        this.parabolic_shot(4.6, 120, 2);
    }

    mover(direccion){
        switch(direccion){
            case 'd1':
                this.mover_derecha_un_paso();
                break;
            case 'd2':
                this.mover_derecha_dos_pasos();
                break;
            case 'i1':
                this.mover_izquierda_un_paso();
                break;
            case 'i2':
                this.mover_izquierda_dos_pasos();
                break;
            default: 
                console.log('Error al mover');
        }
    }

    logger(){
        console.log('Ranna', this.position);
    }
}
