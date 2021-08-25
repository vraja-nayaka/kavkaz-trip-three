import * as THREE from "three";
import React, { Suspense, useState, useEffect } from "react";
import { Canvas, useThree, useLoader } from "@react-three/fiber";
import { Html, OrbitControls, Loader } from "@react-three/drei";
import { Popconfirm } from "antd";

type Position = [number, number, number];

type TripStore = {
  name: string;
  color: string;
  position: Position;
  url: string;
  link: number;
};

const store: TripStore[] = [
  {
    name: "спуститься",
    color: "lightblue",
    position: [10, -15, 10],
    url: "/k1.jpg",
    link: 1,
  },
  {
    name: "в город",
    color: "lightblue",
    position: [13, -5, 5],
    url: "/k2.jpg",
    link: 2,
  },
  {
    name: "домой",
    color: "lightblue",
    position: [20, 5, -20],
    url: "/g1.jpg",
    link: 3,
  },
  {
    name: "внутрь",
    color: "lightblue",
    position: [15, 0, 0],
    url: "/k3.jpg",
    link: 4,
  },
  {
    name: "заново",
    color: "lightpink",
    position: [10, 0, -15],
    url: "/k4.jpg",
    link: 0,
  },
];

type DomeProps = {
  name: string;
  position: [number, number, number];
  texture: THREE.Texture;
  onClick: () => void;
};

const Dome = ({ name, position, texture, onClick }: DomeProps) => {
  return (
    <group>
      <mesh>
        <sphereBufferGeometry args={[500, 60, 40]} />
        <meshBasicMaterial map={texture} side={THREE.BackSide} />
      </mesh>
      <mesh position={position}>
        <sphereGeometry args={[1.25, 32, 32]} />
        <meshBasicMaterial color="white" />
        <Html center>
          <Popconfirm
            title="Идем дальше?"
            onConfirm={onClick}
            okText="Да"
            cancelText="Нет"
          >
            <button type='button'>{name}</button>
          </Popconfirm>
        </Html>
      </mesh>
    </group>
  );
};

function Portals() {
  const [which, set] = useState(0);
  const { link, ...props } = store[which];
  const maps = useLoader(
    THREE.TextureLoader,
    store.map((entry) => entry.url)
  );
  return <Dome onClick={() => set(link)} {...props} texture={maps[which]} />;
}

function Preload() {
  // This component pre-loads textures in order to lessen loading impact when clicking portals
  const { gl } = useThree();
  const maps = useLoader(
    THREE.TextureLoader,
    store.map((entry) => entry.url)
  );

  // TODO: set up eslint
  useEffect(() => maps.forEach(gl.initTexture), [maps]);
  return null;
}

export const TripPage: React.FC = () => (
  <Canvas
    frameloop="demand"
    camera={{ position: [0, 0, 0.1] }}
    style={{ height: "100vh" }}
  >
    <OrbitControls
      enableZoom={false}
      enablePan={false}
      enableDamping
      dampingFactor={0.2}
      autoRotate={false}
      rotateSpeed={-0.5}
    />
    <Suspense
      fallback={
        <Html>
          <Loader />
        </Html>
      }
    >
      <Preload />
      <Portals />
    </Suspense>
  </Canvas>
);
