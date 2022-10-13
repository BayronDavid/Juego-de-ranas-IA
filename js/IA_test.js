import Nodo from "./Nodo.js";

export default class IA_test{

    constructor (puzzle){
        this.puzzle         = puzzle;
        this.estadoInicial  = new Nodo(puzzle[3]);
        
        this.cerrado     = [this.estadoInicial];
        this.frontera    = [this.estadoInicial];
    }

    BPA(){
        for (let n = 0; n < this.frontera.length; n++) {
            let nodo_actual = this.frontera[n];
            if(!nodo_actual.getExpandido()){
                if(!this.testObjetivo(nodo_actual)){
                    let expansion =  this.expandir(nodo_actual);
                    nodo_actual.setExpandido(true)
                    if(expansion){

                        
                        for (let nodo_expandido = 0; nodo_expandido < expansion.length; nodo_expandido++) {
                            console.log(this.puzzle, nodo_expandido);
                            // console.log(expansion[nodo_expandido].accion);
                            // acciones.push(expansion[nodo_expandido].accion);
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
        return null;
    }

    solucionar(metodo_busqueda) {
        // while(this.puzzle.length > 0){
            for (let i = 0; i < this.puzzle.length; i++) {
                console.log(this.BPA());
            }
        // }
    }

    testObjetivo(nodo_actual){
        if(nodo_actual.rana.tipo == '_'){
            return false;
        }
        if(nodo_actual.rana.estado == nodo_actual.rana.e_final){
            console.log('test objetivo passed', nodo_actual);
            this.puzzle.pop(nodo_actual.estado);
            return true;
        }
        return false;
    }

    

    expandir(nodo_actual){
        let lista_nodos = [];
        let tipo = nodo_actual.rana.tipo;

        if (this.validarJugada(nodo_actual, tipo, 'd1')){ // mover un paso a la derecha - Si el espacio se mueve a la derecha, la rana va hacia la i
            let e = nodo_actual.estado;

            this.puzzle[e].estado = e + 1; // Espacio 
            this.puzzle[e + 1].estado = e; // Rana

            this.puzzle = this.array_move(this.puzzle, e, e+1)
            
            let nodo = new Nodo(this.puzzle[e + 1]);

            nodo.setPadre(nodo_actual);
            nodo.setAccion(`${this.puzzle[e].id}, '-1'`);
            lista_nodos.push(nodo);
            
            return lista_nodos;
        }
        if (this.validarJugada(nodo_actual, tipo, 'd2')) { // mover dos pasos a la derecha
            let e = nodo_actual.estado;

            this.puzzle[e].estado = e + 2; // Espacio 
            this.puzzle[e + 2].estado = e; // Rana

            this.puzzle = this.array_move(this.puzzle, e, e + 2)


            let nodo = new Nodo(this.puzzle[e + 2]);

            nodo.setPadre(nodo_actual);
            nodo.setAccion(`${this.puzzle[e].id}, '-2'`);
            lista_nodos.push(nodo);
            return lista_nodos;

        }
        if (this.validarJugada(nodo_actual, tipo, 'i1')) { // mover un paso a la izquiera
            let e = nodo_actual.estado;

            this.puzzle[e].estado = e - 1; // Espacio 
            this.puzzle[e - 1].estado = e; // Rana

            this.puzzle = this.array_move(this.puzzle, e, e - 1)

            let nodo = new Nodo(this.puzzle[e - 1]);

            nodo.setPadre(nodo_actual);
            nodo.setAccion(`${this.puzzle[e].id}, '+1'`);
            lista_nodos.push(nodo);
            return lista_nodos;

        }
        if (this.validarJugada(nodo_actual, tipo, 'i2')) { // mover dos pasos a la izquierda
            let e = nodo_actual.estado;
            
            this.puzzle[e].estado = 2; // Espacio 
            this.puzzle[e - 2].estado = 4; // Rana
            
            // console.log('antes', this.puzzle);
            this.puzzle = this.array_move(this.puzzle, e, e-2)
            // console.log('despues', this.puzzle);

            let nodo = new Nodo(this.puzzle[e - 2]);

            nodo.setPadre(nodo_actual);
            nodo.setAccion(`${this.puzzle[e].id}, '+2'`);
            lista_nodos.push(nodo);
            return lista_nodos;

        }
    }

    validarJugada(nodo_actual, tipo, direccion){
        // [4] e-1 -> 
        // [2] e+2
        // Puede saltar hacia la izquierda si e+1 = _ && e+2 != e

        let e = nodo_actual.estado;

        switch(direccion){
            case 'd1':
                if (e + 1 < this.puzzle.length && this.puzzle[e + 1].tipo == '+'){ // que no se salga de la matriz
                    if (this.puzzle[e - 1]){
                        if (this.puzzle[e + 1].tipo != this.puzzle[e - 1].tipo){
                            return true;
                        }
                    }else{
                        return true;
                    }
                }
                break;

            case 'd2':
                if (e + 2 < this.puzzle.length && this.puzzle[e + 2].tipo == '+'){ // que no se salga de la matriz
                    if(this.puzzle[e + 1].tipo != this.puzzle[e + 2].tipo){
                        return true;
                    }
                }
                break;

            case 'i1':
                if (e - 1 < this.puzzle.length && this.puzzle[e - 1].tipo == '*') { // que no se salga de la matriz
                    if (this.puzzle[e + 1]) {
                        if (this.puzzle[e + 1].tipo != this.puzzle[e - 1].tipo) {
                            return true;
                        }
                    } else {
                        return true;
                    }
                }
                break;

            case 'i2':
                if (e - 2 < this.puzzle.length && this.puzzle[e - 2].tipo == '*') { // que no se salga de la matriz
                    if (this.puzzle[e - 1].tipo != this.puzzle[e - 2].tipo) {
                        return true;
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
    }
}