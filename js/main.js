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

var aux_rana = '';

// M = Machos
// H = Hembras
// _ = espacio vacio

function generarRanas(n_machos, n_hembras, n_espacios){
    let n = (n_machos + n_hembras + n_espacios);
    let contador_id =1;
    for (let x = -n; x < n; x+=2) {
        if (estado < n_machos) {
            ranas.push(new Rana(x, 0, x, null, `RM${contador_id}`, 'M'));
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
            ranas.push(new Rana(x, 0, x, null, `RH${contador_id}`, 'H'));
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
    estado = 0;
}


playBtn.addEventListener('click', ()=>{
    // limpiarEscena();
    // generarRanas(parseInt(n_Machos_input.value), parseInt(n_Hembras_input.value), parseInt(n_Espacios_input.value));
    // agregarRanasEscena();
    // inteligencia_artificial.solucionar(puzzle);
    
    
    // ranas[2].activarParaMover(2);
    play = true;
})



generarRanas(parseInt(n_Machos_input.value), parseInt(n_Hembras_input.value), parseInt(n_Espacios_input.value));
agregarRanasEscena();

camera.position.z = 5;

let aux = [].concat(puzzle);
let inteligencia_artificial = new IA(aux);
let movimientos = inteligencia_artificial.BPA()
// console.log(movimientos);

function mover(movimientos){
    movimientos.forEach((mv)=>{
        mv = mv.split(',');
        for (let i = 0; i < ranas.length; i++) {
            if(mv[0] == ranas[i].id){
                if(ranas[i-1]){
                    if (!ranas[i - 1].getEnMovimiento()) {
                        ranas[i].activarParaMover(i); //Indice para activar o desactivar la animacion
                    }
                }else{
                    ranas[i].activarParaMover(i); //Indice para activar o desactivar la animacion
                }
            }
        }
    })
    
}
// mover(movimientos);

function animate() {
    requestAnimationFrame(animate);
    if(play){
        mover(movimientos);
    }
    if (play && ranas[0].getEnMovimiento()){
        ranas[0].mover_izquierda_dos_pasos();
    }
    if (play && ranas[1].getEnMovimiento()){
        ranas[1].mover_izquierda_dos_pasos();
    }
    if (play && ranas[2].getEnMovimiento()){
        ranas[2].mover_izquierda_dos_pasos();
    }
    if (play && ranas[3].getEnMovimiento()){
        ranas[3].mover_izquierda_dos_pasos();
    }
    if (play && ranas[4].getEnMovimiento()){
        ranas[4].mover_izquierda_dos_pasos();
    }
    if (play && ranas[5].getEnMovimiento()){
        ranas[5].mover_izquierda_dos_pasos();
    }
    renderer.render(scene, camera);
};

animate();
