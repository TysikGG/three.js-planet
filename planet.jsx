import * as THREE from 'three';

import ThreeGlobe from 'three-globe';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';


function loadPlanet() {
    window.THREE = THREE;
    const N = 20;
    const rotateAxis = new THREE.Vector3(0, 1, 0);
    const rotateAngle = -0.005;

    const arcsData = [...Array(N).keys()].map(() => ({
      startLat: (Math.random() - 0.5) * 180,
      startLng: (Math.random() - 0.5) * 360,
      endLat: (Math.random() - 0.5) * 180,
      endLng: (Math.random() - 0.5) * 360,
      color: ['red', 'white', 'blue', 'green', 'yellow', "purple", "black"][Math.round(Math.random() * 6)]
    }));



    const Globe = new ThreeGlobe()
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
      .arcsData(arcsData)
      .arcColor('color')
      .arcDashLength(0.4)
      .arcDashGap(4)
      .arcDashInitialGap(() => Math.random() * 5)
      .arcDashAnimateTime(1000)

    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 0); 
    renderer.setSize(window.innerWidth/1.6, window.innerHeight/1.6);
    document.getElementById('world').appendChild(renderer.domElement)

    const scene = new THREE.Scene();
    scene.add(Globe);
    scene.add(new THREE.AmbientLight(0xcccccc, Math.PI));
    scene.add(new THREE.DirectionalLight(0xffffff, 0.3 * Math.PI));

    const camera = new THREE.PerspectiveCamera();
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    camera.position.z = 290;

    const tbControls = new TrackballControls(camera, renderer.domElement);
    tbControls.minDistance = 101;
    tbControls.rotateSpeed = 5;
    tbControls.zoomSpeed = 0; 
    tbControls.noZoom = true;
    tbControls.noPan = true;
    tbControls.maxDistance = tbControls.minDistance;  

    (function animate() {
      // Анимация
      tbControls.update();
      renderer.render(scene, camera);
      Globe.rotateOnAxis(rotateAxis, rotateAngle)
        requestAnimationFrame(animate);
    })();
}

export default loadPlanet