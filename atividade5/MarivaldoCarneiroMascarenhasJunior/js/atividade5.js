var scene 			= null;
var renderer		= null;
var camera 			= null;
var orbitControls	= null;
var day 			= 0.0;
var year			= 0.0;
var month			= 0.0;
var clock;
var terra;
function init() {
	clock = new THREE.Clock();
	
	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer();
	
    //esfera
    terraGeometry = new THREE.SphereGeometry(30,60,60);

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	renderer.setSize(window.innerWidth*0.7, window.innerHeight*0.7);

	document.getElementById("WebGL-output").appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)

    camera.position.x = 0;
	camera.position.y = 0;
	camera.position.z = 100;
	camera.lookAt(scene.position);
	
	// Controle com trackball
	trackBallControls = new THREE.TrackballControls(camera);
	trackBallControls.autoRotate = false;
    trackBallControls.rotateSpeed = 10;
        
        //--------------------------------------------
    var textureLoader = new THREE.TextureLoader();
	texture = textureLoader.load("img/earthmap4k.jpg");
        
        var textureLoader2 = new THREE.TextureLoader();
        texture2 = textureLoader2.load("img/earthhiresclouds4K.jpg");
        
	var material = new THREE.ShaderMaterial( {
                uniforms:{
                    texture1:{type:"t", value:texture},
                    texture2:{type:"t", value:texture2}
                },
		vertexShader: document.getElementById( 'shader-vs' ).textContent,
		fragmentShader: document.getElementById( 'shader-fs' ).textContent
	} );
        
    terra = new THREE.Mesh(terraGeometry,material);
	scene.add(terra);	
        render();
}

function render() {
	var delta = clock.getDelta();
    trackBallControls.update(delta);

	renderer.render(scene, camera);
	requestAnimationFrame(render);
}



