"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, useAnimations, useGLTF } from "@react-three/drei";
import { clone as cloneSkeleton } from "three/examples/jsm/utils/SkeletonUtils.js";
import type { Group, Mesh, MeshStandardMaterial } from "three";

type Pose = {
  pos: [number, number, number];
  rot: [number, number, number];
  scale: number;
  clip: string;
};

const POSES: Pose[] = [
  { pos: [2.05, -0.05, -0.25], rot: [0.03, -0.72, -0.04], scale: 0.9, clip: "ParrotALL_Hover" },
  { pos: [1.5, -0.18, 0], rot: [0, -0.62, 0.02], scale: 1.03, clip: "ParrotALL_Hover" },
  { pos: [-0.2, 0.35, 0.35], rot: [0.08, 0.42, -0.08], scale: 1.08, clip: "ParrotALL_Fly" },
  { pos: [1.1, -0.08, 0.1], rot: [0, -0.48, 0.03], scale: 0.98, clip: "ParrotALL_Fly" },
  { pos: [1.78, 0.48, -0.08], rot: [-0.04, -0.55, 0.03], scale: 1.04, clip: "ParrotALL_Hover" },
  { pos: [-1.55, 0.16, 0.08], rot: [0, 0.58, -0.04], scale: 0.98, clip: "ParrotALL_Fly" },
  { pos: [2.15, -0.58, -0.55], rot: [0, -0.5, 0], scale: 0.76, clip: "ParrotALL_Hover" },
  { pos: [1.28, -0.04, 0], rot: [0, -0.48, 0.02], scale: 1.01, clip: "ParrotALL_Idle" },
  { pos: [1.38, -0.42, 0.18], rot: [0, -0.7, 0.02], scale: 0.96, clip: "ParrotALL_Hover" },
];

function ParrotModel({ sceneIndex, sceneProgress }: { sceneIndex: number; sceneProgress: number }) {
  const group = useRef<Group>(null);
  const gltf = useGLTF("/models/parrot.glb");
  const cloned = useMemo(() => cloneSkeleton(gltf.scene), [gltf.scene]);
  const { actions } = useAnimations(gltf.animations, cloned);

  useEffect(() => {
    cloned.traverse((object) => {
      const mesh = object as Mesh;
      if (!mesh.isMesh) return;
      mesh.castShadow = true;
      mesh.receiveShadow = false;
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      materials.forEach((material) => {
        const mat = material as MeshStandardMaterial;
        if (!("roughness" in mat)) return;
        mat.roughness = 0.52;
        mat.metalness = 0.04;
        mat.flatShading = true;
        mat.needsUpdate = true;
      });
    });
  }, [cloned]);

  useEffect(() => {
    const pose = POSES[Math.max(0, Math.min(POSES.length - 1, sceneIndex))];
    const selected = actions[pose.clip];
    Object.values(actions).forEach((action) => {
      if (action && action !== selected) action.fadeOut(0.28);
    });
    selected?.reset().fadeIn(0.32).play();
  }, [actions, sceneIndex]);

  useFrame((state, delta) => {
    if (!group.current) return;
    const pose = POSES[Math.max(0, Math.min(POSES.length - 1, sceneIndex))];
    const damp = 1 - Math.pow(0.002, delta);
    const travel = sceneIndex === 3 || sceneIndex === 5 ? (sceneProgress - 0.5) * 0.7 : 0;
    const targetX = pose.pos[0] + travel;
    const targetY = pose.pos[1] + Math.sin(state.clock.elapsedTime * 1.05) * 0.025;

    group.current.position.x += (targetX - group.current.position.x) * damp;
    group.current.position.y += (targetY - group.current.position.y) * damp;
    group.current.position.z += (pose.pos[2] - group.current.position.z) * damp;
    group.current.rotation.x += (pose.rot[0] - group.current.rotation.x) * damp;
    group.current.rotation.y += (pose.rot[1] - group.current.rotation.y) * damp;
    group.current.rotation.z += (pose.rot[2] - group.current.rotation.z) * damp;
    group.current.scale.setScalar(group.current.scale.x + (pose.scale - group.current.scale.x) * damp);
  });

  return <group ref={group} position={POSES[0].pos} rotation={POSES[0].rot} scale={POSES[0].scale}><primitive object={cloned} /></group>;
}

useGLTF.preload("/models/parrot.glb");

export function Parrot3D({ sceneIndex, sceneProgress }: { sceneIndex: number; sceneProgress: number }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) return null;

  return (
    <Canvas camera={{ position: [0, 0.2, 5], fov: 35 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true }} shadows>
      <ambientLight intensity={0.82} />
      <directionalLight castShadow position={[4, 6, 5]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-3, 2, -4]} intensity={0.55} color="#f2cfc1" />
      <Suspense fallback={null}>
        <ParrotModel sceneIndex={sceneIndex} sceneProgress={sceneProgress} />
        <Environment preset="studio" />
        <ContactShadows position={[0, -1.4, 0]} opacity={0.18} scale={8} blur={2.8} far={3} color="#050505" />
      </Suspense>
    </Canvas>
  );
}
