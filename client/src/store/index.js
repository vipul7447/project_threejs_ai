import { proxy } from 'valtio';

// initialising state
const state = proxy({
    intro: true, // acts like a flag that tells whether we are in Home page or not
    color: '#EFBD48',
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal: './threejs.png',
    fullDecal: './threejs.png',
});

export default state;