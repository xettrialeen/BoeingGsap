import "../scss/main.css";
import * as THREE from "three";
import gsap from "gsap";

import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// on menu clicked

let menuBtn = document.getElementsByClassName("menuBtn");
let menustate = true;
let planeState = false;

// scroll trigger
import ScrollTrigger from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// gsap animation
const tl = gsap.timeline();

/**
 * Debug
 */

const gui = new dat.GUI({});
gui.destroy();
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
gui
  .add(directionalLight.position, "x", -200, 200, 0.1)
  .name("DirectionalLight X");
gui
  .add(directionalLight.position, "y", -200, 200, 0.1)
  .name("DirectionalLight X");
gui
  .add(directionalLight.position, "z", -200, 200, 0.1)
  .name("DirectionalLight X");
scene.add(directionalLight);

////////////////////////////////////////////////////////////////////////////
// END OF LIGHT
////////////////////////////////////////////////////////////////////////////

/**
 * Raycaster
 */

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onPointerMove(event) {
  // calculate pointer position in normalized device coordinates
  // (-1 to +1) for both components

  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

  console.log(pointer.x, pointer.y);
}

////////////////////////////////////////////////////////////////////////////
// END OF RAYCASTER
////////////////////////////////////////////////////////////////////////////

/**
 * Lading plane Mesh
 */

// let scrollY = window.scrollY;
// window.addEventListener("scroll", () => {
//   scrollY = window.scrollY;
//   console.log(scrollY / window.innerHeight);
// });

const loader = new GLTFLoader();
const texture = new THREE.TextureLoader();
texture.load("./plane/textures/Material_baseColor.jpeg", (texture) => {
  //loading model through gltf loader
  loader.load(
    // there are two arguments url to load and callback function
    "./plane/scene.gltf",
    (model) => {
      let plane = model.scene;
      let plane2 = model.scene.clone();
      // console.log(plane2);
      // adding Material
      console.log(plane);

      plane.traverse((data) => {
        if (data.isMesh) {
          console.log();
          data.material = new THREE.MeshLambertMaterial({
            color: "#3d404d",
            transparent: false,
          });
        }
        // data.material = new THREE.MeshLambertMaterial({
        //   color: "#333547",
        //   // map: texture,
        // });
        // data.material.color = "green";
      });

      // setting positions on clicked

      menuBtn[0].addEventListener("click", (e) => {
        menustate = !menustate;
        planeState = !planeState;
        console.log(menustate);
        if (menustate === true) {
          gsap.to(".menu", {
            x: "100%",
            ease: "easeInOut",
          });
          gsap.to(plane.rotation, {
            z: 0,
            y: 0,
            x: 0,
            ease: "Power4.easeInOut",
            duration: 0.8,
          });
          gsap.to(plane.position, {
            z: -1,

            ease: "Power4.easeInOut",
            duration: 0.8,
          });
        } else {
          gsap.to(".menu", {
            x: "0%",
            ease: "Power4.easeInOut",
          });

          gsap.to(plane.rotation, {
            z: -1,
            y: 0.6,
            x: 0,

            ease: "Power4.easeInOut",
            duration: 0.8,
          });
          gsap.to(plane.position, {
            z: 10000,

            ease: "Power4.easeInOut",
            duration: 0.8,
          });
        }

        // lets create a music when toggled
        let menuSound = document.getElementsByClassName("MenuClickedAudio");

        menuSound.loop = true;

        if (menustate === false) {
          menuSound[0].play();
        } else {


          for (let i = 0; i < 1; i--) {
            menuSound[0].volume= i;
            
          }
          // making sound level low
          setTimeout(function () {
            menuSound[0].pause();
          }, 5000);
        }
      });

      plane2.traverse((data) => {
        data.material = new THREE.MeshBasicMaterial({
          // color: "#fefefe",
          wireframe: true,
        });
      });
      plane.position.y = -113;
      plane2.position.y = -113;

      // adding raycaster on plane1

      // calculate objects intersecting the picking ray

      // using scroll trigger in plane

      tl.to(plane.rotation, {
        scrollTrigger: {
          trigger: ".scroll__one ",
          start: "0",
          end: "bottom",
          scrub: 3,
          // markers: true,
        },
        x: -2,
      });
      tl.to(plane.rotation, {
        scrollTrigger: {
          trigger: ".scroll__one ",
          start: "0",
          end: "bottom",
          scrub: 3,
          // markers: true,
        },
        z: -2,
      }).to(plane.position, {
        scrollTrigger: {
          trigger: ".scroll__one",
          start: "0",
          end: "bottom",
          scrub: 3,
          // markers: true,
        },
        y: 4000,
      });
      // debug
      gui.add(plane.position, "x", -1200, 1200, 1).name("plane position x");
      gui.add(plane.position, "y", -1200, 1200, 1).name("plane position y");
      gui.add(plane.position, "z", -1200, 1200, 1).name("plane position y");

      gui.add(plane.rotation, "x", -360, 360, 3).name("plane rotation x");
      gui.add(plane.rotation, "y", -360, 360, 3).name("plane rotation y");
      gui.add(plane.rotation, "z", -360, 360, 3).name("plane rotation z");

      plane2.position.x = 741;
      plane2.position.z = 25000;
      plane2.rotation.z = 19.5;

      tl.to(".frame__two", {
        scrollTrigger: {
          trigger: ".scroll__two",
          start: "0",
          end: "bottom",
          scrub: 3,
          // markers: true,
        },

        ease: "linear",
        zIndex: -100,
      });
      tl.to(plane2.position, {
        scrollTrigger: {
          trigger: ".scroll__two ",
          start: "top top",
          end: "bottom ",
          scrub: 1,
          // markers: true,
        },
        z: -2500,
      })

        .to(plane2.rotation, {
          scrollTrigger: {
            trigger: ".scroll__two",
            start: "top top ",
            end: "bottom",
            scrub: 3,
            // markers: true,
          },
          y: -1,
        })
        .to(plane2.position, {
          scrollTrigger: {
            trigger: ".scroll__two",
            start: "top top ",
            end: "bottom",

            scrub: 1,
            // markers: true,
          },
          z: -25000,
        })
        .to(plane2.position, {
          scrollTrigger: {
            trigger: ".scroll__two",
            start: "top top",
            end: "bottom",
            scrub: 3,
            // markers: true,
          },
          x: 168,
        });
      tl.to(plane2.rotation, {
        scrollTrigger: {
          trigger: ".scroll__two",
          start: "top top",
          end: "bottom",
          scrub: 3,
          // markers: true,
        },
        y: -2,
      });
      // plane2
      gui
        .add(plane2.position, "x", -1200, 1200, 0.000000000001)
        .name("plane2 position x");
      gui
        .add(plane2.position, "y", -1200, 1200, 0.000000000001)
        .name("plane2 position y");
      gui
        .add(plane2.position, "z", -25000, 25000, 0.000000000001)
        .name("plane2 position z");

      gui
        .add(plane2.rotation, "x", -360, 360, 0.000000000001)
        .name("plane2 rotation x");
      gui
        .add(plane2.rotation, "y", -360, 360, 0.000000000001)
        .name("plane2 rotation y");
      gui
        .add(plane2.rotation, "z", -360, 360, 0.000000000001)
        .name("plane2 rotation z");
      // debug

      // animating position

      const clockPlane = new THREE.Clock();
      const planeOneAnimation = () => {
        const elapsedTime = clockPlane.getElapsedTime();
        var x = document.getElementsByTagName("BODY")[0];
        if (menustate === false) {
          if (planeState) {
            plane.position.x = elapsedTime * Math.PI;
            plane.position.y = -(elapsedTime * Math.PI);
            camera.position.z -= Math.PI * 0.5;
          } else {
            plane.position.x = 0;
            camera.position.z = 35000;
            plane.position.y = -113;
          }

          // lets stop scrolling while clicked menu
          x.style = `overflow:hidden !important;`;
        } else {
          plane.position.x = 0;
          camera.position.z = 35000;
          plane.position.y = -113;

          // lets invert scrolling while clicked menu
          x.style = `overflow-y:scroll !important;`;
        }

        window.requestAnimationFrame(planeOneAnimation);
      };
      planeOneAnimation();

      //  adding to scene

      scene.add(plane);
      scene.add(plane2);
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

// tl.to(
//   camera.position,
//   {
//     scrollTrigger: {
//       trigger: ".chapter__one",
//       start: "0",
//       end: "bottom",
//       scrub: 3,
//       markers: true,
//     },
//     z: 4000,
//   },
//   "0"
// );

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

tl.to(".frame__two", {
  scrollTrigger: {
    trigger: ".scroll__one",
    start: "100",
    end: "bottom",
    scrub: 1.5,
    // markers: true,
  },
  scale: 100,
  ease: "linear",
  // zIndex: -100,
});
tl.to(".chaptermid__title", {
  scrollTrigger: {
    trigger: ".scroll__one",
    start: "0",
    end: "10",
    scrub: 1.5,
    // markers: true,
  },
  opacity: 0,
  fontSize: "109.66px",
  ease: "linear",
  // zIndex: -100,
});

// calling chapter one

const chapters = gsap.timeline();
chapters
  .to(
    ".chapter__one__title",
    {
      scrollTrigger: {
        trigger: ".scroll__one",
        start: "200",
        end: "center",
        scrub: 1.5,
        // markers: true,
      },
      y: "-10vh",

      ease: "linear",
    },
    ">-30"
  )
  .to(
    ".chapter__one__title h3",
    {
      scrollTrigger: {
        trigger: ".scroll__one",
        start: "100",
        end: "center",
        scrub: 1.5,
        // markers: true,
      },

      opacity: 1,
      marginTop: "0vh",
      ease: "linear",
    },
    ">-34"
  )
  .to(
    ".chapter__one__title .chapter__one__line",

    {
      stagger: {
        amount: 0.5,
        each: 1,
      },
      scrollTrigger: {
        trigger: ".scroll__one",
        start: "200",
        end: "center",
        scrub: 1.5,
        // markers: true,
      },

      ease: "Power2.easeInOut",
      scale: 1,
      opacity: 1,
    },
    ">-31"
  )
  .to(".chapter__one", {
    scrollTrigger: {
      trigger: ".scroll__one",
      start: "top",
      end: "+=600%",
      scrub: 1.5,
      // markers: true,
    },

    duration: 4000,

    y: "-100vh",
    opacity: 0,
    ease: "linear",
  });
