import * as THREE from 'three';
import {GLTFLoader} from 'https://unpkg.com/three@0.153.0/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const cam = new THREE.PerspectiveCamera(30, window.innerWidth/window.innerHeight, 1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth-15, window.innerHeight-20);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;
cam.rotation.x = -30*Math.PI/180;
cam.position.set( 0, 100, 250 );
document.body.appendChild(renderer.domElement);

var keyboard = [];

//Scene lighting
const light = new THREE.PointLight( 0xffffff, 1.5, 500);
light.position.set( 0, 200, 0 );
light.castShadow = true;
scene.add( light );

//Generate Ground
const loader = new THREE.TextureLoader();
const groundTexture = loader.load( 'model/grasslight-big.jpg' );
groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set( 25, 25 );

const groundMaterial = new THREE.MeshPhongMaterial( { map: groundTexture } );

let mesh = new THREE.Mesh( new THREE.PlaneGeometry( 1500, 1500 ), groundMaterial );
mesh.position.y = -100;
mesh.rotation.x = -90*Math.PI/180;
mesh.receiveShadow = true;
mesh.castShadow = false;
scene.add( mesh );

// load shotgun
let shotgun;
let shotgun_dmg = 1;
let load_shotgun = new GLTFLoader().load('model/shotgun.gltf', function(result){
    shotgun = result.scene.children[0].children[0].children[0];

    shotgun.castShadow = true;
    shotgun.position.set(0, -90, 0);
    shotgun.scale.set( 5, 5, 5);
    shotgun.rotation.x = -90*Math.PI/180;
    shotgun.rotation.z = 90*Math.PI/180;
    
    scene.add(shotgun);
})

const geometry = new THREE.CircleGeometry( 50, 360 ); 
const material = new THREE.MeshBasicMaterial( { color: 0x000000, transparent: true, opacity: 0.25 } ); 
const circle = new THREE.Mesh( geometry, material );
circle.position.set(0, -99, 0);
circle.rotation.x = -90*Math.PI/180;
scene.add( circle );

// load tree
let trees = [];
for(let i = 0; i < 25; i++){
    let posX = Math.floor(Math.random()*1500) - 750;
    let posZ = Math.floor(Math.random()*1500) - 750;

    let tree = new THREE.Group();
    let tree_part1, tree_part2, tree_part3, tree_part4, tree_part5;
    let load_tree = new GLTFLoader().load('model/tree.gltf', function(result){
        tree_part1 = result.scene.children[0].children[0].children[0].children[0].children[0];
        tree_part2 = result.scene.children[0].children[0].children[0].children[0].children[1];
        tree_part3 = result.scene.children[0].children[0].children[0].children[1].children[0];
        tree_part4 = result.scene.children[0].children[0].children[0].children[1].children[1];
        tree_part5 = result.scene.children[0].children[0].children[0].children[1].children[2];
        
        tree_part1.castShadow = true;
        tree_part2.castShadow = true;
        tree_part3.castShadow = true;
        tree_part4.castShadow = true;
        tree_part5.castShadow = true;
        
        tree.add(tree_part1);
        tree.add(tree_part2);
        tree.add(tree_part3);
        tree.add(tree_part4);
        tree.add(tree_part5);

        tree.scale.set(3, 3, 3);
        tree.position.set(posX, -100, posZ);

        trees.push({
            posX: posX,
            posZ: posZ,
            tree: tree
        })
    })
}

// load zombie
let zombies = [];
function initZombie(){
    for(let i = 0; i < 10; i++){
        let posX, posZ;
        switch (Math.floor(Math.random()*4)) {
            case 0:
                posX = Math.floor(Math.random()*1500) - 750;
                posZ = 750;
                break;
            case 1:
                posX = Math.floor(Math.random()*1500) - 750;
                posZ = -750;    
                break;
            case 2:
                posX = 750;
                posZ = Math.floor(Math.random()*1500) - 750;
                break;
            case 3:
                posX = -750;
                posZ = Math.floor(Math.random()*1500) - 750;
                break;
            case 4:
                posX = 0;
                posZ = 0;
                break;
        }

        let rdm = Math.random()*3;
        if(rdm > 2.7){
            let zombie_boss = new THREE.Group();
            let load_zombie_boss = new GLTFLoader().load('model/zombie_boss.gltf', function(result){
                let zombie_boss_part1 = result.scene.children[0].children[0].children[0].children[0].children[0].children[0];

                zombie_boss_part1.castShadow = true;

                zombie_boss.add(zombie_boss_part1);
                    
                zombie_boss.position.set(posX, -100, posZ);
                zombie_boss.rotation.x = -90*Math.PI/180;
                zombie_boss.scale.set(0.25, 0.25, 0.25);

                zombies.push({
                    id: 4,
                    hp: 500,
                    zombie: zombie_boss
                })

                scene.add(zombie_boss);
            })
        }else if(rdm > 2.1){
            let zombie3 = new THREE.Group();
            let load_zombie3 = new GLTFLoader().load('model/zombie3.gltf', function(result){
                let zombie3_part1 = result.scene.children[0].children[0].children[0];
                let zombie3_part2 = result.scene.children[0].children[0].children[1];
                let zombie3_part3 = result.scene.children[0].children[0].children[2];
                let zombie3_part4 = result.scene.children[0].children[0].children[3];
                let zombie3_part5 = result.scene.children[0].children[0].children[4];

                zombie3_part1.castShadow = true;
                zombie3_part2.castShadow = true;
                zombie3_part3.castShadow = true;
                zombie3_part4.castShadow = true;
                zombie3_part5.castShadow = true;

                zombie3.add(zombie3_part1);
                zombie3.add(zombie3_part2);
                zombie3.add(zombie3_part3);
                zombie3.add(zombie3_part4);
                zombie3.add(zombie3_part5);
                    
                zombie3.position.set(posX, -100, posZ);
                zombie3.rotation.x = -90*Math.PI/180;
                zombie3.scale.set(10, 10, 10);

                zombies.push({
                    id: 3,
                    hp: 150,
                    zombie: zombie3
                })

                scene.add(zombie3);
            })
        }else if(rdm > 1.2){
            let zombie2 = new THREE.Group();
            let load_zombie2 = new GLTFLoader().load('model/zombie2.gltf', function(result){
                let zombie2_part1 = result.scene.children[0].children[0].children[0].children[0].children[0];
                let zombie2_part2 = result.scene.children[0].children[0].children[0].children[1].children[0];
                let zombie2_part3 = result.scene.children[0].children[0].children[0].children[2].children[0];
                let zombie2_part4 = result.scene.children[0].children[0].children[0].children[3].children[0];
                let zombie2_part5 = result.scene.children[0].children[0].children[0].children[4].children[0];

                zombie2_part1.castShadow = true;
                zombie2_part2.castShadow = true;
                zombie2_part3.castShadow = true;
                zombie2_part4.castShadow = true;
                zombie2_part5.castShadow = true;

                zombie2.add(zombie2_part1);
                zombie2.add(zombie2_part2);
                zombie2.add(zombie2_part3);
                zombie2.add(zombie2_part4);
                zombie2.add(zombie2_part5);
                    
                zombie2.position.set(posX, -100, posZ);
                zombie2.scale.set(20, 20, 20);

                zombies.push({
                    id: 2,
                    hp: 50,
                    zombie: zombie2
                })

                scene.add(zombie2);
            })
        }else if(rdm > 0){
            let zombie1 = new THREE.Group();
            let load_zombie1 = new GLTFLoader().load('model/zombie1.gltf', function(result){
                let zombie1_part1 = result.scene.children[0].children[0].children[0];
                let zombie1_part2 = result.scene.children[0].children[0].children[1];

                zombie1_part1.castShadow = true;
                zombie1_part2.castShadow = true;

                zombie1.add(zombie1_part1);
                zombie1.add(zombie1_part2);
                    
                zombie1.position.set(posX, -100, posZ);
                zombie1.rotation.x = -90*Math.PI/180;
                zombie1.scale.set(0.2, 0.2, 0.2);

                zombies.push({
                    id: 1,
                    hp: 100,
                    zombie: zombie1
                })

                scene.add(zombie1);
            })
        }
    }
}

// controls
document.body.onkeydown = function (evt) {
    keyboard[evt.key] = true;
}

document.body.onkeyup = function (evt) {
    keyboard[evt.key] = false;
}

let finish = true;
function process_keyboard(){
    if(keyboard['a']){
        if(shotgun.position.x > -749){
            cam.position.x -= 1;
            shotgun.position.x -= 1;
            circle.position.x -= 1;
            light.position.x -= 1;
        }
    }
    if(keyboard['d']){
        if(shotgun.position.x < 749){
            cam.position.x += 1;
            shotgun.position.x += 1;
            circle.position.x += 1;
            light.position.x += 1;
        }
    }
    if(keyboard['w']){
        if(shotgun.position.z > -749){
            cam.position.z -= 1;
            shotgun.position.z -= 1;
            circle.position.z -= 1;
            light.position.z -= 1;
        }
    }
    if(keyboard['s']){
        if(shotgun.position.z < 749){
            cam.position.z += 1;
            shotgun.position.z += 1;
            circle.position.z += 1;
            light.position.z += 1;
        }
    }

    // add dan remove tree dari scene
    for(let i = 0; i < trees.length; i++){
        if(((trees[i].posX < shotgun.position.x + Math.floor((window.innerWidth-15)/4)) && (trees[i].posX > shotgun.position.x - Math.floor((window.innerWidth-15)/4))) && ((trees[i].posZ < shotgun.position.z + Math.floor((window.innerHeight-20)/8)) && (trees[i].posZ > shotgun.position.z - 4*Math.floor((window.innerHeight-20)/8)))){
            scene.add(trees[i].tree);
        }else{
            scene.remove(trees[i].tree);
        }
    }

    // atur gerak zombie
    for (let i = 0; i < zombies.length; i++) {
        const zombie = zombies[i];
        
        if(shotgun.position.x > zombie.zombie.position.x){
            switch (zombie.id) {
                case 1:
                    zombie.zombie.position.x += 0.5;
                    break;
                case 2:
                    zombie.zombie.position.x += 0.75;
                    break;
                case 3:
                    zombie.zombie.position.x += 0.5;
                    break;
                case 4: 
                    zombie.zombie.position.x += 0.25;
                    break;
            }
        }else{
            switch (zombie.id) {
                case 1:
                    zombie.zombie.position.x -= 0.5;
                    break;
                case 2:
                    zombie.zombie.position.x -= 0.75;
                    break;
                case 3:
                    zombie.zombie.position.x -= 0.5;
                    break;
                case 4:
                    zombie.zombie.position.x -= 0.25;
                    break;
            }
        }
        if(shotgun.position.z > zombie.zombie.position.z){
            switch (zombie.id) {
                case 1:
                    zombie.zombie.position.z += 0.5;
                    break;
                case 2:
                    zombie.zombie.position.z += 0.75;
                    break;
                case 3:
                    zombie.zombie.position.z += 0.5;
                    break;
                case 4:
                    zombie.zombie.position.z += 0.25;
                    break;
            }
        }else{
            switch (zombie.id) {
                case 1:
                    zombie.zombie.position.z -= 0.5;
                    break;
                case 2:
                    zombie.zombie.position.z -= 0.75;
                    break;
                case 3:
                    zombie.zombie.position.z -= 0.5;
                    break;
                case 4:
                    zombie.zombie.position.z -= 0.25;
                    break;
            }
        }

        // kl mati
        if(zombie.id != 4){
            if((Math.pow((zombie.zombie.position.x - shotgun.position.x), 2) + Math.pow((zombie.zombie.position.z - shotgun.position.z), 2)) <= 1){
                location.reload();
            }
        }else{
            if((Math.pow((zombie.zombie.position.x - shotgun.position.x), 2) + Math.pow((zombie.zombie.position.z - shotgun.position.z), 2)) <= 25){
                location.reload();
            }
        }

        // arah menghadap zombie
        let v1 = {
            x: shotgun.position.x - zombie.zombie.position.x,
            z: shotgun.position.z - zombie.zombie.position.z
        }
        let v2 = {
            x: 0,
            z: shotgun.position.z - zombie.zombie.position.z
        }
        let _v1 = Math.sqrt(Math.pow(v1.x, 2) + Math.pow(v1.z, 2));
        let _v2 = Math.sqrt(Math.pow(v2.x, 2) + Math.pow(v2.z, 2));
        let v1xv2 = v1.x*v2.x + v1.z*v2.z;
        let cosa = v1xv2/(_v1*_v2);
        let sudut = Math.acos(cosa)*180/Math.PI;

        if(zombie.id != 2){
            if(shotgun.position.x > zombie.zombie.position.x && shotgun.position.z > zombie.zombie.position.z){
                zombie.zombie.rotation.z = sudut*Math.PI/180;
            }else if(shotgun.position.x > zombie.zombie.position.x && shotgun.position.z < zombie.zombie.position.z){
                zombie.zombie.rotation.z = (180-sudut)*Math.PI/180;
            }else if(shotgun.position.x < zombie.zombie.position.x && shotgun.position.z < zombie.zombie.position.z){
                zombie.zombie.rotation.z = (sudut-180)*Math.PI/180;
            }else if(shotgun.position.x < zombie.zombie.position.x && shotgun.position.z > zombie.zombie.position.z){
                zombie.zombie.rotation.z = -sudut*Math.PI/180;
            }
        }else{
            if(shotgun.position.x > zombie.zombie.position.x && shotgun.position.z > zombie.zombie.position.z){
                zombie.zombie.rotation.y = sudut*Math.PI/180;
            }else if(shotgun.position.x > zombie.zombie.position.x && shotgun.position.z < zombie.zombie.position.z){
                zombie.zombie.rotation.y = (180-sudut)*Math.PI/180;
            }else if(shotgun.position.x < zombie.zombie.position.x && shotgun.position.z < zombie.zombie.position.z){
                zombie.zombie.rotation.y = (sudut-180)*Math.PI/180;
            }else if(shotgun.position.x < zombie.zombie.position.x && shotgun.position.z > zombie.zombie.position.z){
                zombie.zombie.rotation.y = -sudut*Math.PI/180;
            }
        }
    }

    for (let i = 0; i < zombies.length; i++) {
        const zombie = zombies[i];
        
        if((Math.pow((shotgun.position.x - zombie.zombie.position.x), 2) + Math.pow((shotgun.position.z - zombie.zombie.position.z), 2)) <= 2500){
            // arah shotgun
            let v1 = {
                x: zombie.zombie.position.x - shotgun.position.x,
                z: zombie.zombie.position.z - shotgun.position.z
            }
            let v2 = {
                x: 0,
                z: zombie.zombie.position.z - shotgun.position.z
            }
            let _v1 = Math.sqrt(Math.pow(v1.x, 2) + Math.pow(v1.z, 2));
            let _v2 = Math.sqrt(Math.pow(v2.x, 2) + Math.pow(v2.z, 2));
            let v1xv2 = v1.x*v2.x + v1.z*v2.z;
            let cosa = v1xv2/(_v1*_v2);
            let sudut = Math.acos(cosa)*180/Math.PI;
    
            if(shotgun.position.x > zombie.zombie.position.x && shotgun.position.z > zombie.zombie.position.z){
                shotgun.rotation.z = (sudut+90)*Math.PI/180;
            }else if(shotgun.position.x > zombie.zombie.position.x && shotgun.position.z < zombie.zombie.position.z){
                shotgun.rotation.z = (270-sudut)*Math.PI/180;
            }else if(shotgun.position.x < zombie.zombie.position.x && shotgun.position.z < zombie.zombie.position.z){
                shotgun.rotation.z = (sudut-90)*Math.PI/180;
            }else if(shotgun.position.x < zombie.zombie.position.x && shotgun.position.z > zombie.zombie.position.z){
                shotgun.rotation.z = (90-sudut)*Math.PI/180;
            }
            
            zombie.hp -= shotgun_dmg;
            if(zombie.hp <= 0){
                scene.remove(zombie.zombie);
                zombies.splice(i, 1);
            }
            break;
        }
    }

    console.log(zombies.length);
    if(zombies.length == 0 && finish){
        finish = false;
        initZombie();
    }

    if(zombies.length == 10){
        finish = true;
    }
}

const draw = () =>{
    renderer.render(scene, cam);
    requestAnimationFrame(draw);
    if(shotgun){
        process_keyboard();
    }
}

draw();
