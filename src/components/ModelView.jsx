// Code for the ModelView component
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import Lights from "./Lights";
import { Suspense } from "react";
import IPhone from "./IPhone";
import * as THREE from "three";
import Loader from "./Loader";

const ModelView = ({ index, groupRef, gsapType, controlRef, setRotationState, size, item }) => {
    return (
        <Canvas
            index={index}
            id={gsapType}
            className={`w-full h-full absolute ${index === 2 ? 'right-[-100%]' : ''}`} 
        >
            {/* Ambient Light */}
            <ambientLight intensity={0.3} />
            
            <PerspectiveCamera makeDefault position={[0, 0, 4]} />
            <Lights />

            {/* OrbitControls to move or rotate the iPhone model in 3-D space */}
            <OrbitControls 
                makeDefault
                ref={controlRef}
                enableZoom={false}
                enablePan={false}
                rotateSpeed={0.4}
                target={new THREE.Vector3(0, 0, 0)}
                onEnd={
                    () => {
                        if (controlRef.current) {
                            setRotationState(controlRef.current.getAzimuthalAngle());
                          }
                    }
                }
            />

            <group ref={groupRef} name={`${index === 1} ? 'small' : 'large'`} position={[0, 0, 0]}>
                <Suspense fallback={<Loader/>}>
                    <IPhone 
                        scale = {index === 1 ? [15, 15, 15] : [17, 17, 17]}
                        item = {item}
                        size = {size}
                    />
                </Suspense>
            </group>

        </Canvas>
    );
};

export default ModelView;
