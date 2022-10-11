import Nodo from "./Nodo.js";

export default class IA{

    constructor (puzzle){
        this.puzzle         = puzzle;
        this.estadoInicial  = new Nodo(puzzle[0]);
        
        this.cerrado     = [this.estadoInicial];
        this.frontera    = [this.estadoInicial];

        console.log(puzzle);
    }

    BPA(){
        for(n=0; n<this.frontera.length; n++){
            let nodo_actual = this.frontera[0];

            if(!nodo_actual.getExpandido){
                if(!this.testObjetivo(nodo_actual)){
                    let expansion =  this.expandir(nodo_actual);

                    nodo_actual.setExpandido(true)

                    if(expansion){
                        for (let nodo_expandido = 0; nodo_expandido < expansion.length; nodo_expandido++) {
                            let bandera = false;
                            
                            for (let nodo_cerrado = 0; nodo_cerrado < this.cerrado.length; nodo_cerrado++) {
                                if(this.cerrado[nodo_cerrado].estado == expansion[nodo_expandido].estado){
                                    bandera = true;
                                }
                            }
                            if(!bandera){
                                this.cerrado.push(expansion[nodo_expandido]);
                                this.frontera.push(expansion[nodo_expandido]);
                            }
                        }
                    }
                }else{
                    let acciones = [];
                    acciones.push(nodo_actual.getAccion());

                    for (let nodo = this.frontera.length-1; nodo >= 0; nodo--) {
                        if(nodo_actual.getPadre().estado = this.frontera[nodo].estado){
                            nodo_actual = this.frontera[nodo];
                            acciones.push(nodo_actual.getAccion());
                        }
                    }
                    return acciones;
                }
            }
        }
    }

    testObjetivo(nodo_actual){
        if(nodo_actual.estado == nodo_actual.rana.pos_final){
            return true;
        }
        return false;
    }

    expandir(nodo_actual){
        let lista_nodos = [];
        let tipo = nodo_actual.tipo;

        if(nodo_actual.es_vacio){
            return null;
        }

        if (validarjugada(nodo_actual, tipo, 'd1')){ // mover un paso a la derecha
            let nodo = Nodo(this.puzzle[nodo_actual.posicion+1]);
            nodo.setPadre(nodo_actual);
            nodo.setAccion('d1');
            lista_nodos.push(nodo);
        }
        if (validarjugada(nodo_actual, tipo, 'd2')) { // mover dos pasos a la derecha
            let nodo = Nodo(this.puzzle[nodo_actual.posicion + 2]);
            nodo.setPadre(nodo_actual);
            nodo.setAccion('d2');
            lista_nodos.push(nodo);
        }
        if (validarjugada(nodo_actual, tipo, 'i1')) { // mover un paso a la izquiera
            let nodo = Nodo(this.puzzle[nodo_actual.posicion - 1]);
            nodo.setPadre(nodo_actual);
            nodo.setAccion('i1');
            lista_nodos.push(nodo);
        }
        if (validarjugada(nodo_actual, tipo, 'i2')) { // mover dos pasos a la izquiera
            let nodo = Nodo(this.puzzle[nodo_actual.posicion - 2]);
            nodo.setPadre(nodo_actual);
            nodo.setAccion('i2');
            lista_nodos.push(nodo);
        }
        return lista_nodos;
    }

    validarjugada(nodo_actual, tipo, direccion){
        let pos = nodo_actual.posicion;

        switch(direccion){
            case 'd1':
                if (pos+1 < this.puzzle.length){ // que no se salga de la matriz
                    if(this.puzzle[pos+1].tipo == '_'){ // que la posicion de adelante este vacia
                        if (this.puzzle[pos + 2]) { // si existe una rana mas adelante
                            if(this.puzzle[pos + 2] != tipo){ // evalua que la rana de mas adelante sea de diferente 
                                return true; // Si la rana de mas adelante es de otro genero, avanza 
                            }                            
                        }else{
                            return true; // Si no hay mas ranas, avanza. 
                        }
                    }
                }
                break;

            case 'd2':
                if (pos+2 < this.puzzle.length){ // que no se salga de la matriz
                    if(this.puzzle[pos+2].tipo == '_'){ // que la posicion de adelante este vacia
                        if (this.puzzle[pos + 3]) { // si existe una rana mas adelante
                            if(this.puzzle[pos + 3] != tipo){ // evalua que la rana de mas adelante sea de diferente 
                                return true; // Si la rana de mas adelante es de otro genero, avanza 
                            }                            
                        }else{
                            return true; // Si no hay mas ranas, avanza. 
                        }
                    }
                }
                break;

            case 'i1':
                if (pos - 1 >= 0) { // que no se salga de la matriz
                    if (this.puzzle[pos - 1].tipo == '_') { // que la posicion de adelante este vacia
                        if (this.puzzle[pos - 2]) { // si existe una rana mas adelante
                            if (this.puzzle[pos - 2] != tipo) { // evalua que la rana de mas adelante sea de diferente 
                                return true; // Si la rana de mas adelante es de otro genero, avanza 
                            }
                        } else {
                            return true; // Si no hay mas ranas, avanza. 
                        }
                    }
                }
                break;

            case 'i2':
                if (pos - 2 < 0) { // que no se salga de la matriz
                    if (this.puzzle[pos - 2].tipo == '_') { // que la posicion de adelante este vacia
                        if (this.puzzle[pos - 3]) { // si existe una rana mas adelante
                            if (this.puzzle[pos - 3] != tipo) { // evalua que la rana de mas adelante sea de diferente 
                                return true; // Si la rana de mas adelante es de otro genero, avanza 
                            }
                        } else {
                            return true; // Si no hay mas ranas, avanza. 
                        }
                    }
                }
                break;
        }

        return false;
    }
}