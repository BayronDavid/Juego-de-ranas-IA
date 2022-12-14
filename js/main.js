// Julián Gómez, Breidy Ospina, Bayrón Morales, Stephanya Gómez
// Docente: Laura Cortes

import * as THREE from 'three';
import Rana from './Rana.js';
import Roca from './Roca.js';
import IA from './IA_test.js';
import Puzzle from './Puzzle.js';

var play = false;

var container       = document.getElementById('canvas');
var canvasWidth     = container.offsetWidth;
var canvasHeight    = container.offsetHeight;

const scene         = new THREE.Scene();
scene.background    = new THREE.Color(255, 255, 255)
const camera        = new THREE.OrthographicCamera(window.innerWidth / - 150, window.innerWidth / 150, window.innerHeight / 150, window.innerHeight / - 100, 1, 100);

const renderer      = new THREE.WebGLRenderer();
renderer.setSize(canvasWidth, canvasHeight);
document.body.appendChild(renderer.domElement);
container.appendChild(renderer.domElement);

var n_Machos_input      = document.getElementById('nMachosInputRange');
var n_Hembras_input     = document.getElementById('nHembrasInputRange');
// var n_Espacios_input    = document.getElementById('neEspaciosInputRange');
var playBtn             = document.getElementById('playButton');
var pasos_box           = document.getElementById('pasos');

var ranas       = [];
var rocas       = [];
var puzzle      = [];
var estado      = 0;

var movimiento_actual = '';
var id_ult_mov  = '';
var movimientos = '';
var indice_mov  =  0;

function generarRanas(n_machos, n_hembras, n_espacios){
    let n = (n_machos + n_hembras + n_espacios);
    let contador_id =1;
    for (let x = -n; x < n; x+=2) {
        if (estado < n_machos) {
            ranas.push(new Rana(x, 0, x, null, `RM${contador_id}`, 'https://i.postimg.cc/yYQzCMpN/rana-H.png'));
            rocas.push(new Roca(x));
            puzzle.push(new Puzzle(`RM${contador_id}`, '*', estado, x, x*-1));
            
            contador_id = contador_id>3?1: contador_id+=1 ;
        } else if (estado >= n_machos && estado < (n_machos + n_espacios)) {
            rocas.push(new Roca(x));
            puzzle.push(new Puzzle(`___`, '_', estado, x, x * -1));

        } else{
            contador_id = contador_id > 3 ? 1 : contador_id += 1;
            ranas.push(new Rana(x, 0, x, null, `RH${contador_id}`, 'https://i.postimg.cc/1381mvbr/rana-M.png'));
            rocas.push(new Roca(x));
            puzzle.push(new Puzzle(`RH${contador_id}`, '+', estado, x, x * -1));

        }
        estado++;
    }
}

function agregarRanasEscena(){
    ranas.forEach( item => scene.add(item.getRana()));
    rocas.forEach( item => scene.add(item.getRoca()));
}
function limpiarEscena(){
    ranas.forEach( item => scene.remove(item.getRana()));
    rocas.forEach( item => scene.remove(item.getRoca()));
    ranas   = [];
    rocas   = [];
    puzzle  = []
    estado  = 0;
    movimiento_actual = '';
    movimientos = '';
    indice_mov = 0;
    pasos_box.innerHTML = '';
}

playBtn.addEventListener('click', ()=>{
    limpiarEscena();
    generarRanas(parseInt(n_Machos_input.value), parseInt(n_Hembras_input.value), parseInt(1));
    agregarRanasEscena();  

    let aux = [].concat(puzzle);
    let inteligencia_artificial = new IA(aux, parseInt(n_Machos_input.value));
    movimientos = inteligencia_artificial.BPA()
    console.log(movimientos);
    play = true;

    movimientos.forEach((e)=>{
        let paso = document.createTextNode(` ${e.toString()}  `)
        pasos_box.appendChild(paso);
    })
})

generarRanas(parseInt(n_Machos_input.value), parseInt(n_Hembras_input.value), parseInt(1));
agregarRanasEscena(); 

camera.position.z = 5;

function mover(){
    if(movimientos && indice_mov< movimientos.length){
        let mov = movimientos[indice_mov].split(',');
        ranas.forEach((r)=>{
            if(r.id == mov[0]){
                r.activarParaMover(indice_mov);
                movimiento_actual = mov[1]
                if(r.getEnMovimiento()){
                    return;
                }else{
                    indice_mov++;
                    return;
                }
            }
        })
    }
}

function animate() {
    requestAnimationFrame(animate);
    if(play){
        mover(movimientos);
        for (let i = 0; i < ranas.length; i++) {
            if(ranas[i].getEnMovimiento()){
                ranas[i].mover(movimiento_actual);
            }
        }
    }
    renderer.render(scene, camera);
};

animate();

