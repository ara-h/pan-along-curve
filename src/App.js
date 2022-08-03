import { useRef, useState } from "react";
//import { Canvas } from "react-three-fiber";
//import { Sphere } from "@react-three/drei";

import Viewer from "./components/Viewer"
import CurveSelector from "./components/curveSelector"

import "./App.css"

export default function App() {
  const animate = useRef(true);
  const curveSelection = 'f1';

  return(
    <div className="App">
      <div className="curve-viewer">
        <Viewer animate={animate} whichCurve={curveSelection} />
        <div className="curve-selection">
          <CurveSelector onSelectionChange={(s) => { curveSelection = s; }}
            whichCurve={curveSelection} />
        </div>
      </div>
      <div className="controls">
        <button onClick={() => { animate.current = !animate.current; }}>
          Pause/Resume
        </button>
      </div>
      <div className="patch-selection">
        <p>Patch selector</p>
      </div>
    </div>
  );
}
