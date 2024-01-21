import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';

import state from '../store';

// children(react prop) -: in index.js <Center> containing <Shirt /> 
const CameraRig = ({ children }) => {
    const group = useRef(); // useRef to update the state
    const snap = useSnapshot(state);
     // delta -: differernce from the last frame that happened
     useFrame((state, delta) => {
        // for responsiveness
        const isBreakpoint = window.innerWidth <= 1260;
        const isMobile = window.innerWidth <= 600;

        // set the initial position of the model
        let targetPosition = [-0.4, 0, 2];
        if(snap.intro) {
            // if we are in the homepage then 
            if(isBreakpoint) targetPosition = [0, 0, 2];
            if(isMobile) targetPosition = [0, 0.2, 2.5];
        } else {
            // if we are in the customizer page
            if(isMobile) targetPosition = [0, 0, 2.5]
            else targetPosition = [0, 0, 2];
          }

        // set model camera position
        easing.damp3(state.camera.position, targetPosition, 0.25, delta)

        // set the model rotation smoothly by using the easing property
        easing.dampE(
            group.current.rotation,
            [state.pointer.y / 10, -state.pointer.x / 5, 0],
            0.25, // smooth time
            delta
        )
    })

    return <group ref={group}>{children}</group>
}

export default CameraRig
