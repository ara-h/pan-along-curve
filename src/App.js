import { useRef, useState } from "react";
//import { Canvas } from "react-three-fiber";
//import { Sphere } from "@react-three/drei";

import Viewer from "./components/Viewer"
import CurveSelector from "./components/curveSelector"
import PlaySine from "./components/playSine"

import "./App.css"

export default function App() {
  const animate = useRef(true);
  const [curveSelection, setCurveSelection] = useState('f1');

  return(
    <div className="App">
      <Viewer animate={animate} whichCurve={curveSelection} />
      <div className="control-panel">
        <CurveSelector onSelectionChange={(s) => { setCurveSelection(s); }}
          whichCurve={curveSelection} />
        <div className="button-panel">
          <button onClick={() => { animate.current = !animate.current; }}>
            Pause/Resume
          </button>
          <PlaySine />
        </div>
      </div>
    </div>
  );
}
