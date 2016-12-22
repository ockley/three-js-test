var scene;
var camera;
var renderer;
var triangleMesh;
var squareMesh;

initializeScene();
animateScene();

function initializeScene() {
    if(Detector.webgl) {
        renderer = new THREE.WebGLRenderer( {antialias:true} );
    } else {
        renderer = new THREE.CanvasRenderer();
    }
    renderer.setClearColor( 0x000000, 1 );
    
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
    renderer.setSize(canvasWidth, canvasHeight);
    
    document.getElementById( "WebGLCanvas" ).appendChild(renderer.domElement);
    
    scene = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera( 45, canvasWidth/canvasHeight, 1, 100 );
    camera.position.set( 0, 0, 10 );
    camera.lookAt( scene.position );
    scene.add( camera );
    
    //Create triangle
    var triangleGeometry = new THREE.Geometry();
    triangleGeometry.vertices.push( new THREE.Vector3( 0.0, 1.0, 0.0 ) );
    triangleGeometry.vertices.push( new THREE.Vector3( -1.0, -1.0, 0.0 ) );
    triangleGeometry.vertices.push( new THREE.Vector3( 1.0, -1.0, 0.0 ) );
    triangleGeometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
    
    triangleGeometry.faces[0].vertexColors[0] = new THREE.Color(0xFF0000);
    triangleGeometry.faces[0].vertexColors[1] = new THREE.Color(0x00FF00);
    triangleGeometry.faces[0].vertexColors[2] = new THREE.Color(0x0000FF);
    
    var triangleMaterial = new THREE.MeshBasicMaterial({
        vertexColors: THREE.VertexColors,
        side: THREE.DoubleSide
    });
    
    triangleMesh = new THREE.Mesh(triangleGeometry, triangleMaterial);
    triangleMesh.position.set(-1.5, 0.0, 4.0);
    scene.add(triangleMesh);
    
    // Create Square
    var squareGeometry = new THREE.Geometry();
    squareGeometry.vertices.push(new THREE.Vector3(-1.0, 1.0, 0.0));
    squareGeometry.vertices.push(new THREE.Vector3(1.0, 1.0, 0.0));
    squareGeometry.vertices.push(new THREE.Vector3(1.0, -1.0, 0.0));
    squareGeometry.vertices.push(new THREE.Vector3(-1.0, -1.0, 0.0));
    squareGeometry.faces.push(new THREE.Face3(0, 1, 2));
    squareGeometry.faces.push(new THREE.Face3(0, 2, 3));
    
    var squareMaterial = new THREE.MeshBasicMaterial({
       color: 0x8080FF,
        side: THREE.DoubleSide
    });
    
    squareMesh = new THREE.Mesh(squareGeometry, squareMaterial);
    squareMesh.position.set(1.5, 0.0, 4.0);
    scene.add(squareMesh);
}

function animateScene() {
    triangleMesh.rotation.y += 0.1;
    squareMesh.rotation.x -= 0.075;
    
    requestAnimationFrame( animateScene );
    renderScene();
}

function renderScene() {
    renderer.render(scene, camera);
}
