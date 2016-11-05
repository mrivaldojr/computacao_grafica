var texture;
var renderer;
var scene;
var camera;
var fator = 0;
var matShader;
var plane;
var planeGeometry;

function init() {

	scene = new THREE.Scene();
	renderer = new THREE.WebGLRenderer();
	
	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));

	camera = new THREE.OrthographicCamera( -0.5, 0.5, 0.5, -0.5, -1.0, 1.0 );
	scene.add( camera );
	
	var textureLoader = new THREE.TextureLoader();
	texture = textureLoader.load("imgs/galaxia.jpg");
	
	var textureLoader1 = new THREE.TextureLoader();
	texture1 = textureLoader1.load("imgs/buraco_negro.jpg");
	
	planeGeometry = new THREE.PlaneBufferGeometry(1.0, 1.0, 20, 20);
	
	document.getElementById("WebGL-output").appendChild(renderer.domElement);
	

	
	renderer.clear();
	render();
};



function render() {

	if (!texture.image) 
		requestAnimationFrame(render);
	if(fator<=1) {
		
			//....
	matShader = new THREE.ShaderMaterial( {
				uniforms:{
                    texture: {type:"t", value:texture},
                    texture1:{type:"t", value:texture1},
					fator:   {type:"float",value:fator}
                },
				vertexShader:   document.getElementById( 'base-vs' ).textContent,
				fragmentShader: document.getElementById( 'base-fs' ).textContent
			} );
			
		
		  
		plane = new THREE.Mesh( planeGeometry, matShader );

		plane.position.set(0.0, 0.0, -0.5);
		scene.add( plane );
	
	//.....
		
		fator+=0.01;
		
		requestAnimationFrame(render);
		renderer.setSize(texture.image.width, texture.image.height);
		renderer.render(scene, camera);
	}
		
}
