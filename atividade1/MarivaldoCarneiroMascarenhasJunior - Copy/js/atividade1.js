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

function init(){
        scene = new THREE.Scene();
        
        camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 10000);

        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(new THREE.Color(0x000000));
        renderer.setSize(window.innerWidth*0.9, window.innerHeight*0.95);

        camera.position.x = 0;
        camera.position.y = 150;
        camera.position.z = 50;
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        
        scene.add(camera);       
       
        document.getElementById("webGL-output").appendChild(renderer.domElement);
		
	var axisHelper = new THREE.AxisHelper(100);
        //scene.add( axisHelper );
        desenhaCenario();
        
        customRender();
}

function customRender(){    
    requestAnimationFrame( customRender);
    renderer.render( scene, camera );
}

function desenhaCenario(){
    for(x=-100;x<100;x+=25){
        var material = new THREE.LineBasicMaterial({
	color: 0x0000ff
            });
        var geometry = new THREE.Geometry();
        geometry.vertices.push(
	new THREE.Vector3( x, 100, 100 ),
	new THREE.Vector3( x, 0, 100 )
    );

    var line = new THREE.Line( geometry, material );
    scene.add( line );
    }
    
    for(x=-100;x<100;x+=25){
        var material = new THREE.LineBasicMaterial({
	color: 0x0000ff
            });
        var geometry = new THREE.Geometry();
        geometry.vertices.push(
	new THREE.Vector3( 100, 100, x ),
	new THREE.Vector3( 100, 0, x )
    );

    var line = new THREE.Line( geometry, material );
    scene.add( line );
    }
    
    for(x=-100;x<100;x+=25){
        var material = new THREE.LineBasicMaterial({
	color: 0x0000ff
            });
        var geometry = new THREE.Geometry();
        geometry.vertices.push(
	new THREE.Vector3( -100, 100, x ),
	new THREE.Vector3( -100, 0, x )
    );

    var line = new THREE.Line( geometry, material );
    scene.add( line );
    }
    
    for(x=-100;x<100;x+=25){
        var material = new THREE.LineBasicMaterial({
	color: 0x0000ff
            });
        var geometry = new THREE.Geometry();
        geometry.vertices.push(
	new THREE.Vector3( x, 100, -100 ),
	new THREE.Vector3( x, 0, -100 )
    );

    var line = new THREE.Line( geometry, material );
    scene.add( line );
    }
    
    for(x=-100;x<100;x+=25){
        var material = new THREE.LineBasicMaterial({
	color: 0x0000ff});
        var geometry = new THREE.Geometry();
        geometry.vertices.push(
	new THREE.Vector3( -100, 0, x ),
	new THREE.Vector3( 100, 0, x )
    );

    var line = new THREE.Line( geometry, material );
    scene.add( line );
    }
    
    for(x=-100;x<100;x+=25){
        var material = new THREE.LineBasicMaterial({
	color: 0x0000ff});
        var geometry = new THREE.Geometry();
        geometry.vertices.push(
	new THREE.Vector3( x, 0, -100 ),
	new THREE.Vector3( x, 0, 100 )
    );

    var line = new THREE.Line( geometry, material );
    scene.add( line );
    }
    
    for(x=0;x<100;x+=25){
        var material = new THREE.LineBasicMaterial({
	color: 0x0000ff});
        var geometry = new THREE.Geometry();
        geometry.vertices.push(
	new THREE.Vector3( -100, x, 100 ),
	new THREE.Vector3( 100, x, 100 )
    );

    var line = new THREE.Line( geometry, material );
    scene.add( line );
    }
    
    for(x=0;x<100;x+=25){
        var material = new THREE.LineBasicMaterial({
	color: 0x0000ff});
        var geometry = new THREE.Geometry();
        geometry.vertices.push(
	new THREE.Vector3( -100, x, -100 ),
	new THREE.Vector3( 100, x, -100 )
    );

    var line = new THREE.Line( geometry, material );
    scene.add( line );
    }
    
    for(x=0;x<200;x+=25){
        var material = new THREE.LineBasicMaterial({
	color: 0x0000ff});
        var geometry = new THREE.Geometry();
        geometry.vertices.push(
	new THREE.Vector3( 100, x, -100 ),
	new THREE.Vector3( 100, x, 100 )
    );

    var line = new THREE.Line( geometry, material );
    scene.add( line );
    }
    
    for(x=0;x<200;x+=25){
        var material = new THREE.LineBasicMaterial({
	color: 0x0000ff});
        var geometry = new THREE.Geometry();
        geometry.vertices.push(
	new THREE.Vector3( -100, x, -100 ),
	new THREE.Vector3( -100, x, 100 )
    );

    var line = new THREE.Line( geometry, material );
    scene.add( line );
    }
    
    
    
    
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

function rotateObject(e){
    var key = e.which;

    if(objSelecionado != null){
		//a
		if(key == 97){
			camera.position.y+=0.1;
		}
		//w
		if(key == 119){
			camera.position.x+=0.1;
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

