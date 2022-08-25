import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { Cloud, OrbitControls, Sky, Environment, useGLTF } from '@react-three/drei'
import { Debug, Physics, RigidBody } from '@react-three/rapier'

import { Suspense } from 'react'

import { useControls } from 'leva'

const App = () => {

  const { debug } = useControls({ debug: false })

  return (
    <Canvas shadows camera={{ position: [-50, -25, 150], fov: 15 }} >
      <Suspense fallback={null}>

      <hemisphereLight intensity={.7} />
      <spotLight angle={0.45} penumbra={1}
        position={[20, 30, 2.5]} castShadow
        shadow-bias={-0.00001} />
      <Cloud scale={1.5} position={[20, 0, 0]} />
      <Cloud scale={1} position={[-20, 10, 0]} />
      <Environment preset='warehouse' />
      <Sky distance={450000} azimuth={0.025} sunPosition={[100, 5, 100]} />
      <Physics colliders={false}>
        {debug && <Debug />}
        <group position={[2, 3, 0]} >

          <Cylinder position={[-0.85, 4, 0]} rotation={[Math.PI / 2, 0, 0]} />
          <Cylinder position={[1.5, 1.75, 0]} rotation={[Math.PI / 2, 0, 0]} />

          <Cylinder position={[1.15, 1, 0]} rotation={[Math.PI / 2, 0, 0]} />

          <Cylinder position={[2, 3, 0]} rotation={[Math.PI / 2, 0, 0]} />

          <Cylinder position={[1.25, 5, 0]} rotation={[Math.PI / 2, 0, 0]} />

          <Cylinder position={[-1, 7, 0]} rotation={[Math.PI / 2, 0, 0]} />

          <Cylinder position={[-1.5, 5, 0]} rotation={[Math.PI / 2, 0, 0]} />

          <Cylinder position={[1.75, 8, 0]} rotation={[Math.PI / 2, 0, 0]} />

          <Tracks position={[-3, -.5, 10.5]} rotation={[0, -0.4, 0]} />
          <Box position={[-3, 11, 0]} rotation={[0, 0, -0.5]} />
          <Box position={[-8.7, 12.3, 0]} rotation={[0, 0, -0.09]} length={8} />
          <Sphere position={[-12, 15, 0]} />

          <Sphere position={[-9, 15, 0]} />

          <Sphere position={[-6, 13, 0]} />
        </group>
      </Physics>
      <OrbitControls />

      </Suspense>
    </Canvas>
  )
}


const Cylinder = (props: any) => (
  <RigidBody colliders='hull' type='fixed' >
    <mesh castShadow receiveShadow {...props}>
      <cylinderGeometry args={[0.25, 0.25, 4]} />
      <meshStandardMaterial />
    </mesh>
  </RigidBody>
)

const Tracks = (props: any) => {
  const { nodes } = useGLTF('/ball.glb') as any
  return (
    <RigidBody colliders='trimesh' type='fixed'>
      <mesh geometry={nodes.Cylinder.geometry}  {...props} dispose={null} >
        <meshPhysicalMaterial color='lightblue' transmission={1} thickness={.1} roughness={0.5} />
      </mesh>
    </RigidBody>
  )

}

const Sphere = (props: any) => (
  <RigidBody colliders='ball' restitution={.1}>
    <mesh castShadow receiveShadow {...props}>
      <sphereGeometry args={[0.5, 32, 32]} />
    </mesh>
  </RigidBody>)


const Box = ({ length = 4, ...props }) => (
  <RigidBody colliders='cuboid' type='fixed'>
    <mesh castShadow receiveShadow {...props}>
      <boxGeometry args={[length, 0.4, 4]} />
      <meshStandardMaterial color={'white'} />
    </mesh>

  </RigidBody>
)



export default App
