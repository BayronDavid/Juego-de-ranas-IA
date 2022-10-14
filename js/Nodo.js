export default class Nodo {
    constructor(puzzle){
        this.rana       =  null;
        this.padre      = '';
        this.estado     = 0;
        this.accion     = '';
        this.expandido  = false;
        this.puzzle     = puzzle;
        this.llego      = false;
        this.pos_relativa  = false;
        
    }

    llego(){
        this.rana.pos_relativa == this.rana.pos_final ? true:false;
    }

    setPadre(padre){
        this.padre = padre;
    }

    setEstado(estado){
        this.estado = estado;
    }

    setAccion(accion){
        this.accion = accion;
    }

    setExpandido(expandido){
        this.expandido = expandido;
    }

    getPadre (){
        return this.padre
    }

    getEstado(){
        return this.estado;
    }

    getAccion(){
        return this.accion;
    }

    getExpandido(){
        return this.expandido;
    }

}