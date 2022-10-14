// Julián Gómez, Breidy Ospina, Bayrón Morales, Stephanya Gómez
// Docente: Laura Cortes

import * as THREE from 'three';
import Rana from './Rana.js';
import Roca from './Roca.js';
import IA from './IA_test.js';
// import IA from './IA.js';

var play = false;

var container       = document.getElementById('canvas');
var canvasWidth     = container.offsetWidth;
var canvasHeight    = container.offsetHeight;


const scene         = new THREE.Scene();
scene.background    = new THREE.Color(255, 255, 255)
const camera        = new THREE.OrthographicCamera(window.innerWidth / - 150, window.innerWidth / 150, window.innerHeight / 150, window.innerHeight / - 150, 1, 100);

const renderer      = new THREE.WebGLRenderer();
renderer.setSize(canvasWidth, canvasHeight);
document.body.appendChild(renderer.domElement);
container.appendChild(renderer.domElement);

var n_Machos_input      = document.getElementById('nMachosInputRange');
var n_Hembras_input     = document.getElementById('nHembrasInputRange');
var n_Espacios_input    = document.getElementById('neEspaciosInputRange');
var playBtn             = document.getElementById('playButton');

var ranas       = [];
var rocas       = [];
var puzzle      = [];
var estado      = 0;

var movimiento_actual = '';
var id_ult_mov = '';
var movimientos = '';


function generarRanas(n_machos, n_hembras, n_espacios){
    let n = (n_machos + n_hembras + n_espacios);
    let contador_id =1;
    for (let x = -n; x < n; x+=2) {
        if (estado < n_machos) {
            ranas.push(new Rana(x, 0, x, null, `RM${contador_id}`, 'https://i.postimg.cc/yYQzCMpN/rana-H.png'));
            rocas.push(new Roca(x));
            
            puzzle.push({
                id: `RM${contador_id}`, 
                tipo: '*', 
                estado: estado,
                pos_relativa: x,
                pos_final: x*-1 
            });
            
            contador_id = contador_id>3?1: contador_id+=1 ;
        } else if (estado >= n_machos && estado < (n_machos + n_espacios)) {
            rocas.push(new Roca(x));

            puzzle.push({
                id: `___`,
                tipo: '_',
                estado: estado,
                pos_relativa: x,
                pos_final: x * -1
            });
        } else{
            contador_id = contador_id > 3 ? 1 : contador_id += 1;
            ranas.push(new Rana(x, 0, x, null, `RH${contador_id}`, 'https://i.postimg.cc/1381mvbr/rana-M.png'));
            rocas.push(new Roca(x));

            puzzle.push({
                id: `RH${contador_id}`,
                tipo: '+',
                estado: estado,
                pos_relativa: x,
                pos_final: x * -1

            });
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
}

playBtn.addEventListener('click', ()=>{
    limpiarEscena();
    generarRanas(parseInt(n_Machos_input.value), parseInt(n_Hembras_input.value), parseInt(n_Espacios_input.value));
    agregarRanasEscena();  

    let aux = [].concat(puzzle);
    let inteligencia_artificial = new IA(aux, parseInt(n_Machos_input.value));
    movimientos = inteligencia_artificial.BPA()

    play = true;
})

generarRanas(parseInt(n_Machos_input.value), parseInt(n_Hembras_input.value), parseInt(n_Espacios_input.value));
agregarRanasEscena(); 

camera.position.z = 5;

function mover(movimientos){
        if(movimientos){
            for (let k = 0; k < movimientos.length; k++) {
                let mv = movimientos[k].split(',');
                for (let i = 0; i < ranas.length; i++) {
                    if (mv[0] == ranas[i].id) {
                        setTimeout(() => {
                            id_ult_mov = ranas[i].id;
                            movimiento_actual = mv[1];
                            ranas[i].activarParaMover(i);
                            movimientos.shift();
                        }, 500)
                        return movimientos;
                    }
                }
            }
        }    
}

function animate() {
    requestAnimationFrame(animate);
    if(play){
        movimientos = mover(movimientos);
        for (let i = 0; i < ranas.length; i++) {
            if(ranas[i].getEnMovimiento()){
                ranas[i].mover(movimiento_actual);
            }
        }
    }
    renderer.render(scene, camera);
};

animate();

