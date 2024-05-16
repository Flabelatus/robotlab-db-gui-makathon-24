import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ThreeDCube = ({ length, width, height, color }) => {
    const cubeRef = useRef();
    const [reset, setReset] = useState(false);

    const toggleReset = () => {
        if (!reset) {
            setReset(true);
        } else {
            setReset(false);
        };
    };

    useEffect(() => {

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 1200);
        camera.position.set(50, 50, 55);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth / 1.9, window.innerHeight / 1.9);
        renderer.setClearColor(0xffffff);
        cubeRef.current.appendChild(renderer.domElement);

        const gridHelper = new THREE.GridHelper(35, 40, 0x0000FF, 0xBBBBFF);
        scene.add(gridHelper);

        const ambientLight = new THREE.AmbientLight(0x606060);
        scene.add(ambientLight);

        const directionalLight1 = new THREE.DirectionalLight(0xffffff, 3);
        directionalLight1.position.set(0, 2, 1);

        const directionalLight2 = new THREE.DirectionalLight(0xffffff, 2);
        directionalLight2.position.set(1, 1, -1);

        scene.add(directionalLight1);
        scene.add(directionalLight2);

        const geometry = new THREE.BoxGeometry(length / 60, height / 60, width / 60);
        var color_ = new THREE.Color(color);
        var material = new THREE.MeshStandardMaterial({ color: color_ });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(0, height / 100, 0);
        scene.add(cube);

        const controls = new OrbitControls(camera, renderer.domElement);

        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.screenSpacePanning = false;
        controls.minDistance = 5;
        controls.maxDistance = 150;

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
    }, [length, width, height, color, reset]);

    return <div className='container' style={{ border: '1px solid #ccc' }}>
        <button className='btn btn-dark fonts' onClick={toggleReset}>Default view</button>
        <div ref={cubeRef} />
    </div>;
};

export default ThreeDCube;