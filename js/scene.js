
var camera, controls, scene, renderer;

var callbackProgress, callbackFinished;

init();

function init() {

	renderer = new THREE.WebGLRenderer({antialias: true, alpha:true});
	renderer.setClearColor( 0xdddddd );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );

	document.body.appendChild( renderer.domElement );

	scene = new THREE.Scene();

	setUpCamera();				

	addMesh();

	setUpSkyDome();

	setUpLights();

	setUpControls();
	window.addEventListener( 'resize', onWindowResize, false );			

}

function animate() {
	requestAnimationFrame( animate );
	render();
}

function render() {
	renderer.render( scene, camera );
}

function setUpCamera(){
	camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 600 );
	camera.position.z = 100;
}

function addMesh(url){

	var loaderDae = new THREE.ColladaLoader();

	loaderDae.load( 'assets/models/board.dae', function ( collada ) {

		mesh2 = collada.scene;
		
		var geometry = mesh2.children[0].children[0].geometry
		var material =  new THREE.MeshBasicMaterial();

		var textureLoader = new THREE.TextureLoader();			
		material.map    = textureLoader.load('assets/textures/board/texture2.jpg');
		material.map.minFilter = THREE.LinearFilter;

		mesh = new THREE.Mesh( geometry, material );	
		mesh.scale.x = mesh.scale.y = mesh.scale.z = 10;
		mesh.rotation.x = Math.PI/2;	
														
		$( "#progress" ).animate({
			opacity: 0,
		}, 750, function() {					
			$( "body" ).css({cursor:'pointer'});
			$( "#progress" ).hide();				
			$( "#menu-icon" ).animate({
				right: 0,
			}, 1000);
			$( "#info" ).animate({
				right: 0,
			}, 1000);
		});
		
		scene.add( mesh );

		animate();
		

	},
	// Function called when download progresses
	function ( xhr ) {
		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	});
}

function setUpSkyDome(){
    
    var uniforms = {
        texture: { type: 't', value: THREE.ImageUtils.loadTexture('assets/textures/dome/blur/lab.jpg') }
    };
    var skyMaterial = new THREE.ShaderMaterial( {
        uniforms: uniforms,
        vertexShader: document.getElementById('sky-vertex').textContent, fragmentShader: document.getElementById('sky-fragment').textContent
    });

    // create Mesh with sphere geometry and add to the scene
    var skyBox = new THREE.Mesh(new THREE.SphereGeometry(250, 60, 40), skyMaterial);
    skyBox.scale.set(-1, 1, 1);
    skyBox.rotation.order = 'XZY';
    skyBox.renderOrder = 500.0;

    skyBox.name = "skyDome";

    this.scene.add(skyBox);
}

function setUpLights(){

	var colorGround = 0x999999;
	var colorSKy = 0x999999;

	hemiLight = new THREE.HemisphereLight( colorSKy, colorGround, 0.6 );				
	hemiLight.position.set( 0, 500, 0 );
	scene.add( hemiLight );

	dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
	dirLight.position.set( -1, 1.75, 1 );
	dirLight.position.multiplyScalar( 50 );
	scene.add( dirLight );
}

function setUpControls(){
	controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.enableDamping = true;
	controls.dampingFactor = 0.25;
	controls.enableZoom = true;

	controls.minDistance = 30;
	controls.maxDistance = 100;
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}
