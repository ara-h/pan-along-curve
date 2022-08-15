//import * as THREE from "three";
import { Component, useRef } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { OrbitControls } from "@react-three/drei";
import { curves } from "./Curves";

import "./Viewer.css";


function Animation({ animate, f, sound }) {
  const emitterMesh = useRef();
  const receiverMesh = useRef();

  let px, py, pz;
  let a = 0.0;

  useFrame((state, delta, xrFrame) => {
    if (animate.current) {
      a += delta;

      [px, py, pz] = f(a);
      emitterMesh.current.position.x = px;
      emitterMesh.current.position.y = py;
      emitterMesh.current.position.z = pz;

      sound.setPanPosition(px, py, pz);
    }
  })

  return(
    <>
    <mesh
      ref={receiverMesh}
      position={[0, 0, 0]}
    />
    <mesh ref={emitterMesh}>
      <sphereBufferGeometry args={[0.1,16,16]} />
      <meshStandardMaterial color="blue"  />
    </mesh>
    <mesh>
      <sphereBufferGeometry args={[0.85,16,16]} />
      <meshStandardMaterial color="red" />
    </mesh>
    </>
  )
}


class Viewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      whichCurve: props.whichCurve,
      curveFun: (curves.get(this.props.whichCurve)).fun
    }
  }

  componentDidUpdate(prevState) {
    if (this.props.whichCurve !== prevState.whichCurve) {
      this.setState({ curveFun : (curves.get(this.props.whichCurve)).fun });
    }
  }


  render() {
    return (
      <div className="Viewer">
        <Canvas>
          <ambientLight />
          <pointLight position={[0,2,0]} />
            <Animation
              f={this.state.curveFun}
              animate={this.props.animate}
              curveName={this.state.whichCurve}
              sound={this.props.sound}
            />
            <OrbitControls />
        </Canvas>
      </div>
    );
  }
}

export default Viewer;
