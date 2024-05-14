import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader'; // Import from correct path

export const PCDViewer = ({ pcdFile }) => {
    const containerRef = useRef();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true }); // Enable antialiasing for smoother rendering
    let pointCloud;

    useEffect(() => {
        const container = containerRef.current;
        
        // Set up renderer
        renderer.setSize(window.innerWidth / 1.9, window.innerHeight / 1.9);
        renderer.setClearColor(0x5500ff);
        container.appendChild(renderer.domElement);
    
        const ambientLight = new THREE.AmbientLight(0x606060);
        scene.add(ambientLight);

        const directionalLight1 = new THREE.DirectionalLight(0xffffff, 4);
        directionalLight1.position.set(0, 2, 1);

        const directionalLight2 = new THREE.DirectionalLight(0xffffff, 3);
        directionalLight2.position.set(1, 1, -1);

        scene.add(directionalLight1);
        scene.add(directionalLight2);
 
        const controls = new OrbitControls(camera, renderer.domElement);

        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.screenSpacePanning = false;
        controls.minDistance = 5;
        controls.maxDistance = 3500;

        // Load PCD file
        const loader = new PCDLoader();
        loader.load(
            pcdFile,
            function (points) {
                pointCloud = points;
                scene.add(points);
        
                // Calculate center of the point cloud
                const boundingBox = new THREE.Box3().setFromObject(points);
                const center = boundingBox.getCenter(new THREE.Vector3());
        
                // Update camera's lookAt to target the center of the point cloud
                camera.lookAt(center);
                controls.target.copy(center);

            },
            
            function ( xhr ) {

                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        
            },  
            function (error) {
                console.error('An error happened', error);
            }
        );

        const animate = function () {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };

        animate();

        // Cleanup
        return () => {
            container.removeChild(renderer.domElement);
            scene.remove(pointCloud);
        };
    }, [pcdFile]);

    return <div className='container-pcd mt-2 mb-2' ref={containerRef} style={{width: 'fit-content', border: '1px solid #ccc'}} />;
};
