import * as THREE from 'three';
import Rana from './Rana.js';
import Roca from './Roca.js';
import IA from './IA.js';


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
var posicion    = 0;

// M = Machos
// H = Hembras
// _ = espacio vacio

function generarRanas(n_machos, n_hembras, n_espacios){
    let n = (n_machos + n_hembras + n_espacios);
    let contador_id =1;
    for (let x = -n; x < n; x+=2) {
        if (posicion < n_machos) {
            ranas.push(new Rana(x, 0, x, null));
            rocas.push(new Roca(x));
            
            puzzle.push({
                id_rana: `RM${contador_id}`, 
                tipo: '*', 
                posicion,
                pos_inicial: posicion,
                pos_final: posicion*-1 
            });

            posicion++;
            contador_id = contador_id>3?1: contador_id+=1 ;

        } else if (posicion >= n_machos && posicion < (n_machos + n_espacios)) {
            rocas.push(new Roca(x));

            puzzle.push({
                tipo: '_',
                posicion,
                es_vacio:true
            });

            posicion++;
        } else{
            ranas.push(new Rana(x, 0, x, null));
            rocas.push(new Roca(x));

            puzzle.push({
                id_rana: `RM${contador_id}`,
                tipo: '+',
                posicion,
                pos_inicial: posicion,
                pos_final: posicion * -1
            });

            posicion++;
            contador_id++;
        }
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
    posicion = 0;
}


playBtn.addEventListener('click', ()=>{
    // limpiarEscena();
    // generarRanas(parseInt(n_Machos_input.value), parseInt(n_Hembras_input.value), parseInt(n_Espacios_input.value));
    // agregarRanasEscena();

    let inteligencia_artificial = new IA(puzzle);
    
    inteligencia_artificial.BPA(puzzle);
    

    ranas[2].activarParaMover();
    play = true;
})

generarRanas(parseInt(n_Machos_input.value), parseInt(n_Hembras_input.value), parseInt(n_Espacios_input.value));
agregarRanasEscena();

camera.position.z = 5;


function animate() {
    requestAnimationFrame(animate);
    if (play && ranas[2].getEnMovimiento()){
        ranas[2].mover_izquierda_dos_pasos();
    }
    renderer.render(scene, camera);
};

animate();