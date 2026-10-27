import { useEffect } from 'react';
import { ArcRotateCamera, Vector3, Tools } from '@babylonjs/core';
import { useBabylon } from './BabylonProvider';

export default function CameraControls() {
  const { scene, canvas } = useBabylon();

  useEffect(() => {
    if (!scene || !canvas) return;

    const camera = new ArcRotateCamera(
      'orbit',
      Tools.ToRadians(120),
      Tools.ToRadians(70),
      5,
      Vector3.Zero(),
      scene
    );
    camera.attachControl(canvas, true);
    camera.lowerRadiusLimit = 1.5;
    camera.upperRadiusLimit = 15;
    camera.wheelDeltaPercentage = 0.02;
    camera.panningSensibility = 0;

    const fitToModel = () => {
      const maxDim = window.__modelMaxDim || 2;
      camera.radius = maxDim * 2.2;
    };
    fitToModel();
    window.addEventListener('model-size', fitToModel);

    return () => {
      window.removeEventListener('model-size', fitToModel);
      camera.dispose();
    };
  }, [scene, canvas]);

  return null;
}