let camera;
let scene;
let renderer;

function init(){

    let stats=initStats();

    scene = new THREE.Scene;
    camera = new THREE.PerspectiveCamera(
        45, window.innerWidth/window.innerHeight,0.1,1000);
    
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xEEEEEE));
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.shadowMap.enabled = true;

    let sphereGeometry=new THREE.SphereGeometry(4,20,20);
    let sphereMaterial=new THREE.MeshLambertMaterial({
        color:0x00ff00});
    let sphere=new THREE.Mesh(sphereGeometry,sphereMaterial);

    sphere.position.x=20;
    sphere.position.y=4;
    sphere.position.z=2;
    sphere.castShadow=true;

    scene.add(sphere);

    camera.position.x=-30;
    camera.position.y=40;
    camera.position.z=30;
    camera.lookAt(scene.position);

    let spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-20,30,-5);
    spotLight.castShadow=true;
    scene.add(spotLight);

    document.getElementById("test").appendChild(renderer.domElement);

    let step=0;

    let controls = new function(){
        this.rotationSpeed = 0.02;
        this.bouncingSpeed = 0.03;
    }

    let gui = new dat.GUI();
    gui.add(controls,"bouncingSpeed",0,0.5);

    renderScene();


    function renderScene(){

        stats.update();

        step += controls.bouncingSpeed;
        sphere.position.x = 20+(10*(Math.cos(step)));
        sphere.position.y = 2+(10*Math.abs(Math.sin(step)));

        requestAnimationFrame(renderScene);
        renderer.render(scene,camera);
    }

    function initStats(){
        let stats = new Stats;
        stats.setMode(0);
        stats.domElement.style.position="adsolute";
        stats.domElement.style.left="0px";
        stats.domElement.style.top="0px";
        document.getElementById("info").appendChild(
        stats.domElement);
        return stats;
    }

    function onResize(){
        camera.aspect = window.innerWidth/window/innerWidth;
        camera.updateProjectionMatrix();
        renderer.setSize(windoe.innerWidth,window.innerHeight);
    }

}


window.onload=init;

window.addEventListener("resize",onResize,false);