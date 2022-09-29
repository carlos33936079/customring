import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

const Ring = ({currentGem, currentRingColor, currentRingTexture}) => {
  const mountRef = useRef(null);
  const controls = useRef(null)

  useEffect(() => {
    //Data from the canvas
    const currentRef = mountRef.current;
    const { clientWidth: width, clientHeight: height } = currentRef;

    //Scene, camera, renderer
    const scene = new THREE.Scene();
    scene.background = null
    const camera = new THREE.PerspectiveCamera(25, width / height, 0.1, 1000);
    scene.add(camera);
    camera.position.set(100, 100, 100);
    camera.lookAt(new THREE.Vector3());

    const renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setSize(width, height);
    currentRef.appendChild(renderer.domElement);

    //OrbitControls
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = true;

    //Resize canvas
    const resize = () => {
      renderer.setSize(currentRef.clientWidth, currentRef.clientHeight);
      camera.aspect = currentRef.clientWidth / currentRef.clientHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", resize);

    //env map
    const cubeTextureloader = new THREE.CubeTextureLoader();
    const env = cubeTextureloader.load([
      "./envMap/px.png",
      "./envMap/nx.png",
      "./envMap/py.png",
      "./envMap/ny.png",
      "./envMap/pz.png",
      "./envMap/nz.png",
    ]);

    const gems = new THREE.Group()
    const ring = new THREE.Group()

    //loaders
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath("./draco/")
    const gltfLoader = new GLTFLoader()
    gltfLoader.setDRACOLoader(dracoLoader)
    gltfLoader.load("./model/RingDraco/ringDraco.gltf", (gltf)=>{
        while(gltf.scene.children.length){
              gltf.scene.children[0].material.envMap = env;

              if(gltf.scene.children[0].name.includes("gem")){
                gems.add(gltf.scene.children[0])
              }else{
                ring.add(gltf.scene.children[0])
              }
              scene.add(ring)
        }
        // scene.add(gltf.scene)
    })

    //controls
    //change gem
    let currentGemScene = null
    const changeGem =(gemName)=>{
        scene.remove(currentGemScene)
        currentGemScene=null

        for(let i=0; i< gems.children.length; i++ ){
            if (gems.children[i].name.includes(gemName.name)){
                currentGemScene = gems.children[i].clone()
            }
        }
        if(currentGemScene !== null){
            scene.add(currentGemScene)
        }
    }
    
    //change color
    const changeColor =(newColor)=>{
        if(ring.children[0]){
            ring.children[0].material.color.set(newColor.color)
        }
    }

    //change texture
    const changeRingTexture=(textures)=>{
        if(ring.children[0]){
            ring.children[0].material.map = textures.base
            ring.children[0].material.normalMap = textures.normal
            ring.children[0].material.roughnessMap = textures.roughness
        }
    }

    controls.current= {changeGem, changeColor}

    const ambientalLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientalLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(100, 100, 100);
    scene.add(pointLight);

    const pointLight1 = new THREE.PointLight(0xffffff, 1);
    pointLight1.position.set(-100, 100, 100);
    scene.add(pointLight1);

    //Animate the scene
    const clock = new THREE.Clock()
    const animate = () => {
      const elapsedtime = clock.getElapsedTime()
    //   ring.rotation.y = elapsedtime/6
      orbitControls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();


    return () => {
      window.removeEventListener("resize", resize);
      currentRef.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(()=>{
    controls.current.changeGem(currentGem)
  }, [currentGem])

  useEffect(()=>{
    controls.current.changeColor(currentRingColor)
  }, [ currentRingColor])

  return (
    <div
      className='Contenedor3D'
      ref={mountRef}
      style={{ width: "60%", height: "100%" }}
    ></div>
  );
};

export default Ring;