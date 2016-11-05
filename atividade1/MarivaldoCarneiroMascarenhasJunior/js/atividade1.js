//Atividade 1 Computacao Grafica
//Marivaldo Carneiro Mascarenhas Junior
var scene;
var camera;
var renderer;
//formas
var forma1;
var forma2;
var forma3;
var forma4;
var formaComp1;
var formaComp2;
var formaComp3;
var formaComp4;

function init(){
        alert("Aperte as teclas de 1 a 8 para exibir os objetos");
        
        scene = new THREE.Scene();
        
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);

        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(new THREE.Color(0xDDDDDD));
        renderer.setSize(window.innerWidth, window.innerHeight);

        camera.position.x = -20;
        camera.position.y = 30;
        camera.position.z = 40;
        camera.lookAt(new THREE.Vector3(10, 0, 0));
        
        //desenhaEixos();
        
        scene.add(camera);       
       
        document.getElementById("webGL-output").appendChild(renderer.domElement);
        
        //document.addEventListener( 'keypress', moveForma, false );
        document.addEventListener( 'keypress', selectObject, false );
        
        customRender();
}

function customRender(){    
    //se tiver apenas a camera e o objeto faz ele rotacionar
    if(scene.children.length>1){
        scene.children[1].rotation.x +=0.03;
        scene.children[1].rotation.y +=0.005;
    }
    
    requestAnimationFrame( customRender);
    renderer.render( scene, camera );
}

function formaComplexa4(){
    var geometry = new THREE.Geometry();
    var vertices = [
        new THREE.Vector3(15,5,-5),
        new THREE.Vector3(-15,5,-5),
        new THREE.Vector3(-15,5,5),
        new THREE.Vector3(-5,5,5),
        new THREE.Vector3(-5,5,15),
        new THREE.Vector3(5,5,15),
        new THREE.Vector3(5,5,5),
        new THREE.Vector3(15,5,5),
        
        new THREE.Vector3(15,-5,-5),
        new THREE.Vector3(-15,-5,-5),
        new THREE.Vector3(-15,-5,5),
        new THREE.Vector3(-5,-5,5),
        new THREE.Vector3(-5,-5,15),
        new THREE.Vector3(5,-5,15),
        new THREE.Vector3(5,-5,5),
        new THREE.Vector3(15,-5,5),
        //cubo 
        new THREE.Vector3(5,15,5),
        new THREE.Vector3(-5,15,5),
        new THREE.Vector3(5,15,15),
        new THREE.Vector3(-5,15,15)
    ];
    
    var faces = [
        //frente
        new THREE.Face3(4,12,5),
        new THREE.Face3(12,13,5),
        new THREE.Face3(11,3,2),
        new THREE.Face3(2,10,11),
        new THREE.Face3(15,7,6),
        new THREE.Face3(6,14,15),
        //tras
        new THREE.Face3(0,8,9),
        new THREE.Face3(9,1,0),

        //topo
        new THREE.Face3(0,1,7),
        new THREE.Face3(1,2,3),
        new THREE.Face3(1,3,7),
        
        //cubo
        new THREE.Face3(3,4,19),
        new THREE.Face3(19,17,3),
        new THREE.Face3(16,6,3),
        new THREE.Face3(3,17,16),
        new THREE.Face3(16,18,5),
        new THREE.Face3(5,6,16),
        new THREE.Face3(5,18,19),
        new THREE.Face3(19,4,5),
        new THREE.Face3(18,16,17),
        new THREE.Face3(17,19,18),
        
        
        //base
        new THREE.Face3(9,8,15),
        new THREE.Face3(11,10,9),
        new THREE.Face3(13,12,11),
        new THREE.Face3(11,14,13),
        new THREE.Face3(9,15,11),
        //lados
        new THREE.Face3(1,9,10),
        new THREE.Face3(10,2,1),
        new THREE.Face3(15,8,0),
        new THREE.Face3(0,7,15),
        
        new THREE.Face3(5,13,14),
        new THREE.Face3(14,6,5),
        new THREE.Face3(12,4,3),
        new THREE.Face3(3,11,12)];
    
    geometry.vertices = vertices;
    geometry.faces = faces;
    
    var material = new THREE.MeshBasicMaterial({color:0x336633,wireframe:false});
    formaComp4 = new THREE.Mesh(geometry, material); 
     
    scene.add(formaComp4);
}

function formaComplexa3(){
    var geometry = new THREE.Geometry();
    var vertices = [
        new THREE.Vector3(15,5,-5),
        new THREE.Vector3(-5,5,-5),
        new THREE.Vector3(-5,5,15),
        new THREE.Vector3(5,5,15),
        new THREE.Vector3(5,5,5),
        new THREE.Vector3(15,5,5),
        
        new THREE.Vector3(15,-5,-5),
        new THREE.Vector3(-5,-5,-5),
        new THREE.Vector3(-5,-5,15),
        new THREE.Vector3(5,-5,15),
        new THREE.Vector3(5,-5,5),
        new THREE.Vector3(15,-5,5),
        
        //cubo de cima
        new THREE.Vector3(5,5,-5),
        
        //topo cubo
        new THREE.Vector3(5,15,-5),
        new THREE.Vector3(15,15,-5),
        new THREE.Vector3(15,15,5),
        new THREE.Vector3(5,15,5)];
    
    var faces = [
        //frente
        new THREE.Face3(2,8,3),
        new THREE.Face3(8,9,3),
        //tras
        new THREE.Face3(1,0,6),
        new THREE.Face3(6,7,1),
        //topo
        new THREE.Face3(1,2,3),
        new THREE.Face3(3,12,1),
        //cubo de cima
        new THREE.Face3(0,14,15),
        new THREE.Face3(15,5,0),
        new THREE.Face3(13,14,0),
        new THREE.Face3(0,12,13),
        new THREE.Face3(4,16,13),
        new THREE.Face3(13,12,4),
        new THREE.Face3(4,5,15),
        new THREE.Face3(15,16,4),
        new THREE.Face3(14,13,16),
        new THREE.Face3(16,15,14),
       
        //base
        new THREE.Face3(8,7,6),
        new THREE.Face3(10,9,8),
        new THREE.Face3(6,11,10),
        //lados
        new THREE.Face3(1,7,2),
        new THREE.Face3(7, 8, 2),
        new THREE.Face3(3,9,10),
        new THREE.Face3(10,4,3),
        new THREE.Face3(9,10,4),
        new THREE.Face3(11,5,4),
        new THREE.Face3(4,10,11),
        new THREE.Face3(0,5,11),
        new THREE.Face3(11,6,0)];
    
    geometry.vertices = vertices;
    geometry.faces = faces;
    
    var material = new THREE.MeshBasicMaterial({color:0x000066,wireframe:false});
    formaComp3 = new THREE.Mesh(geometry, material); 
     
    scene.add(formaComp3);
}

function formaComplexa2(){
    var geometry = new THREE.Geometry();
    var vertices = [
        new THREE.Vector3(15,5,-5),
        new THREE.Vector3(-5,5,-5),
        new THREE.Vector3(-5,5,15),
        new THREE.Vector3(5,5,15),
        new THREE.Vector3(5,5,5),
        new THREE.Vector3(15,5,5),
        
        new THREE.Vector3(15,-5,-5),
        new THREE.Vector3(-5,-5,-5),
        new THREE.Vector3(-5,-5,15),
        new THREE.Vector3(5,-5,15),
        new THREE.Vector3(5,-5,5),
        new THREE.Vector3(15,-5,5),
        
        //cubo de cima
        new THREE.Vector3(-5,5,5),
        new THREE.Vector3(-5,-5,5),
        
        //topo cubo
        new THREE.Vector3(-5,15,5),
        new THREE.Vector3(5,15,5),
        new THREE.Vector3(5,15,15),
        new THREE.Vector3(-5,15,15)];
    
    var faces = [
        //frente
        new THREE.Face3(2,8,3),
        new THREE.Face3(8,9,3),
        //tras
        new THREE.Face3(1,0,6),
        new THREE.Face3(6,7,1),
        //topo
        new THREE.Face3(5,1,12),
        new THREE.Face3(5,0,1),
        //cubo de cima
        new THREE.Face3(14,15,4),
        new THREE.Face3(4,12,14),
        new THREE.Face3(16,3,4),
        new THREE.Face3(4,15,16),
        new THREE.Face3(2,3,16),
        new THREE.Face3(16,17,2),
        new THREE.Face3(14,12,2),
        new THREE.Face3(2,17,14),
        new THREE.Face3(16,15,14),
        new THREE.Face3(14,17,16),
        
      
        //base
        new THREE.Face3(8,7,6),
        new THREE.Face3(10,9,8),
        new THREE.Face3(6,11,10),
        //lados
        new THREE.Face3(1,7,2),
        new THREE.Face3(7, 8, 2),
        new THREE.Face3(3,9,10),
        new THREE.Face3(10,4,3),
        new THREE.Face3(9,10,4),
        new THREE.Face3(11,5,4),
        new THREE.Face3(4,10,11),
        new THREE.Face3(0,5,11),
        new THREE.Face3(11,6,0)];
    
    geometry.vertices = vertices;
    geometry.faces = faces;
    
    var material = new THREE.MeshBasicMaterial({color:0x990066,wireframe:false});
    formaComp2 = new THREE.Mesh(geometry, material); 
     
    scene.add(formaComp2);
}

function formaComplexa1(){
    var geometry = new THREE.Geometry();
    var vertices = [
        new THREE.Vector3(15,5,-5),
        new THREE.Vector3(-5,5,-5),
        new THREE.Vector3(-5,5,15),
        new THREE.Vector3(5,5,15),
        new THREE.Vector3(5,5,5),
        new THREE.Vector3(15,5,5),
        
        new THREE.Vector3(15,-5,-5),
        new THREE.Vector3(-5,-5,-5),
        new THREE.Vector3(-5,-5,15),
        new THREE.Vector3(5,-5,15),
        new THREE.Vector3(5,-5,5),
        new THREE.Vector3(15,-5,5),
        
        //cubo de cima
        new THREE.Vector3(5,5,-5),
        new THREE.Vector3(-5,5,5),
        new THREE.Vector3(5,-5,-5),
        new THREE.Vector3(-5,-5,5),
        
        //topo cubo
        new THREE.Vector3(-5,15,-5),
        new THREE.Vector3(5,15,-5),
        new THREE.Vector3(5,15,5),
        new THREE.Vector3(-5,15,5)];
    
    var faces = [
        //frente
        new THREE.Face3(2,8,3),
        new THREE.Face3(8,9,3),
        //tras
        new THREE.Face3(1,0,6),
        new THREE.Face3(6,7,1),
        //topo
        new THREE.Face3(2,3,4),
        new THREE.Face3(4,13,2),
        new THREE.Face3(4,5,0),
        new THREE.Face3(0,12,4),
        //cubo de cima
        new THREE.Face3(16,17,12),
        new THREE.Face3(12,1,16),
        new THREE.Face3(19,16,1),
        new THREE.Face3(1,13,19),
        new THREE.Face3(13,4,18),
        new THREE.Face3(18,19,13),
        new THREE.Face3(12,17,18),
        new THREE.Face3(18,4,12),
        new THREE.Face3(18,17,16),
        new THREE.Face3(16,19,18),
      
        //base
        new THREE.Face3(8,7,6),
        new THREE.Face3(10,9,8),
        new THREE.Face3(6,11,10),
        //lados
        new THREE.Face3(1,7,2),
        new THREE.Face3(7, 8, 2),
        new THREE.Face3(3,9,10),
        new THREE.Face3(10,4,3),
        new THREE.Face3(9,10,4),
        new THREE.Face3(11,5,4),
        new THREE.Face3(4,10,11),
        new THREE.Face3(0,5,11),
        new THREE.Face3(11,6,0)];
    
    geometry.vertices = vertices;
    geometry.faces = faces;
    
    var material = new THREE.MeshBasicMaterial({color:0x339933,wireframe:false});
    formaComp1 = new THREE.Mesh(geometry, material); 
     
    scene.add(formaComp1);
}

function formaSimples4(){
    var geometry = new THREE.Geometry();
    var vertices = [
        new THREE.Vector3(15,5,-15),
        new THREE.Vector3(5,5,-15),
        new THREE.Vector3(5,5,-5),
        new THREE.Vector3(-5,5,-5),
        new THREE.Vector3(-5,5,15),
        new THREE.Vector3(5,5,15),
        new THREE.Vector3(5,5,5),
        new THREE.Vector3(15,5,5),
        
        new THREE.Vector3(15,-5,-15),
        new THREE.Vector3(5,-5,-15),
        new THREE.Vector3(5,-5,-5),
        new THREE.Vector3(-5,-5,-5),
        new THREE.Vector3(-5,-5,15),
        new THREE.Vector3(5,-5,15),
        new THREE.Vector3(5,-5,5),
        new THREE.Vector3(15,-5,5)];
    
    var faces = [
        //frente
        new THREE.Face3(4,12,13),
        new THREE.Face3(13,5,4),
        new THREE.Face3(6,14,15),
        new THREE.Face3(15,7,6),
        //tras
        new THREE.Face3(2,10,11),
        new THREE.Face3(11,3,2),
        new THREE.Face3(0,8,9),
        new THREE.Face3(9,1,0),
        //topo
        new THREE.Face3(0,1,2),
        new THREE.Face3(6,7,0),
        new THREE.Face3(4,5,6),
        new THREE.Face3(4,6,3),
        new THREE.Face3(3,6,2),
        new THREE.Face3(6,0,2),  
        //base
        new THREE.Face3(8,15,14),
        new THREE.Face3(14,13,12),
        new THREE.Face3(12,11,14),
        new THREE.Face3(11,10,14),
        new THREE.Face3(14,9,8),
        
        //lados
        new THREE.Face3(12,4,3),
        new THREE.Face3(3,11,12),
        new THREE.Face3(14,6,5),
        new THREE.Face3(5,13,14),
        new THREE.Face3(0,7,15),
        new THREE.Face3(15,8,0),
        new THREE.Face3(10,2,1),
        new THREE.Face3(1,9,10)];
    
    geometry.vertices = vertices;
    geometry.faces = faces;
    
    var material = new THREE.MeshBasicMaterial({color:0x990000,wireframe:false});
    forma4 = new THREE.Mesh(geometry, material); 
     
    scene.add(forma4);
}

function formaSimples3(){
    var geometry = new THREE.Geometry();
    var vertices = [
        new THREE.Vector3(15,5,-5),
        new THREE.Vector3(-15,5,-5),
        new THREE.Vector3(-15,5,5),
        new THREE.Vector3(-5,5,5),
        new THREE.Vector3(-5,5,15),
        new THREE.Vector3(5,5,15),
        new THREE.Vector3(5,5,5),
        new THREE.Vector3(15,5,5),
        
        new THREE.Vector3(15,-5,-5),
        new THREE.Vector3(-15,-5,-5),
        new THREE.Vector3(-15,-5,5),
        new THREE.Vector3(-5,-5,5),
        new THREE.Vector3(-5,-5,15),
        new THREE.Vector3(5,-5,15),
        new THREE.Vector3(5,-5,5),
        new THREE.Vector3(15,-5,5)];
    
    var faces = [
        //frente
        new THREE.Face3(4,12,5),
        new THREE.Face3(12,13,5),
        new THREE.Face3(11,3,2),
        new THREE.Face3(2,10,11),
        new THREE.Face3(15,7,6),
        new THREE.Face3(6,14,15),
        //tras
        new THREE.Face3(0,8,9),
        new THREE.Face3(9,1,0),

        //topo
        new THREE.Face3(0,1,7),
        new THREE.Face3(1,2,3),
        new THREE.Face3(3,4,5),
        new THREE.Face3(5,6,3),
        new THREE.Face3(1,3,7),
        
        //base
        new THREE.Face3(9,8,15),
        new THREE.Face3(11,10,9),
        new THREE.Face3(13,12,11),
        new THREE.Face3(11,14,13),
        new THREE.Face3(9,15,11),
        //lados
        new THREE.Face3(1,9,10),
        new THREE.Face3(10,2,1),
        new THREE.Face3(15,8,0),
        new THREE.Face3(0,7,15),
        
        new THREE.Face3(5,13,14),
        new THREE.Face3(14,6,5),
        new THREE.Face3(12,4,3),
        new THREE.Face3(3,11,12)];
    
    geometry.vertices = vertices;
    geometry.faces = faces;
    
    var material = new THREE.MeshBasicMaterial({color:0x660000,wireframe:false});
    forma3 = new THREE.Mesh(geometry, material); 
     
    scene.add(forma3);
}

//forma de L
function formaSimples2(){
    var geometry = new THREE.Geometry();
    var vertices = [
        new THREE.Vector3(25,5,-5),
        new THREE.Vector3(-5,5,-5),
        new THREE.Vector3(-5,5,15),
        new THREE.Vector3(5,5,15),
        new THREE.Vector3(5,5,5),
        new THREE.Vector3(25,5,5),
        new THREE.Vector3(25,-5,-5),
        new THREE.Vector3(-5,-5,-5),
        new THREE.Vector3(-5,-5,15),
        new THREE.Vector3(5,-5,15),
        new THREE.Vector3(5,-5,5),
        new THREE.Vector3(25,-5,5)];
    
    var faces = [
        //frente
        new THREE.Face3(2,8,3),
        new THREE.Face3(8,9,3),
        //tras
        new THREE.Face3(1,0,6),
        new THREE.Face3(6,7,1),
        //topo
        new THREE.Face3(2,4,1),
        new THREE.Face3(1,4,5),
        new THREE.Face3(2,3,4),
        new THREE.Face3(1,5,0),
        //base
        new THREE.Face3(6,10,7),
        new THREE.Face3(10,8,7),
        new THREE.Face3(10,9,8),
        new THREE.Face3(10,6,11),
        //lados
        new THREE.Face3(1,7,2),
        new THREE.Face3(7, 8, 2),
        new THREE.Face3(3,9,10),
        new THREE.Face3(10,4,3),
        new THREE.Face3(9,10,4),
        new THREE.Face3(11,5,4),
        new THREE.Face3(4,10,11),
        new THREE.Face3(0,5,11),
        new THREE.Face3(11,6,0)];
    
    geometry.vertices = vertices;
    geometry.faces = faces;
    
    var material = new THREE.MeshBasicMaterial({color:0x3300cc,wireframe:false});
    forma2 = new THREE.Mesh(geometry, material); 
     
    scene.add(forma2); 
}

//tres cubos 
function formaSimples1(){
    var geometry = new THREE.Geometry();
    var vertices = [
        new THREE.Vector3(15,5,-5),
        new THREE.Vector3(-5,5,-5),
        new THREE.Vector3(-5,5,15),
        new THREE.Vector3(5,5,15),
        new THREE.Vector3(5,5,5),
        new THREE.Vector3(15,5,5),
        new THREE.Vector3(15,-5,-5),
        new THREE.Vector3(-5,-5,-5),
        new THREE.Vector3(-5,-5,15),
        new THREE.Vector3(5,-5,15),
        new THREE.Vector3(5,-5,5),
        new THREE.Vector3(15,-5,5)];
    
    var faces = [
        //frente
        new THREE.Face3(2,8,3),
        new THREE.Face3(8,9,3),
        //tras
        new THREE.Face3(1,0,6),
        new THREE.Face3(6,7,1),
        //topo
        new THREE.Face3(4,5,0),
        new THREE.Face3(0,1,2),
        new THREE.Face3(2,3,4),
        //base
        new THREE.Face3(8,7,6),
        new THREE.Face3(10,9,8),
        new THREE.Face3(6,11,10),
        //lados
        new THREE.Face3(1,7,2),
        new THREE.Face3(7, 8, 2),
        new THREE.Face3(3,9,10),
        new THREE.Face3(10,4,3),
        new THREE.Face3(9,10,4),
        new THREE.Face3(11,5,4),
        new THREE.Face3(4,10,11),
        new THREE.Face3(0,5,11),
        new THREE.Face3(11,6,0)];
    
    geometry.vertices = vertices;
    geometry.faces = faces;
    
    var material = new THREE.MeshBasicMaterial({color:0xcc0000,wireframe:false});
    forma1 = new THREE.Mesh(geometry, material); 
     
    scene.add(forma1);
}

function selectObject(e){
    var key = e.which;
    //8
    if(key == 56){
        // a cada escolha limpa a cena para apresenta apenas um objeto
        for(var i = scene.children.length; i>0;i--){
            scene.remove(scene.children[i])
        }
        formaComplexa4();
    }
    //1
    if(key == 49){
        for(var i = scene.children.length; i>0;i--){
            scene.remove(scene.children[i])
        }
        formaSimples1();
    }
    if(key == 50){
        for(var i = scene.children.length; i>0;i--){
            scene.remove(scene.children[i])
        }
        formaSimples2();
    }
    if(key == 51){
        for(var i = scene.children.length; i>0;i--){
            scene.remove(scene.children[i])
        }
        formaSimples3();
    }
    if(key == 52){
        for(var i = scene.children.length; i>0;i--){
            scene.remove(scene.children[i])
        }
        formaSimples4();
    }
    if(key == 53){
        for(var i = scene.children.length; i>0;i--){
            scene.remove(scene.children[i])
        }
        formaComplexa1();
    }
    if(key == 54){
        for(var i = scene.children.length; i>0;i--){
            scene.remove(scene.children[i])
        }
        formaComplexa2();
    }
    if(key == 55){
        for(var i = scene.children.length; i>0;i--){
            scene.remove(scene.children[i])
        }
        formaComplexa3();
    }
}

