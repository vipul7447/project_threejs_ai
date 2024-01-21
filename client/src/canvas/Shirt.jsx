import React from 'react'
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';

import state from '../store';

const Shirt = () => {
  const snap = useSnapshot(state);
  // easily load and manage GLTF (GL Transmission Format) models in a Three.js
  const { nodes, materials } = useGLTF('/shirt_baked.glb');

  /* In Three.js, decals are textures that you can apply to existing geometry, 
  allowing you to add details or modify specific parts of a mesh */
  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

    // to apply color smoothly and not dramatically
    useFrame((state, delta) => easing.dampC(materials.lambert1.color,
    snap.color, 0.25, delta));

    // stateString tracks state changes
    const stateString = JSON.stringify(snap);

  return (
    // key is used here because shirt is sometimes not updating
    // The <mesh> element in Three.js is used to define a 3D object in a Three.js scene
    <group key={stateString}>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >
        {snap.isFullTexture && (
          <Decal 
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}

        {snap.isLogoTexture && (
          <Decal 
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            anisotropy={16}
            depthTest={false} // renders on top of any object
            depthWrite={true}
          />
        )}
      </mesh>
    </group>
  )
}

export default Shirt
