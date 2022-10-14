import Nodo from "./Nodo.js";

export default class IA{

    constructor (puzzle){
        this.puzzle         = puzzle;
        this.estadoInicial  = new Nodo(puzzle[2]);
        
        this.cerrado     = [this.estadoInicial];
        this.frontera    = [this.estadoInicial];
    }

    BPA(){
        for(let n=0; n<this.frontera.length; n++){
            let acciones    = []; 
            let nodo_actual = this.frontera[0];
            if(!nodo_actual.getExpandido()){
                if(!this.testObjetivo(nodo_actual)){
                    let expansion =  this.expandir(nodo_actual);
                    nodo_actual.setExpandido(true)
                    if(expansion.length != 0){
                        for (let nodo_expandido = 0; nodo_expandido < expansion.length; nodo_expandido++) {

                            acciones.push(expansion[nodo_expandido].accion);
                            let bandera = false;
                            
                            for (let nodo_cerrado = 0; nodo_cerrado < this.cerrado.length; nodo_cerrado++) {
                                if(this.cerrado[nodo_cerrado].estado == expansion[nodo_expandido].estado){
                                    bandera = true;
                                }
                            }
                            console.log(expansion[nodo_expandido]);
                            if(!bandera){
                                this.cerrado.push(expansion[nodo_expandido]);
                                this.frontera.push(expansion[nodo_expandido]);
                            }
                        }
                        return acciones;
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
        return null;
    }

    solucionar(metodo_busqueda) {
        // while(this.puzzle.length > 0){
            for (let i = 0; i < this.puzzle.length; i++) {
                let nodo = new Nodo(this.puzzle[i]);
                this.cerrado    = [nodo];
                this.frontera   = [nodo];
                // console.log(this.BPA());
                this.BPA();
            }
        // }
    }

    testObjetivo(nodo_actual){
        if(nodo_actual.estado == nodo_actual.rana.pos_final){
            nodo_actual.llego = true;
            // this.puzzle.pop(nodo_actual.estado);
            return true;
        }
        return false;
    }

    

    expandir(nodo_actual){
        let lista_nodos = [];
        let e = nodo_actual.estado;

        if(nodo_actual.es_vacio){
            console.log('Es vacio');
            return null;
        }
        if (this.validarJugada(nodo_actual, 'd1')){ // mover un paso a la derecha
            this.puzzle[e].estado = e + 1;
            this.puzzle[e + 1].estado = e;

            this.puzzle = this.array_move(this.puzzle, e, e+1);

            let nodo = new  Nodo(this.puzzle[this.puzzle[e]]);

            nodo.setPadre(nodo_actual);
            nodo.setAccion('d1');
            lista_nodos.push(nodo);

            return lista_nodos;
        }
        if (this.validarJugada(nodo_actual, 'd2')) { // mover dos pasos a la derecha
            this.puzzle[e].estado = e + 2; 
            this.puzzle[e + 2].estado = e; 

            this.puzzle = this.array_move(this.puzzle, e, e+2)

            let nodo = new Nodo(this.puzzle[e]);

            nodo.setPadre(nodo_actual);
            nodo.setAccion('d2');
            lista_nodos.push(nodo);
            return lista_nodos;
        }
        if (this.validarJugada(nodo_actual, 'i1')) { // mover un paso a la izquiera
            this.puzzle[e].estado = e - 1;
            this.puzzle[e - 1].estado = e;

            let nodo = new Nodo(this.puzzle[e]);

            nodo.setPadre(nodo_actual);
            nodo.setAccion('i1');
            lista_nodos.push(nodo);
        }
        if (this.validarJugada(nodo_actual, 'i2')) { // mover dos pasos a la izquiera
            this.puzzle[e].estado = e - 2;
            this.puzzle[e - 2].estado = e;

            let nodo = new Nodo(this.puzzle[e]);

            nodo.setPadre(nodo_actual);
            nodo.setAccion('i2');
            lista_nodos.push(nodo);
            return lista_nodos;
        }
        return lista_nodos;
    }

    validarJugada(nodo_actual, tipo, direccion){
        let pos = nodo_actual.estado;

        switch(direccion){
            case 'd1':
                console.log('Entro a d1');

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
                            if (this.puzzle[pos + 3] != tipo && this.puzzle[pos + 1] != tipo){ // evalua que la rana de mas adelante sea de diferente 
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
                            if (this.puzzle[pos - 2] != tipo && this.puzzle[pos - 1] != tipo) { // evalua que la rana de mas adelante sea de diferente 
                                return true; // Si la rana de mas adelante es de otro genero, avanza 
                            }
                        } else {
                            return true; // Si no hay mas ranas, avanza. 
                        }
                    }
                }
                break;

            case 'i2':
                if (pos - 2 > 0) { // que no se salga de la matriz
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

    array_move(arr, old_index, new_index) {
        while (old_index < 0) {
            old_index += arr.length;
        }
        while (new_index < 0) {
            new_index += arr.length;
        }
        if (new_index >= arr.length) {
            var k = new_index - arr.length + 1;
            while (k--) {
                arr.push(undefined);
            }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        return arr; // for testing purposes
    };
}