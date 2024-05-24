import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei";
import { Ref } from "react";

import * as THREE from "three";
import Lights from "./Lights";
import Loader from "./Loader";
import IPhone from "./IPhone";
import { Suspense } from "react";

import { MutableRefObject } from "react";

type ModelViewProps = {
  index: number;
  groupRef: Ref<THREE.Group<THREE.Object3DEventMap>> | undefined;
  gsapType: string;
  controlRef: MutableRefObject<any>;
  setRotationState: (value: number) => void;
  size: "small" | "large";
  item: { title: string; color: string[]; img: string };
};

const ModelView = ({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationState,
  size,
  item,
}: ModelViewProps) => {
  console.log("====================================");
  console.log(controlRef);
  console.log("====================================");
  return (
    <View
      index={index}
      id={gsapType}
      className={`w-full h-full absolute ${index === 2 ? "right-[-100%]" : ""}`}
    >
      {/* Ambient Light */}
      <ambientLight intensity={0.3} />

      <PerspectiveCamera makeDefault position={[0, 0, 4]} />

      <Lights />

      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() =>
          setRotationState(controlRef?.current?.getAzimuthalAngle() ?? 0)
        }
      />

      <group
        ref={groupRef}
        name={`${index === 1} ? 'small' : 'large`}
        position={[0, 0, 0]}
      >
        <Suspense fallback={<Loader />}>
          <IPhone
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
            item={item}
            size={size}
          />
        </Suspense>
      </group>
    </View>
  );
};

export default ModelView;
