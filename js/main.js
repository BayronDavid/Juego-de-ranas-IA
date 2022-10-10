import * as THREE from 'three';
import Rana from './rana.js';
import Isla from './isla.js';

var play = false;

var container = document.getElementById('canvas');
var canvasWidth = container.offsetWidth;
var canvasHeight = container.offsetHeight;


const scene = new THREE.Scene();
scene.background = new THREE.Color(255, 255, 255)
const camera = new THREE.OrthographicCamera(window.innerWidth / - 150, window.innerWidth / 150, window.innerHeight / 150, window.innerHeight / - 150, 1, 100);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(canvasWidth, canvasHeight);
document.body.appendChild(renderer.domElement);
container.appendChild(renderer.domElement);

// Events

var n_Machos_input      = document.getElementById('nMachosInputRange');
var n_Hembras_input     = document.getElementById('nHembrasInputRange');
var n_Espacios_input    = document.getElementById('neEspaciosInputRange');
var playBtn             = document.getElementById('playButton');


var ranas  = [];
var islas   = [];
var position = 0;


function generarRanas(n_machos, n_hembras, n_espacios){
    let n = (n_machos + n_hembras + n_espacios);
    for (let x = -n; x < n; x+=2) {
        if (position < n_machos) {
            ranas.push(new Rana(x, 0, position, null));
            islas.push(new Isla(x));
            position++;
        } else if (position >= n_machos && position < (n_machos + n_espacios)) {
            islas.push(new Isla(x));
            position++;
        } else{
            ranas.push(new Rana(x, 0, position, null));
            islas.push(new Isla(x));
            position++;
        }
    }
}
function generarIslasEspacios(n){
      

    for (let index = 0; index < n; index++) {

        
    }
}



function agregarRanasEscena(){
    ranas.forEach( item => scene.add(item.getRana()));
    islas.forEach( item => scene.add(item.getIsla()));
}
function limpiarEscena(){
    ranas.forEach( item => scene.remove(item.getRana()));
    islas.forEach( item => scene.remove(item.getIsla()));
    ranas   = [];
    islas   = [];
    position = 0;
}


playBtn.addEventListener('click', ()=>{
    limpiarEscena();
    generarRanas(parseInt(n_Machos_input.value), parseInt(n_Hembras_input.value), parseInt(n_Espacios_input.value));
    agregarRanasEscena();
    
    play = true;
})

generarRanas(parseInt(n_Machos_input.value), parseInt(n_Hembras_input.value), parseInt(n_Espacios_input.value));
var rana = ranas[ranas.length - 1]

agregarRanasEscena();

camera.position.z = 5;


function animate() {
    requestAnimationFrame(animate);
    if (play){
        ranas[ranas.length - 1].mover_izquierda_un_paso();
    }
    renderer.render(scene, camera);
};

animate();