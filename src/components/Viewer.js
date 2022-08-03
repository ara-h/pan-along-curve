import React from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { curves } from "./Curves";

import "./Viewer.css";


function PointCurveAnimation(props) {
  const myMesh = React.useRef();

  let p;
  let a = 0.0;

  useFrame((state, delta, xrFrame) => {
    if(props.animate.current) {
      a += delta;

      p = props.f(a)
      myMesh.current.position.x = p[0];
      myMesh.current.position.y = p[1];
      myMesh.current.position.z = p[2];
    }
  })

  return (
    <mesh ref={myMesh}>
      <sphereBufferGeometry args={[0.1,16,16]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  )
}

class Viewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animate: props.animate
    }
  }


  render() {
    const curve = (curves.get(this.props.whichCurve)).fun;
    return (
      <div className="Viewer">
        <Canvas>
          <ambientLight args={[0xff0000]} intensity={0.1} />
          <directionalLight position={[0, 0, 5]} intensity={0.5} />
          <mesh>
            <sphereBufferGeometry args={[0.995,16,16]} />
            <meshStandardMaterial transparent opacity={0.4} color="red" />
          </mesh>
          <PointCurveAnimation
            f={curve}
            animate={this.state.animate} />
        </Canvas>
      </div>
    );
  }
}

export default Viewer;
