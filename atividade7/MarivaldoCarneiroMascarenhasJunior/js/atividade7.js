var texture;
var renderer;
var scene;
var camera;

function init() {

	scene = new THREE.Scene();
	renderer = new THREE.WebGLRenderer();
	
	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));

	camera = new THREE.OrthographicCamera( -0.5, 0.5, 0.5, -0.5, -1.0, 1.0 );
	scene.add( camera );
	
	var textureLoader = new THREE.TextureLoader();
	texture = textureLoader.load("imgs/wall.jpg");
	
	var textureLoader1 = new THREE.TextureLoader();
	texture1 = textureLoader1.load("imgs/wall.jpg");
	
	document.getElementById("WebGL-output").appendChild(renderer.domElement);


	renderer.clear();
	requestAnimationFrame(render);
};


function render() {

	var greenCK = new THREE.Vector3(1.0,1.0,1.0);

	if (!texture.image) 
		requestAnimationFrame(render);
	else {
		
		var matShader = new THREE.ShaderMaterial( {
				uniforms:{
                    texture:{type:"t", value:texture},
                    texture1:{type:"t", value:texture1},
					whiteCK: {type:"vector3",value:greenCK}
                },
				vertexShader: document.getElementById( 'base-vs' ).textContent,
				fragmentShader: document.getElementById( 'base-fs' ).textContent
			} );
		
		// Plane
		var planeGeometry = new THREE.PlaneBufferGeometry(1.0, 1.0, 20, 20);                 
		var plane = new THREE.Mesh( planeGeometry, matShader );
		plane.position.set(0.0, 0.0, -0.5);
		scene.add( plane );	

		renderer.setSize(texture.image.width, texture.image.height);
		renderer.render(scene, camera);
		}
}
