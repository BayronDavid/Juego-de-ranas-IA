// 62 468426601
// Julián Gómez, Breidy Ospina, Bayrón Morales, Stephanya Gómez
// Docente: Laura Cortes

import Nodo from "./Nodo.js";

export default class IA_test{

    constructor (puzzle, pos_espacio){
        this.estadoInicial          = new Nodo(puzzle);
        this.estadoInicial.rana     = new Nodo(puzzle[pos_espacio]);
        this.estadoInicial.estado   = pos_espacio;
        this.frontera    = [this.estadoInicial];
    }

    BPA(){
        let acciones = [];
        let puzzle  = [];
        for (let n = 0; n < this.frontera.length; n++) {
            let nodo_actual = this.frontera[n];
            if(!nodo_actual.getExpandido()){
                let expansion =  this.expandir(nodo_actual);
                nodo_actual.setExpandido(true)
                    if (expansion){
                        for (let nodo_expandido = 0; nodo_expandido < expansion.length; nodo_expandido++) {
                            acciones.push(expansion[nodo_expandido].accion)
                            this.frontera.push(expansion[nodo_expandido]);
                        }
                    }
                }
                puzzle = nodo_actual.puzzle;
            }
            return acciones;
        }

    expandir(nodo_actual){
        let lista_nodos = [];
        let e = nodo_actual.estado;
        if (this.validarJugada(nodo_actual, 'd1')){ // mover un paso a la derecha - Si el espacio se mueve a la derecha, la rana va hacia la i
            nodo_actual.puzzle[e].estado = e + 1; // Espacio 
            nodo_actual.puzzle[e + 1].estado = e; // Rana
            let aux = nodo_actual.puzzle[e];
            nodo_actual.puzzle[e] = nodo_actual.puzzle[e + 1];
            nodo_actual.puzzle[e + 1] = aux;
            let nodo    = new Nodo(nodo_actual.puzzle);
            nodo.rana   = nodo_actual.puzzle[e + 1];
            nodo.estado = e + 1;
            nodo.setPadre(nodo_actual.estado);
            nodo.setAccion(`${nodo_actual.puzzle[e].id},i1`);
            lista_nodos.push(nodo);
            return lista_nodos;
        }
        if (this.validarJugada(nodo_actual, 'd2')) { // mover dos pasos a la derecha
            nodo_actual.puzzle[e].estado = e + 2; // Espacio 
            nodo_actual.puzzle[e + 2].estado = e; // Rana
            let aux = nodo_actual.puzzle[e];
            nodo_actual.puzzle[e] = nodo_actual.puzzle[e+2];
            nodo_actual.puzzle[e + 2] = aux;
            let nodo    = new Nodo(nodo_actual.puzzle);
            nodo.rana   = nodo_actual.puzzle[e + 2];
            nodo.estado = e + 2;
            nodo.setPadre(nodo_actual.estado);
            nodo.setAccion(`${nodo_actual.puzzle[e].id},i2`);
            lista_nodos.push(nodo);
            return lista_nodos;
        }
        if (this.validarJugada(nodo_actual, 'i1')) { // mover un paso a la izquiera
            nodo_actual.puzzle[e].estado = e - 1; // Espacio 
            nodo_actual.puzzle[e - 1].estado = e; // Rana
            let aux = nodo_actual.puzzle[e];
            nodo_actual.puzzle[e] = nodo_actual.puzzle[e - 1];
            nodo_actual.puzzle[e - 1] = aux;
            let nodo    = new Nodo(nodo_actual.puzzle);
            nodo.rana   = nodo_actual.puzzle[e - 1];
            nodo.estado = e - 1;
            nodo.setPadre(nodo_actual.estado);
            nodo.setAccion(`${nodo_actual.puzzle[e].id},d1`);
            lista_nodos.push(nodo);
            return lista_nodos;
        }
        if (this.validarJugada(nodo_actual, 'i2')) { // mover dos pasos a la izquierda
            nodo_actual.puzzle[e].estado = e - 2; // Espacio 
            nodo_actual.puzzle[e - 2].estado = e; // Rana
            let aux = nodo_actual.puzzle[e];
            nodo_actual.puzzle[e] = nodo_actual.puzzle[e - 2];
            nodo_actual.puzzle[e - 2] = aux;
            let nodo = new Nodo(nodo_actual.puzzle);
            nodo.rana = nodo_actual.puzzle[e - 2];
            nodo.estado = e - 2;
            nodo.setPadre(nodo_actual.estado);
            nodo.setAccion(`${nodo_actual.puzzle[e].id},d2`);
            lista_nodos.push(nodo);
            return lista_nodos;
        }
        return lista_nodos;
    }

    validarJugada(nodo_actual, direccion){
        let e = nodo_actual.estado;
        switch(direccion){
            case 'd1':
                if (e + 1 < nodo_actual.puzzle.length && nodo_actual.puzzle[e + 1].tipo == '+'){ // que no se salga de la matriz
                    if (nodo_actual.puzzle[e + 2]){
                        if (nodo_actual.puzzle[e + 2].tipo == nodo_actual.puzzle[e + 1].tipo){
                            if (nodo_actual.puzzle[e - 1].tipo != nodo_actual.puzzle[e + 1].tipo){
                                return true;
                            }
                        } 
                        if (!nodo_actual.puzzle[e - 2]){
                            return true;
                        }
                        if (nodo_actual.puzzle[e - 1].tipo == nodo_actual.puzzle[e - 2].tipo){
                            if (nodo_actual.puzzle[e + 2].tipo == nodo_actual.puzzle[e + 3].tipo) {
                                return true;
                            }
                        }
                    }else{
                        return true;
                    }
                }
                break;
            case 'd2':
                if (e + 2 < nodo_actual.puzzle.length ) {
                    if (nodo_actual.puzzle[e + 2].tipo == '+') { // que no se salga de la matriz
                        if (nodo_actual.puzzle[e + 1].tipo != nodo_actual.puzzle[e + 2].tipo){
                            return true;
                        }
                    }
                }
                break;
            case 'i1':
                if (e - 1 > 0 && nodo_actual.puzzle[e - 1].tipo == '*') { // que no se salga de la matriz
                    if (nodo_actual.puzzle[e - 2]) {
                        if (nodo_actual.puzzle[e - 2].tipo == nodo_actual.puzzle[e - 1].tipo) {
                            if (nodo_actual.puzzle[e + 1].tipo != nodo_actual.puzzle[e - 1].tipo) {
                                return true;
                            }
                        }
                        if (!nodo_actual.puzzle[e + 2]) {
                            return true;
                        }
                        if (nodo_actual.puzzle[e + 1].tipo == nodo_actual.puzzle[e + 2].tipo) {
                            if (nodo_actual.puzzle[e - 2].tipo == nodo_actual.puzzle[e - 3].tipo) {
                                return true;
                            }
                        }
                    } else {
                        return true;
                    }
                }
                break;
            case 'i2':
                if (e - 2 >= 0) {
                    if (nodo_actual.puzzle[e - 2].tipo == '*') { // que no se salga de la matriz
                        if (nodo_actual.puzzle[e - 1].tipo != nodo_actual.puzzle[e - 2].tipo) {
                            return true;
                        }
                    }
                }
                break;
            }

        return false;
    }
}