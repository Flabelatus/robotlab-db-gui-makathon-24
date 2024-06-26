import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader'; // Import from correct path

export const PCDViewer = ({ pcdFile }) => {
    const containerRef = useRef();
    const [reset, setReset] = useState(false);
    const [loading, setLoading] = useState(true);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 5000);
    camera.position.set(-86, -23, 665);
    camera.rotateOnWorldAxis(new THREE.Vector3(1, 1, 0), 0.9);
    const renderer = new THREE.WebGLRenderer({ antialias: true }); // Enable antialiasing for smoother rendering
    let pointCloud;

    const toggleReset = () => {
        console.log(camera.position.x, camera.position.y, camera.position.z);
        if (!reset) {
            setReset(true);
        } else {
            setReset(false);
        };
    };

    useEffect(() => {
        const container = containerRef.current;

        // Set up renderer
        renderer.setSize(window.innerWidth / 1.9, window.innerHeight / 1.9);
        renderer.setClearColor(0xffffff);
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
        
                // Colorize points based on z-coordinate
                const color = new THREE.Color();
                const geometry = points.geometry;

                geometry.rotateZ(0.7)
                const positionAttribute = geometry.getAttribute('position');
                const colorAttribute = new THREE.Float32BufferAttribute(positionAttribute.count * 3, 3);
        
                // Calculate min and max Z values
                let minZ = Infinity;
                let maxZ = -Infinity;
                for (let i = 0; i < positionAttribute.count; i++) {
                    const z = positionAttribute.getZ(i);
                    if (z < minZ) minZ = z;
                    if (z > maxZ) maxZ = z;
                }
        
                // Color the points based on normalized Z values
                for (let i = 0; i < positionAttribute.count; i++) {
                    const z = positionAttribute.getZ(i);
                    const normalizedZ = (z - minZ) / (maxZ - minZ); // Normalize Z values to [0, 1]
                    color.setHSL(1.5 * (1 - normalizedZ), 1.0, 0.5); // Adjust hue for desired color range
                    color.toArray(colorAttribute.array, i * 3);
                }
        
                geometry.setAttribute('color', colorAttribute);
                points.material.vertexColors = true;
        
                scene.add(points);
        
                // Calculate center of the point cloud
                const boundingBox = new THREE.Box3().setFromObject(points);
                const center = boundingBox.getCenter(new THREE.Vector3());
                
                // Update camera's lookAt to target the center of the point cloud
                camera.lookAt(center);
                controls.target.copy(center);
                setLoading(false);
            },
            function (xhr) {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
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
    }, [pcdFile, reset]);

    return (
        <div className='container-pcd mt-4' style={{ border: '1px solid #ccc' }}>
            <div ref={containerRef}>
                <button className='btn btn-dark fonts' onClick={toggleReset}>Default view</button>
            </div>
            {loading ?
                <h1>Loading ...</h1>
                :
                <div className='container-pcd- mt-2 mb-2' ref={containerRef} style={{ width: 'fit-content', border: '0px solid #ccc' }} />
            }
        </div>
    );
};
