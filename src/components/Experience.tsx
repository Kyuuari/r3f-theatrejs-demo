import { Grid, OrbitControls } from "@react-three/drei";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import React, { useEffect } from "react";
import { getProject } from "@theatre/core";
import studio from "@theatre/studio";
import extension from "@theatre/r3f/dist/extension";
import { editable as e, SheetProvider, PerspectiveCamera } from "@theatre/r3f";
import demoProjectState from "../state/state.json";

// studio.initialize();
// studio.extend(extension);

type Props = {};

// our Theatre.js project sheet, we'll use this later
const demoSheet = getProject("Demo Project", { state: demoProjectState }).sheet(
  "Demo Sheet"
);

const Experience = (props: Props) => {
  // const { scale } = useControls({ scale: -2 });
  useEffect(() => {
    demoSheet.project.ready.then(() =>
      demoSheet.sequence.play({ iterationCount: Infinity, range: [0, 3] })
    );
  }, []);
  return (
    <SheetProvider sheet={demoSheet}>
      {/* <Perf position={"top-left"} /> */}
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
    </SheetProvider>
  );
};

export default Experience;
