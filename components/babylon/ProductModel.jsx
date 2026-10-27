import { useEffect, useRef } from 'react';
import { Color3, StandardMaterial, Vector3 } from '@babylonjs/core';
import { loadModel } from './SceneLoader';
import { useBabylon } from './BabylonProvider';

export default function ProductModel({ modelFile, selections }) {
  const { scene } = useBabylon();
  const rootRef = useRef(null);
  const loadedMeshes = useRef([]);

  // Load model
  useEffect(() => {
    if (!scene || !modelFile) return;
    let alive = true;

    loadModel(scene, modelFile).then((result) => {
      if (!alive || !result) return;
      // Dispose previous
      loadedMeshes.current.forEach((m) => m.dispose());
      loadedMeshes.current = result.meshes;

      // Auto-frame
      const root = result.meshes[0];
      rootRef.current = root;

      const bounds = root.getHierarchyBoundingVectors(true);
      const size = bounds.max.subtract(bounds.min);
      const maxDim = Math.max(size.x, size.y, size.z) || 2;

      // Reposition so base sits at y=0
      const center = bounds.max.add(bounds.min).scale(0.5);
      root.position = new Vector3(
        -center.x,
        -bounds.min.y,
        -center.z
      );

      // Expose size on window so camera can adjust
      window.__modelMaxDim = maxDim;
      window.dispatchEvent(new Event('model-size'));

      // Initial material application
      applySelections(selections);
    });

    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene, modelFile]);

  // React to selection changes
  useEffect(() => {
    if (!scene) return;
    applySelections(selections);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selections, scene]);

  function applySelections(sel) {
    if (!sel || !loadedMeshes.current.length) return;
    for (const [partName, conf] of Object.entries(sel)) {
      const mesh = loadedMeshes.current.find((m) => m.name === partName);
      if (!mesh) continue;
      const mat = new StandardMaterial(`${partName}_mat_${conf.color}`, scene);
      mat.diffuseColor = Color3.FromHexString(conf.color);
      mat.specularColor = new Color3(0.1, 0.1, 0.1);
      mesh.material = mat;
    }
  }

  return null;
}