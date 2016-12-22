var scene;
var camera;
var renderer;
var pyramidMesh;
var boxMesh;
initializeScene();
animateScene();

function initializeScene() {
    if (Detector.webgl) {
        renderer = new THREE.WebGLRenderer({
            antialias: true
        });
    } else {
        renderer = new THREE.CanvasRenderer();
    }
    renderer.setClearColor(0x000000, 1);
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
    renderer.setSize(canvasWidth, canvasHeight);
    document.getElementById("WebGLCanvas").appendChild(renderer.domElement);
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, canvasWidth / canvasHeight, 1, 100);
    camera.position.set(0, 0, 10);
    camera.lookAt(scene.position);
    scene.add(camera);
    //Create triangle
    var pyramidGeometry = new THREE.CylinderGeometry(0, 1.5, 1.5, 4, false);
    for (i = 0; i < pyramidGeometry.faces.length; i++) {
        if (pyramidGeometry.faces[i] instanceof THREE.Face4) {
            pyramidGeometry.faces[i].vertexColors[0] = new THREE.Color(0xFF0000);
            if ((i % 2) == 0) {
                pyramidGeometry.faces[i].vertexColors[1] = new THREE.Color(0x00FF00);
                pyramidGeometry.faces[i].vertexColors[2] = new THREE.Color(0x0000FF);
            } else {
                pyramidGeometry.faces[i].vertexColors[1] = new THREE.Color(0x0000FF);
                pyramidGeometry.faces[i].vertexColors[2] = new THREE.Color(0x00FF00);
            }
            pyramidGeometry.faces[i].vertexColors[3] = new THREE.Color(0xFF0000);
        } else {
            pyramidGeometry.faces[i].vertexColors[0] = new THREE.Color(0xFF0000);
            pyramidGeometry.faces[i].vertexColors[1] = new THREE.Color(0x00FF00);
            pyramidGeometry.faces[i].vertexColors[2] = new THREE.Color(0x0000FF);
        }
    }
    var pyramidMaterial = new THREE.MeshBasicMaterial({
        vertexColors: THREE.VertexColors,
        side: THREE.DoubleSide
    });

    pyramidMesh = new THREE.Mesh(pyramidGeometry, pyramidMaterial);
    pyramidMesh.position.set(-1.5, 0.0, 4.0);
    scene.add(pyramidMesh);

    // Create box
    var boxGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);

    var boxMaterials = [
        new THREE.MeshBasicMaterial({color: 0xFF0000}),
        new THREE.MeshBasicMaterial({color: 0x00FF00}),
        new THREE.MeshBasicMaterial({color: 0x0000FF}),
        new THREE.MeshBasicMaterial({color: 0xFFFF00}),
        new THREE.MeshBasicMaterial({color: 0x00FFFF}),
        new THREE.MeshBasicMaterial({color: 0xFFFFFF})
    ];

    var boxMaterial = new THREE.MeshFaceMaterial(boxMaterials);

    boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    boxMesh.position.set(1.5, 0.0, 4.0);
    scene.add(boxMesh);
}

function animateScene() {
    pyramidMesh.rotation.y += 0.1;
    boxMesh.rotateOnAxis(new THREE.Vector3(1, 1, 1).normalize(), 0.075);
    requestAnimationFrame(animateScene);
    renderScene();
}

function renderScene() {
    renderer.render(scene, camera);
}
