//Atividade2 Computacao Grafica
//Marivaldo Carneiro Mascarenhas Junior
var scene;
var camera;
var renderer;
var itensTela = 0;

//selecionar objetos na cena
var raycaster = new THREE.Raycaster();

//controle mouse
var mouse = new THREE.Vector2();
var objSelecionado;
var lastposX;
var directionX;

//formas
var forma1;
var forma2;
var forma3;
var forma4;
var formaComp1;
var formaComp2;
var formaComp3;
var formaComp4;
var axisHelper;

var obj;
var colisao = 0;

function init(){
        alert("Aperte n para adicionar novo objeto\nClique duas vezes para selecionar o objeto\nMova com as setas\nUse as teclas w a s d para rotaciona-lo\nBarra de Espaco para soltar");
        scene = new THREE.Scene();
        
        camera = new THREE.OrthographicCamera(-1,1,1,-1,-1,1);

        renderer = new THREE.WebGLRenderer({antialiasing: true});
        renderer.setClearColor(new THREE.Color(0xAAAAAA));
        renderer.setSize(window.innerWidth, window.innerHeight);

        camera.position.z = 0.30;
        
        scene.add(camera);       

        document.getElementById("webGL-output").appendChild(renderer.domElement);
        
        document.addEventListener('keypress', rotateObject, false );
        //document.addEventListener('mousemove', onDocumentMouseMove, false);
        document.addEventListener('dblclick', onDocumentDobleClick, false );
        //document.addEventListener('mousedown', onDocumentMouseDown, false);
        document.addEventListener('keydown', moveObject, false);
        
        //cria todos os objetos mas nao coloca na cena
        formaSimples1();
        formaSimples2();
        formaSimples3();
        formaSimples4();
        formaComplexa1();
        formaComplexa2();
        formaComplexa3();
        formaComplexa4();
        
        obj = [forma1,forma2,forma3,forma4,formaComp1,formaComp2,formaComp3,formaComp4];
        
        customRender();
}

function customRender(){    
    requestAnimationFrame(customRender);
    renderer.render(scene, camera);
}

function detectaColisaoObjetos(){
    var objetos = scene.children;
    for(var i = 1;i<scene.children.length;i++){
        //alert(parseFloat(objetos[i].position.x).toFixed(2))
        if( parseFloat(objSelecionado.position.x).toFixed(2)+parseFloat(0.05).toFixed(2)==parseFloat(objetos[i].position.x).toFixed(2)){
            alert("clidiu");
            colisao = 1;
        }
    }
}

function genetrateRamdom(min, max){
    return Math.random() * (max - min) + min;
}

function addNovoObjeto(){
    var itemCentro = 0;
    
    for(var i=1;i<scene.children.length;i++){
        if(scene.children[i].position.x == 0 && scene.children[i].position.y == 0){
            itemCentro = 1;
        }
    }
    
    if(itemCentro == 1){
        alert("Tire o objeto anterior do centro.");
        return;
    }
    
    if(obj.length>0){
        var x = parseInt(genetrateRamdom(0,obj.length));
        scene.add(obj[x]);
        obj.splice(x,1);
        //alert(x+" "+obj.length);
    }
    else{
        alert("Todos os objetos ja foram criados.")
    }
}

function onDocumentDobleClick(e){
    e.preventDefault();

    mouse.x = ( (e.clientX / window.innerWidth ) * 2 - 1 );
    mouse.y = (-(e.clientY/window.innerHeight) * 2 + 1);
    
    raycaster.setFromCamera(mouse,camera);
    var intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length>0) {
        document.getElementById("webGL-output").style.cursor = 'move';
	objSelecionado = intersects[0].object;
        objSelecionado.currentHex = objSelecionado.material.color.getHex();
        objSelecionado.material.color.set(0xff0000);
	var axisHelper = new THREE.AxisHelper(0.3);
	objSelecionado.add(axisHelper);
    }
}
/*
function onDocumentMouseDown(e){
	e.preventDefault();
	if(objSelecionado != null){		
		objSelecionado.material.color.setHex(objSelecionado.currentHex );
		objSelecionado = null;
                document.getElementById("webGL-output").style.cursor = 'auto';
	}
}
*/
//movimentacao das formas
function moveObject(e){ 
    var key = e.which; 
    if(objSelecionado != null){
        if(objSelecionado.name == "forma2"){
            if(key == 38 && objSelecionado.position.y<0.59){
                objSelecionado.position.y+=0.01;
            }
            //w
            if(key == 39 && objSelecionado.position.x<0.59){
                objSelecionado.position.x+=0.01;
            }
            //s
            if(key == 37 && objSelecionado.position.x>-0.59){
                objSelecionado.position.x-=0.01;
            }
            //d
            if(key == 40 && objSelecionado.position.y>-0.59){
                objSelecionado.position.y-=0.01;
            }  
        }
        else{
            if(key == 38 && objSelecionado.position.y<0.75){
                objSelecionado.position.y+=0.01;
            }
            //w
            if(key == 39 && objSelecionado.position.x<0.76){
                objSelecionado.position.x+=0.01;
                detectaColisaoObjetos();
            }
            //s
            if(key == 37 && objSelecionado.position.x>-0.76){
                objSelecionado.position.x-=0.01;
            }
            //d
            if(key == 40 && objSelecionado.position.y>-0.75){
                objSelecionado.position.y-=0.01;
            }
        }
    }
}

function rotateObject(e){
    var key = e.which;
    if(key == 110){
        addNovoObjeto();
    }
    
    if(objSelecionado != null){
		//a
		if(key == 97){
			objSelecionado.rotation.y+=0.1;
		}
		//w
		if(key == 119){
			objSelecionado.rotation.x+=0.1;
		}
		//s
		if(key == 115){
			objSelecionado.rotation.x-=0.1;
		}
		//d
		if(key == 100){
			objSelecionado.rotation.y-=0.1;
		}
                if(key==32){
                    objSelecionado.material.color.setHex(objSelecionado.currentHex );
                    objSelecionado = null;
                    document.getElementById("webGL-output").style.cursor = 'auto';
                }
	}
}
//cricao das formas
function formaComplexa4(){
    var geometry = new THREE.Geometry();
    var vertices = [
        new THREE.Vector3(0.15,0.05,-0.05),
        new THREE.Vector3(-0.15,0.05,-0.05),
        new THREE.Vector3(-0.15,0.05,0.05),
        new THREE.Vector3(-0.05,0.05,0.05),
        new THREE.Vector3(-0.05,0.05,0.15),
        new THREE.Vector3(0.05,0.05,0.15),
        new THREE.Vector3(0.05,0.05,0.05),
        new THREE.Vector3(0.15,0.05,0.05),
        
        new THREE.Vector3(0.15,-0.05,-0.05),
        new THREE.Vector3(-0.15,-0.05,-0.05),
        new THREE.Vector3(-0.15,-0.05,0.05),
        new THREE.Vector3(-0.05,-0.05,0.05),
        new THREE.Vector3(-0.05,-0.05,0.15),
        new THREE.Vector3(0.05,-0.05,0.15),
        new THREE.Vector3(0.05,-0.05,0.05),
        new THREE.Vector3(0.15,-0.05,0.05),
        //cubo 
        new THREE.Vector3(0.05,0.15,0.05),
        new THREE.Vector3(-0.05,0.15,0.05),
        new THREE.Vector3(0.05,0.15,0.15),
        new THREE.Vector3(-0.05,0.15,0.15)
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
    formaComp4.name = "formaComp4";
    formaComp4.scale.set(1.6,1.6,1.6);
    var axisHelper = new THREE.AxisHelper(0.3);
    formaComp4.add(axisHelper);
    //scene.add(formaComp4);
}

function formaComplexa3(){
    var geometry = new THREE.Geometry();
    var vertices = [
        new THREE.Vector3(0.15,0.05,-0.05),
        new THREE.Vector3(-0.05,0.05,-0.05),
        new THREE.Vector3(-0.05,0.05,0.15),
        new THREE.Vector3(0.05,0.05,0.15),
        new THREE.Vector3(0.05,0.05,0.05),
        new THREE.Vector3(0.15,0.05,0.05),
        
        new THREE.Vector3(0.15,-0.05,-0.05),
        new THREE.Vector3(-0.05,-0.05,-0.05),
        new THREE.Vector3(-0.05,-0.05,0.15),
        new THREE.Vector3(0.05,-0.05,0.15),
        new THREE.Vector3(0.05,-0.05,0.05),
        new THREE.Vector3(0.15,-0.05,0.05),
        
        //cubo de cima
        new THREE.Vector3(0.05,0.05,-0.05),
        
        //topo cubo
        new THREE.Vector3(0.05,0.15,-0.05),
        new THREE.Vector3(0.15,0.15,-0.05),
        new THREE.Vector3(0.15,0.15,0.05),
        new THREE.Vector3(0.05,0.15,0.05)];
    
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
    formaComp3.name = "formaComp4";
    formaComp3.scale.set(1.6,1.6,1.6);
    var axisHelper = new THREE.AxisHelper(0.3);
    formaComp3.add(axisHelper);
    //scene.add(formaComp3);
}

function formaComplexa2(){
    var geometry = new THREE.Geometry();
    var vertices = [
        new THREE.Vector3(0.15,0.05,-0.05),
        new THREE.Vector3(-0.05,0.05,-0.05),
        new THREE.Vector3(-0.05,0.05,0.15),
        new THREE.Vector3(0.05,0.05,0.15),
        new THREE.Vector3(0.05,0.05,0.05),
        new THREE.Vector3(0.15,0.05,0.05),
        
        new THREE.Vector3(0.15,-0.05,-0.05),
        new THREE.Vector3(-0.05,-0.05,-0.05),
        new THREE.Vector3(-0.05,-0.05,0.15),
        new THREE.Vector3(0.05,-0.05,0.15),
        new THREE.Vector3(0.05,-0.05,0.05),
        new THREE.Vector3(0.15,-0.05,0.05),
        
        //cubo de cima
        new THREE.Vector3(-0.05,0.05,0.05),
        new THREE.Vector3(-0.05,-0.05,0.05),
        
        //topo cubo
        new THREE.Vector3(-0.05,0.15,0.05),
        new THREE.Vector3(0.05,0.15,0.05),
        new THREE.Vector3(0.05,0.15,0.15),
        new THREE.Vector3(-0.05,0.15,0.15)];
    
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
    formaComp2.name = "formaComp2";
    formaComp2.scale.set(1.6,1.6,1.6);
    var axisHelper = new THREE.AxisHelper(0.3);
    formaComp2.add(axisHelper);
    //scene.add(formaComp2);
}

function formaComplexa1(){
    var geometry = new THREE.Geometry();
    var vertices = [
        new THREE.Vector3(0.15,0.05,-0.05),
        new THREE.Vector3(-0.05,0.05,-0.05),
        new THREE.Vector3(-0.05,0.05,0.15),
        new THREE.Vector3(0.05,0.05,0.15),
        new THREE.Vector3(0.05,0.05,0.05),
        new THREE.Vector3(0.15,0.05,0.05),
        
        new THREE.Vector3(0.15,-0.05,-0.05),
        new THREE.Vector3(-0.05,-0.05,-0.05),
        new THREE.Vector3(-0.05,-0.05,0.15),
        new THREE.Vector3(0.05,-0.05,0.15),
        new THREE.Vector3(0.05,-0.05,0.05),
        new THREE.Vector3(0.15,-0.05,0.05),
        
        //cubo de cima
        new THREE.Vector3(0.05,0.05,-0.05),
        new THREE.Vector3(-0.05,0.05,0.05),
        new THREE.Vector3(0.05,-0.05,-0.05),
        new THREE.Vector3(-0.05,-0.05,0.05),
        
        //topo cubo
        new THREE.Vector3(-0.05,0.15,-0.05),
        new THREE.Vector3(0.05,0.15,-0.05),
        new THREE.Vector3(0.05,0.15,0.05),
        new THREE.Vector3(-0.05,0.15,0.05)];
    
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
    formaComp1.name = "formaComp1";
    formaComp1.scale.set(1.6,1.6,1.6);
    var axisHelper = new THREE.AxisHelper(0.3);
    formaComp1.add(axisHelper);
    //scene.add(formaComp1);
}

function formaSimples4(){
    var geometry = new THREE.Geometry();
    var vertices = [
        new THREE.Vector3(0.15,0.05,-0.15),
        new THREE.Vector3(0.05,0.05,-0.15),
        new THREE.Vector3(0.05,0.05,-0.05),
        new THREE.Vector3(-0.05,0.05,-0.05),
        new THREE.Vector3(-0.05,0.05,0.15),
        new THREE.Vector3(0.05,0.05,0.15),
        new THREE.Vector3(0.05,0.05,0.05),
        new THREE.Vector3(0.15,0.05,0.05),
        
        new THREE.Vector3(0.15,-0.05,-0.15),
        new THREE.Vector3(0.05,-0.05,-0.15),
        new THREE.Vector3(0.05,-0.05,-0.05),
        new THREE.Vector3(-0.05,-0.05,-0.05),
        new THREE.Vector3(-0.05,-0.05,0.15),
        new THREE.Vector3(0.05,-0.05,0.15),
        new THREE.Vector3(0.05,-0.05,0.05),
        new THREE.Vector3(0.15,-0.05,0.05)];
    
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
    forma4.name = "forma4"; 
    forma4.scale.set(1.6,1.6,1.6);
    var axisHelper = new THREE.AxisHelper(0.3);
    forma4.add(axisHelper);
    //scene.add(forma4);
}

function formaSimples3(){
    var geometry = new THREE.Geometry();
    var vertices = [
        new THREE.Vector3(0.15,0.05,-0.05),
        new THREE.Vector3(-0.15,0.05,-0.05),
        new THREE.Vector3(-0.15,0.05,0.05),
        new THREE.Vector3(-0.05,0.05,0.05),
        new THREE.Vector3(-0.05,0.05,0.15),
        new THREE.Vector3(0.05,0.05,0.15),
        new THREE.Vector3(0.05,0.05,0.05),
        new THREE.Vector3(0.15,0.05,0.05),
        
        new THREE.Vector3(0.15,-0.05,-0.05),
        new THREE.Vector3(-0.15,-0.05,-0.05),
        new THREE.Vector3(-0.15,-0.05,0.05),
        new THREE.Vector3(-0.05,-0.05,0.05),
        new THREE.Vector3(-0.05,-0.05,0.15),
        new THREE.Vector3(0.05,-0.05,0.15),
        new THREE.Vector3(0.05,-0.05,0.05),
        new THREE.Vector3(0.15,-0.05,0.05)];
    
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
    forma3.name = "forma3";
    forma3.scale.set(1.6,1.6,1.6);
    var axisHelper = new THREE.AxisHelper(0.3);
    forma3.add(axisHelper);
    //scene.add(forma3);
}
//forma de L
function formaSimples2(){
    var geometry = new THREE.Geometry();
    var vertices = [
        new THREE.Vector3(0.25,0.05,-0.05),
        new THREE.Vector3(-0.05,0.05,-0.05),
        new THREE.Vector3(-0.05,0.05,0.15),
        new THREE.Vector3(0.05,0.05,0.15),
        new THREE.Vector3(0.05,0.05,0.05),
        new THREE.Vector3(0.25,0.05,0.05),
        new THREE.Vector3(0.25,-0.05,-0.05),
        new THREE.Vector3(-0.05,-0.05,-0.05),
        new THREE.Vector3(-0.05,-0.05,0.15),
        new THREE.Vector3(0.05,-0.05,0.15),
        new THREE.Vector3(0.05,-0.05,0.05),
        new THREE.Vector3(0.25,-0.05,0.05)];
    
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
    forma2.name = "forma2";
    forma2.scale.set(1.6,1.6,1.6);
    var axisHelper = new THREE.AxisHelper(0.3);
    forma2.add(axisHelper);
    //scene.add(forma2); 
}
//tres cubos 
function formaSimples1(){
    var geometry = new THREE.Geometry();
    var vertices = [
        new THREE.Vector3(0.15,0.05,-0.05),
        new THREE.Vector3(-0.05,0.05,-0.05),
        new THREE.Vector3(-0.05,0.05,0.15),
        new THREE.Vector3(0.05,0.05,0.15),
        new THREE.Vector3(0.05,0.05,0.05),
        new THREE.Vector3(0.15,0.05,0.05),
        new THREE.Vector3(0.15,-0.05,-0.05),
        new THREE.Vector3(-0.05,-0.05,-0.05),
        new THREE.Vector3(-0.05,-0.05,0.15),
        new THREE.Vector3(0.05,-0.05,0.15),
        new THREE.Vector3(0.05,-0.05,0.05),
        new THREE.Vector3(0.15,-0.05,0.05)];
    
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
    forma1.name = "forma1";
    forma1.scale.set(1.6,1.6,1.6);
    var axisHelper = new THREE.AxisHelper(0.3);
    forma1.add(axisHelper);
    //scene.add(forma1);
}

/*
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

*/

/*
function onDocumentMouseMove(e){
    e.preventDefault();
    
    mouse.x = ( (e.clientX / window.innerWidth ) * 2 - 1 );
    mouse.y = (-(e.clientY/window.innerHeight) * 2 + 1);
       
    detectaColisaoParede();
    
    if(objSelecionado && (colisao==0)){
	mouse.x = ( (e.clientX / window.innerWidth ) * 2 - 1 );
	mouse.y = (-(e.clientY/window.innerHeight) * 2 + 1);
        //intersects[0].object.material.color.set(0xff0000);
        objSelecionado.position.x = mouse.x;
        objSelecionado.position.y = mouse.y;
    }
    
    lastposX = ( (e.clientX / window.innerWidth ) * 2 - 1);
}
*/