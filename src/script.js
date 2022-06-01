import "./scss/main.css";
import * as THREE from "three";
import gsap from "gsap";

import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// scroll trigger
import ScrollTrigger from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// gsap animation
const tl = gsap.timeline();

/**
 * Debug
 */

const gui = new dat.GUI({

});


const canvas = document.querySelector(".webgl");

////////////////////////////////////////////////////////////////////////////
// END OF DEBUG
////////////////////////////////////////////////////////////////////////////

/**
 * creating scene
 */
const scene = new THREE.Scene();

////////////////////////////////////////////////////////////////////////////
// END OF SCENE
////////////////////////////////////////////////////////////////////////////

/**
 * Geometry
 */
const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: "red",
});

////////////////////////////////////////////////////////////////////////////
// END OF GEOMETRY
////////////////////////////////////////////////////////////////////////////

/**
 * Adding Light
 */
const directionalLight = new THREE.DirectionalLight("#ffffff");

scene.add(directionalLight);

/**
 * Lading plane Mesh
 */

let scrollY = window.scrollY;
window.addEventListener("scroll", () => {
  scrollY = window.scrollY;
  console.log(scrollY / window.innerHeight);
});

const loader = new GLTFLoader();
const texture = new THREE.TextureLoader();
texture.load("./plane/textures/Material_baseColor.jpeg", (texture) => {
  //loading model through gltf loader
  loader.load(
    // there are two arguments url to load and callback function
    "./plane/scene.gltf",
    (model) => {
      let plane = model.scene;

      // adding Material
      plane.traverse((data) => {
        data.material = new THREE.MeshLambertMaterial({
          color: "#595365",
          // map: texture,
        });
      });
      plane.position.y = -113;

      // using scroll trigger in plane

      tl.to(plane.rotation, {
        scrollTrigger: {
          trigger: ".chapter__one",
          start: "0",
          end: "bottom",
          scrub: 3,
          markers: true,
        },
        x: -2,
      })
      tl.to(plane.rotation, {
        scrollTrigger: {
          trigger: ".chapter__one",
          start: "0",
          end: "bottom",
          scrub: 3,
          markers: true,
        },
        z: -2,
      })      
      .to(
        plane.position,
        {
          scrollTrigger: {
            trigger: ".chapter__one",
            start: "0",
            end: "bottom",
            scrub: 3,
            markers: true,
          },
          y: 4000,
        },
     
      );
      // debug
      gui.add(plane.position, "x", -1200, 1200, 1).name("plane position x");
      gui.add(plane.position, "y", -1200, 1200, 1).name("plane position y");

      gui.add(plane.rotation, "x", -360, 360, 3).name("plane rotation x");
      gui.add(plane.rotation, "y", -360, 360, 3).name("plane rotation y");
      gui.add(plane.rotation, "z", -360, 360, 3).name("plane rotation z");
      // debug

      // animating position

      const clockPlane = new THREE.Clock();
      const planeOneAnimation = () => {
        const elapsedTime = clockPlane.getElapsedTime();

        // plane.rotation.y = elapsedTime / Math.PI;

        window.requestAnimationFrame(planeOneAnimation);
      };
      planeOneAnimation();

      //  adding to scene

      scene.add(plane);
    }
  );
});

// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

////////////////////////////////////////////////////////////////////////////
// END OF MESH
////////////////////////////////////////////////////////////////////////////

// todo size
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

////////////////////////////////////////////////////////////////////////////
// END OF SIZE
////////////////////////////////////////////////////////////////////////////

/**
 * camera
 */

const camera = new THREE.PerspectiveCamera(2, size.width / size.height, 10, 0);
camera.position.z = 35000;
camera.position.y = -255;

tl.to(
  camera.position,
  {
    scrollTrigger: {
      trigger: ".chapter__one",
      start: "0",
      end: "bottom",
      scrub: 3,
      markers: true,
    },
    z: 4000,
  },
  "0"
)

gui.add(camera.position, "y", -360, 360, 3).name("Camera postion y");
gui.add(camera.position, "x", -360, 360, 3).name("Camera postion y");
gui.add(camera.position, "z", -2000, 2000, 3).name("Camera postion z");

window.addEventListener("resize", () => {
  // resize canvas

  size.width = window.innerWidth;
  size.height = window.innerHeight;
  //   update camera
  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();
  renderer.setSize(size.width, size.height);
});

////////////////////////////////////////////////////////////////////////////
// END OF CAMERA
////////////////////////////////////////////////////////////////////////////

/**
 * Renderer
 */

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
scene.add(camera);

////////////////////////////////////////////////////////////////////////////
// END OF RENDERER
////////////////////////////////////////////////////////////////////////////

// controlss
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;
renderer.setSize(size.width, size.height);

renderer.render(scene, camera);

////////////////////////////////////////////////////////////////////////////
// END OF CONTROLS
////////////////////////////////////////////////////////////////////////////

/**
 * Animation
 */

const clock = new THREE.Clock();

const animate = () => {
  const elapsedTime = clock.getElapsedTime();

  // controls.update();
  // mesh.rotation.x= elapsedTime;
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
};

animate();

////////////////////////////////////////////////////////////////////////////
// END OF ANIMATION
////////////////////////////////////////////////////////////////////////////

tl.to(".chapter__two", {
  scrollTrigger: {
    trigger: ".chapter__one",
    start: "100",
    end: "bottom",
    scrub: 3,
    markers: true,
  },
  scale: 100,
  ease: "linear",
  // zIndex: -100,
});
tl.to(".chaptermid__title", {
  scrollTrigger: {
    trigger: ".chapter__one",
    start: "0",
    end: "10",
    scrub: 3,
    markers: true,
  },
  opacity: 0,
  ease: "linear",
  // zIndex: -100,
});
