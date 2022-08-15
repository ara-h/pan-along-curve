import { useRef, useState } from "react";

import Viewer from "./components/Viewer";
import CurveSelector from "./components/curveSelector";
import SoundControl from "./components/soundControl";
import Sound from "./components/Sound";

import "./App.css"

const sound = new Sound();

export default function App() {
  const animate = useRef(true);
  const [curveSelection, setCurveSelection] = useState('f1');

  return(
    <div className="App">
      <Viewer
        animate={animate}
        whichCurve={curveSelection}
        sound={sound}
      />
      <div className="control-panel">
        <CurveSelector onSelectionChange={(s) => { setCurveSelection(s); }}
          whichCurve={curveSelection} />
        <div className="button-panel">
          <button onClick={() => { animate.current = !animate.current; }}>
            Toggle Animation
          </button>
          <SoundControl sound={sound}/>
        </div>
      </div>
    </div>
  );
}
