import { SceneLoader as BSceneLoader, Vector3 } from '@babylonjs/core';
import '@babylonjs/loaders/glTF';

export async function loadModel(scene, fileName) {
  if (!scene) return null;
  const result = await BSceneLoader.ImportMeshAsync(
    '',
    '/models/',
    fileName,
    scene,
    undefined,
    '.glb'
  );

  const root = result.meshes[0];
  if (root) {
    root.position = Vector3.Zero();
    root.scaling = new Vector3(1, 1, 1);
  }
  return result;
}