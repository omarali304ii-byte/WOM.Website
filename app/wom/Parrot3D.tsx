"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, useAnimations, useGLTF } from "@react-three/drei";
import { clone as cloneSkeleton } from "three/examples/jsm/utils/SkeletonUtils.js";
import { LoopOnce, LoopRepeat } from "three";
import type { Group, Mesh, MeshStandardMaterial } from "three";

type Pose = {
  pos: [number, number, number];
  rot: [number, number, number];
  scale: number;
  clip: string;
};

const POSES: Pose[] = [
  { pos: [0, -0.08, 0], rot: [0.02, -0.72, -0.03], scale: 0.9, clip: "ParrotALL_Hover" },
  { pos: [0, -0.1, 0], rot: [0, -0.62, 0.02], scale: 0.94, clip: "ParrotALL_Hover" },
  { pos: [0, -0.05, 0], rot: [0.06, 0.42, -0.08], scale: 0.95, clip: "ParrotALL_Fly" },
  { pos: [0, -0.05, 0], rot: [0, -0.48, 0.03], scale: 0.93, clip: "ParrotALL_Fly" },
  { pos: [0, -0.08, 0], rot: [-0.03, -0.55, 0.02], scale: 0.92, clip: "ParrotALL_Hover" },
  { pos: [0, -0.04, 0], rot: [0, 0.58, -0.04], scale: 0.93, clip: "ParrotALL_Fly" },
  { pos: [0, -0.12, 0], rot: [0, -0.5, 0], scale: 0.88, clip: "ParrotALL_Idle2" },
  { pos: [0, -0.12, 0], rot: [0, -0.48, 0.02], scale: 0.9, clip: "ParrotALL_Idle" },
  { pos: [0, -0.12, 0], rot: [0, -0.7, 0.01], scale: 0.91, clip: "ParrotALL_Idle2" },
];

function ParrotModel({ sceneIndex, sceneProgress, reacting }: { sceneIndex: number; sceneProgress: number; reacting: boolean }) {
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
    const play = (name: string, loop: boolean) => {
      const selected = actions[name];
      Object.values(actions).forEach((action) => {
        if (action && action !== selected) action.fadeOut(0.22);
      });
      if (!selected) return;
      selected.reset();
      selected.clampWhenFinished = !loop;
      selected.setLoop(loop ? LoopRepeat : LoopOnce, loop ? Number.POSITIVE_INFINITY : 1);
      selected.fadeIn(0.26).play();
    };

    if (reacting) {
      play("ParrotALL_Preen", false);
      return;
    }

    const landsHere = sceneIndex === 4 || sceneIndex === 6 || sceneIndex === 7 || sceneIndex === 8;
    const arrival = landsHere ? "ParrotALL_Land" : sceneIndex > 1 ? "ParrotALL_Fly" : pose.clip;
    play(arrival, arrival === pose.clip);
    if (arrival === pose.clip) return;
    const timer = window.setTimeout(() => play(pose.clip, true), landsHere ? 720 : 480);
    return () => window.clearTimeout(timer);
  }, [actions, reacting, sceneIndex]);

  useFrame((state, delta) => {
    if (!group.current) return;
    const pose = POSES[Math.max(0, Math.min(POSES.length - 1, sceneIndex))];
    const damp = 1 - Math.pow(0.002, delta);
    const targetX = pose.pos[0];
    const targetY = pose.pos[1] + Math.sin(state.clock.elapsedTime * 1.05) * 0.012;
    const pathTilt = sceneIndex === 2 || sceneIndex === 3 || sceneIndex === 5 ? (sceneProgress - 0.5) * 0.08 : 0;

    group.current.position.x += (targetX - group.current.position.x) * damp;
    group.current.position.y += (targetY - group.current.position.y) * damp;
    group.current.position.z += (pose.pos[2] - group.current.position.z) * damp;
    group.current.rotation.x += (pose.rot[0] - group.current.rotation.x) * damp;
    group.current.rotation.y += (pose.rot[1] - group.current.rotation.y) * damp;
    group.current.rotation.z += (pose.rot[2] + pathTilt - group.current.rotation.z) * damp;
    group.current.scale.setScalar(group.current.scale.x + (pose.scale - group.current.scale.x) * damp);
  });

  return <group ref={group} position={POSES[0].pos} rotation={POSES[0].rot} scale={POSES[0].scale}><primitive object={cloned} /></group>;
}

useGLTF.preload("/models/parrot.glb");

export function Parrot3D({ sceneIndex, sceneProgress, reacting }: { sceneIndex: number; sceneProgress: number; reacting: boolean }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) return null;

  return (
    <Canvas camera={{ position: [0, 0.2, 5], fov: 35 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true }} shadows>
      <ambientLight intensity={0.82} />
      <directionalLight castShadow position={[4, 6, 5]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-3, 2, -4]} intensity={0.55} color="#f2cfc1" />
      <Suspense fallback={null}>
        <ParrotModel sceneIndex={sceneIndex} sceneProgress={sceneProgress} reacting={reacting} />
        <Environment preset="studio" />
        <ContactShadows position={[0, -1.4, 0]} opacity={0.18} scale={8} blur={2.8} far={3} color="#050505" />
      </Suspense>
    </Canvas>
  );
}
