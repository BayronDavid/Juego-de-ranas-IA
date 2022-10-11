export default class Nodo {
    constructor(rana){
        this.rana = rana || null;

        this.padre      = null;
        this.estado     = this.rana.posicion;
        this.accion     = '';
        this.expandido  = false;

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