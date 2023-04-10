import {
  Grid,
  Html,
  OrbitControls,
  ScreenSpace,
  ScrollControls,
  ScrollControlsProps,
  ScrollControlsState,
  useScroll,
} from "@react-three/drei";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { getProject, val } from "@theatre/core";
import studio from "@theatre/studio";
import extension from "@theatre/r3f/dist/extension";
import { editable as e, SheetProvider, PerspectiveCamera } from "@theatre/r3f";
import demoProjectState from "../state/state.json";
import { useFrame } from "@react-three/fiber";

// studio.initialize();
// studio.extend(extension);

type Props = {};

// our Theatre.js project sheet, we'll use this later
const demoSheet = getProject("Demo Project", { state: demoProjectState }).sheet(
  "Demo Sheet"
);

const ScrollContent = () => {
  const scroll = useScroll();
  function play() {
    demoSheet.project.ready.then(() =>
      demoSheet.sequence.play({ range: [0, 3] })
    );
  }
  console.log(demoSheet.object.length);
  function seek() {
    demoSheet.project.ready.then(() => {
      //Hard coded 3 because I know sequence should be 3s long
      demoSheet.sequence.position = 3 * scroll.offset;

      // Ideally if sequence length was unknown and if it gave right length but for now returns emoSheet.sequence.pointer.length = 10?
      // demoSheet.sequence.position =
      //   val(demoSheet.sequence.pointer.length) * scroll.offset;
    });
  }

  useFrame(() => {
    seek();
  });
  return (
    <>
      <PerspectiveCamera
        theatreKey="Camera"
        makeDefault
        position={[5, 5, -5]}
        fov={75}
        attachArray={undefined}
        attachObject={undefined}
        attachFns={undefined}
      />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <e.mesh theatreKey="mesh">
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </e.mesh>
      {/* <ScreenSpace>
        <Html>
          <button onClick={play}>Start Animation</button>
        </Html>
      </ScreenSpace> */}
    </>
  );
};

const Experience = (props: Props) => {
  return (
    <SheetProvider sheet={demoSheet}>
      <ScrollControls pages={3} damping={0.2} maxSpeed={0.2}>
        <ScrollContent />
      </ScrollControls>
    </SheetProvider>
  );
};

export default Experience;
