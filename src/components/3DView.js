import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ThreeDCube = ({ length, width, height, color, metalPositions, metalSpan }) => {
    const cubeRef = useRef();
    const [reset, setReset] = useState(false);
    const [viewMetalBB, setViewMetalBB] = useState(true);
    
    const toggleViewMetalBB = () => {
        setViewMetalBB(!viewMetalBB);
    };

    const toggleReset = () => {
        setReset(!reset);
    };

    useEffect(() => {
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.set(100, 100, 120);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth / 1.9, window.innerHeight / 1.9);
        renderer.setClearColor(0xffffff);
        cubeRef.current.appendChild(renderer.domElement);

        const gridHelper = new THREE.GridHelper(100, 60, 0x0000FF, 0xBBBBFF);
        scene.add(gridHelper);

        const ambientLight = new THREE.AmbientLight(0x606060);
        scene.add(ambientLight);

        const directionalLight1 = new THREE.DirectionalLight(0xffffff, 3);
        directionalLight1.position.set(0, 2, 1);
        scene.add(directionalLight1);

        const directionalLight2 = new THREE.DirectionalLight(0xffffff, 2);
        directionalLight2.position.set(1, 1, -1);
        scene.add(directionalLight2);

        // Wood cube
        const geometry = new THREE.BoxGeometry(length / 10, height / 10, width / 10);
        const color_ = new THREE.Color(color);
        const material = new THREE.MeshStandardMaterial({ color: color_, transparent: true, opacity: 0.5, depthWrite: false, depthTest: false, alphaTest: 0.5 });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(0, height / 20, 0);
        scene.add(cube);

        // Metal cubes and spheres
        const metalGeometry = new THREE.BoxGeometry(metalSpan / 10, height / 9, width / 9);
        const metalColor = new THREE.Color('rgb(255, 0, 0)');
        const metalMaterial = new THREE.MeshStandardMaterial({ color: metalColor, transparent: true, opacity: 0.9, depthWrite: false, depthTest: false, alphaTest: 0.5 });

        const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32); // 10mm radius scaled to 1 unit

        // Grouping metal positions based on tolerance
        const groupedMetalPositions = [];
        if (metalPositions && metalSpan) {
            metalPositions.sort((a, b) => a - b).forEach(position => {
                if (groupedMetalPositions.length === 0 || position - groupedMetalPositions[groupedMetalPositions.length - 1][1] > 100) {
                    groupedMetalPositions.push([position, position]);
                } else {
                    groupedMetalPositions[groupedMetalPositions.length - 1][1] = position;
                }
            });
        }
 

        // Add metal cubes, spheres, and bounding boxes
        groupedMetalPositions.forEach(([start, end]) => {
            const metalCube = new THREE.Mesh(metalGeometry, metalMaterial);
            const metalPositionNormalized = ((start + end) / 2 - length / 2) / 10; // Centering and scaling the position
            metalCube.position.set(metalPositionNormalized, height / 20, 0);
            // scene.add(metalCube);

            // Add spheres for each metal position
            metalPositions.forEach(position => {
                if (position >= start && position <= end) {
                    const sphere = new THREE.Mesh(sphereGeometry, metalMaterial);
                    const spherePositionNormalized = (position - length / 2) / 10; // Centering and scaling the position
                    sphere.position.set(spherePositionNormalized, height / 20, 0);
                    if (viewMetalBB) {
                        scene.add(sphere);
                    };
                }
            });

            // Add bounding box
            const boxGeometry = new THREE.BoxGeometry((end - start + metalSpan) / 10, height / 9, width / 9);
            const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false, transparent: true, opacity: 0.5, depthTest: false, depthWrite: false });
            const boundingBox = new THREE.Mesh(boxGeometry, boxMaterial);
            boundingBox.position.set(metalPositionNormalized, height / 20, 0);
            
            if (viewMetalBB) {
                scene.add(boundingBox);
            };
        });

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.screenSpacePanning = false;
        controls.minDistance = 10;
        controls.maxDistance = 1500;

        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };

        animate();

        return () => {
            controls.dispose();
            if (cubeRef.current) {
                cubeRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, [length, width, height, color, metalPositions, metalSpan, reset, viewMetalBB]);

    return (
        <div className='container' style={{ border: '1px solid #ccc' }}>
            <button className='btn btn-dark fonts' onClick={toggleReset}>Default view</button>
            <button className='btn btn-dark fonts ms-2' onClick={toggleViewMetalBB}>Toggle view metals</button>
            <div ref={cubeRef} />
        </div>
    );
};

export default ThreeDCube;
