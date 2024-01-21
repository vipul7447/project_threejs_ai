import React, { useRef } from 'react'
import { easing } from 'maath'
import { useFrame } from '@react-three/fiber'
import { AccumulativeShadows, RandomizedLight } from '@react-three/drei';

const Backdrop = () => {
  const shadows = useRef(); // we need to refernce the shadows

  return (
    <AccumulativeShadows
      ref={shadows}
      temporal // temporal smooths out the shadows overtime
      frames={60} // frames are going to render in 60 frames
      alphaTest={0.85} // set the transparency of shadows
      scale={10}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.14]}  
    >
        <RandomizedLight 
        amount={4}
        radius={9}
        intensity={2.75}
        ambient={0.25}
        position={[5, 5, -10]}
      />
      <RandomizedLight 
        amount={4}
        radius={5}
        intensity={0.35}
        ambient={0.55}
        position={[-5, 5, -9]}
      />
    </AccumulativeShadows>
  )
}

export default Backdrop
