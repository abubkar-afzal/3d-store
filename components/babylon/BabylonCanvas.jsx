import { useRef, useEffect } from 'react';
import { Engine, Scene, Color4 } from '@babylonjs/core';
import { useBabylon } from './BabylonProvider';

export default function BabylonCanvas({ children }) {
  const canvasRef = useRef(null);
  const { onReady } = useBabylon();

  useEffect(() => {
    if (!canvasRef.current) return;

    const engine = new Engine(canvasRef.current, true, {
      preserveDrawingBuffer: true,
      stencil: true,
    }, true);
    
    const scene = new Scene(engine);
    scene.clearColor = new Color4(0.96, 0.97, 1, 1);

    // Notify parent that the scene is ready
    onReady({ scene, canvas: canvasRef.current, engine });

    // 👇 THE FIX: Wait for the camera to be attached before rendering
    engine.runRenderLoop(() => {
      if (scene.activeCamera) {
        scene.render();
      }
    });
    
    const onResize = () => engine.resize();
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      engine.dispose();
    };
  }, [onReady]);

  return (
    <div className="w-full h-full relative">
      <canvas ref={canvasRef} className="w-full h-full" />
      {children}
    </div>
  );
}