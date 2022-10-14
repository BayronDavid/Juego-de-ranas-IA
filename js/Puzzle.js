export default class Puzzle{
    constructor(id, tipo, estado, pos_relativa, pos_final){
        this.id     = id;
        this.tipo   = tipo; 
        this.estado = estado;
        this.pos_relativa   = pos_relativa;
        this.pos_final      = pos_final; 
    }
    actualizarPosicionRelativa(direccion){
        switch(direccion){
            case 'd1':
                this.pos_relativa += 2;
                break;
            case 'd2':
                this.pos_relativa += 4;
                break;
            case 'i1':
                this.pos_relativa -= 2;
                break;
            case 'i2':
                this.pos_relativa -= 4;
                break;
        }
    }

    setPosRelativa(pos_relativa){
        this.pos_relativa = pos_relativa;
    }
    getPosRelativa(){
        return this.pos_relativa;
    }
}