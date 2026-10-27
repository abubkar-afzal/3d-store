import { useEffect } from 'react';
import {
  HemisphericLight,
  DirectionalLight,
  Vector3,
  ShadowGenerator,
} from '@babylonjs/core';
import { useBabylon } from './BabylonProvider';

export default function Lighting() {
  const { scene } = useBabylon();

  useEffect(() => {
    if (!scene) return;

    const hemi = new HemisphericLight('hemi', new Vector3(0, 1, 0), scene);
    hemi.intensity = 0.85;

    const dir = new DirectionalLight('dir', new Vector3(-0.5, -1, -0.3), scene);
    dir.position = new Vector3(5, 10, 5);
    dir.intensity = 0.7;

    const shadows = new ShadowGenerator(1024, dir);
    // Apply to meshes when they arrive
    const attach = () => {
      const meshes = scene.meshes.filter((m) => m.name !== '__root__');
      meshes.forEach((m) => shadows.addShadowCaster(m));
    };
    window.addEventListener('model-size', attach);
    attach();

    return () => {
      window.removeEventListener('model-size', attach);
      hemi.dispose();
      dir.dispose();
    };
  }, [scene]);

  return null;
}