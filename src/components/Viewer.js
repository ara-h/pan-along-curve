import * as THREE from "three";
import { Component, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "react-three-fiber";
// import { Text } from "@react-three/drei";
import { curves } from "./Curves";

import "./Viewer.css";


function AudioAndAnimation(props) {
  const sound = useRef();
  const emitterMesh = useRef();
  const receiverMesh = useRef();

  const [listener] = useState(() => new THREE.AudioListener());

  const audioCtx = listener.context;
  const oscillator = audioCtx.createOscillator();
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(220, audioCtx.currentTime);


  useEffect(() => {
    const receiver = receiverMesh.current;
    receiver.add(listener);

    sound.current.setNodeSource(oscillator);
    oscillator.start();
    console.log("oscillator started");

    return () => {
      receiver.remove(listener);
      oscillator.stop();
     }
  }, [listener,oscillator])

  let p;
  let a = 0.0;

  useFrame((state, delta, xrFrame) => {
    if (props.animate.current) {
      a += delta;

      p = props.f(a);
      emitterMesh.current.position.x = p[0];
      emitterMesh.current.position.y = p[1];
      emitterMesh.current.position.z = p[2];
    }
  })

  return(
    <>
    <mesh ref={emitterMesh}>
      <sphereBufferGeometry args={[0.1,16,16]} />
      <meshStandardMaterial color="blue"  />
      <positionalAudio ref={sound} args={[listener]} />
    </mesh>
    <mesh
      ref={receiverMesh}
      position={[0, 0, 0]}
    />
    <mesh>
      <sphereBufferGeometry args={[0.995,16,16]} />
      <meshStandardMaterial transparent opacity={0.4} color="red" />
    </mesh>
    </>
  )
}



class Viewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animate: props.animate,
      whichCurve: props.whichCurve,
      curveFun: (curves.get(this.props.whichCurve)).fun
    }
  }

  componentDidUpdate(prevState) {
    if (this.props.whichCurve !== prevState.whichCurve) {
      this.setState({ whichCurve : (curves.get(this.props.whichCurve)).fun });
    }
  }


  render() {
    return (
      <div className="Viewer">
        <Canvas>
          <AudioAndAnimation
            f={this.state.curveFun}
            animate={this.state.animate}
          />
        </Canvas>
      </div>
    );
  }
}

export default Viewer;
