"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useAnimations, useGLTF } from "@react-three/drei";
import { clone as cloneSkeleton } from "three/examples/jsm/utils/SkeletonUtils.js";
import { LoopRepeat } from "three";
import type { Group, Mesh, MeshStandardMaterial } from "three";

function ParrotModel({ flying, direction }: { flying: boolean; direction: 1 | -1 }) {
  const group = useRef<Group>(null);
  const gltf = useGLTF("/models/parrot.glb");
  const cloned = useMemo(() => cloneSkeleton(gltf.scene), [gltf.scene]);
  const { actions } = useAnimations(gltf.animations, cloned);

  useEffect(() => {
    cloned.traverse((object) => {
      const mesh = object as Mesh;
      if (!mesh.isMesh) return;
      mesh.castShadow = true;
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      materials.forEach((material) => {
        const mat = material as MeshStandardMaterial;
        if (!("roughness" in mat)) return;
        mat.roughness = 0.5;
        mat.metalness = 0.03;
        mat.flatShading = true;
        mat.needsUpdate = true;
      });
    });
  }, [cloned]);

  useEffect(() => {
    const clipName = flying ? "ParrotALL_Fly" : "ParrotALL_Hover";
    const selected = actions[clipName];
    if (!selected) return;

    Object.values(actions).forEach((action) => {
      if (action && action !== selected) action.fadeOut(0.18);
    });
    selected.reset().setLoop(LoopRepeat, Number.POSITIVE_INFINITY).fadeIn(0.18).play();
  }, [actions, flying]);

  useFrame((state, delta) => {
    if (!group.current) return;
    const damp = 1 - Math.pow(0.0015, delta);
    const hover = flying ? 0 : Math.sin(state.clock.elapsedTime * 1.25) * 0.035;
    const targetYaw = direction > 0 ? -0.58 : 0.58;
    const targetBank = flying ? direction * -0.075 : direction * -0.02;

    group.current.position.y += (-1 + hover - group.current.position.y) * damp;
    group.current.rotation.x += ((flying ? -0.035 : 0.015) - group.current.rotation.x) * damp;
    group.current.rotation.y += (targetYaw - group.current.rotation.y) * damp;
    group.current.rotation.z += (targetBank - group.current.rotation.z) * damp;
  });

  return (
    <group ref={group} position={[0, -1, 0]} rotation={[0, 0.58, 0]} scale={2.05}>
      <primitive object={cloned} />
    </group>
  );
}

useGLTF.preload("/models/parrot.glb");

export function Parrot3D({ flying, direction }: { flying: boolean; direction: 1 | -1 }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) return null;

  return (
    <Canvas camera={{ position: [0, 0.15, 5], fov: 34 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.88} />
      <directionalLight position={[4, 6, 5]} intensity={1.55} color="#ffffff" />
      <directionalLight position={[-3, 2, -4]} intensity={0.58} color="#f2cfc1" />
      <Suspense fallback={null}>
        <ParrotModel flying={flying} direction={direction} />
        <Environment preset="studio" />
      </Suspense>
    </Canvas>
  );
}
