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
import { Clock } from "three";
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

const loader = new GLTFLoader();
const texture = new THREE.TextureLoader();
texture.load("./plane/textures/Material_baseColor.jpeg", (texture) => {
  //loading model through gltf loader
  loader.load(
    // there are two arguments url to load and callback function
    "./plane/scene.gltf",
    (model) => {
      let modelPlane = model.scene;
      let plane = model.scene.clone();

      // removing plane if scrolled too much

      let scrollY = window.scrollY;
      window.addEventListener("scroll", () => {
        scrollY = window.scrollY;
        let scrolled = scrollY / window.innerHeight;
        if (scrolled >= 1.21) {
          scene.remove(plane);
        } else if (scrolled <= 0.6) {
          scene.add(plane);
        }
      });

      // for plane 2

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
        let time;
        menuSound.loop = true;

        if (menustate === false) {
          menuSound[0].play();
          time = 0;
          let countDown = setInterval(() => {
            if (time <= 0.99) {
              time += 0.1;
              menuSound[0].volume = time;
            } else {
              clearInterval(countDown);
            }
          }, 100);
          // making sound level low
          setTimeout(function () {
            menuSound[0].play();
          }, 2500);
        } else {
          // for (let i = 1; i > 0 ; i-=0.1) {
          //   if (i>=0) {

          //     menuSound[0].volume = i;

          //   }else{
          //     break;
          //   }
          //   console.log(menuSound[0].volume);
          // }
          time = 1;
          let countDown = setInterval(() => {
            if (time >= 0.1) {
              time -= 0.09;
              menuSound[0].volume = time;
            } else {
              clearInterval(countDown);
            }
          }, 100);
          // making sound level low
          setTimeout(function () {
            menuSound[0].pause();
          }, 1200);
        }

        // adding plane animation on here
        let clock = new THREE.Clock(); //
        var x = document.getElementsByTagName("BODY")[0];
        const menuAnimate = () => {
          let elapsedTime = clock.getElapsedTime();

          if (menustate === false) {
            plane.rotation.x = Math.sin(elapsedTime / Math.PI);
            plane.position.x = Math.sin(elapsedTime / Math.PI);
            // plane.position.y = -(elapsedTime * Math.PI);
            // camera.position.z -= Math.PI * 0.5;

            // lets stop scrolling while clicked menu
            x.style = `overflow:hidden !important;`;
          } else {
            plane.position.x = 0;
            camera.position.z = 35000;
            plane.position.y = -113;
            plane.rotation.x = 0;
            // lets invert scrolling while clicked menu
            x.style = `overflow-y:scroll !important;`;
          }

          // window.requestAnimationFrame(menuAnimate);
        };

        menuAnimate();
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

// using gsap for hammenu

let hamMenu = gsap.timeline({
  repeat: -1,
  yoyo: true,
});

gsap.to(
  ".ball",
  {
    width: 6,
    height: 6,
    borderRadius: "50%",
    duration: 0.3,
    marginBottom: 4,
    x: 10,

    ease: "easeInOut",
  },
  "0"
);
hamMenu.fromTo(
  ".ball",
  {
    y: 4.5,
  
    duration: 0.88,
    ease: "linear",
  },
  {
    y: -4.5,

    duration: 0.88,
    ease: "linear",
  },
  "0"
);

let batTimeline = gsap.timeline({ repeat: -1, yoyo: true });

let batTwoTimeline = batTimeline;
batTimeline.fromTo(
  ".bat__1",
  {
    x: 3,
    ease: "linear",
   
    opacity:0
  },
  {
    x: -3,
    ease: "linear",
    duration: 0.91,
    opacity:1
  },
  "0"
);
batTwoTimeline.fromTo(
  ".bat__2",
  {
    x: -3,
    ease: "linear",

    opacity:1
  },
  {
    x: 3,
    ease: "linear",
    duration: 0.91,
    opacity:0
  },
  "0"
);


// .fromTo(
//   ".bat__1",
//   {

//   opacity:1,
//     ease: "Back.easeInOut",
//   },
//   {

//   opacity:0.5,
//     ease: "Back.easeInOut",
//     duration:0.5
//   },
//   "0.8"
// )
//   .to(
//     ".bat__1",
//     {

//     opacity:1,
//       ease: "Back.easeInOut",
//     },

//     "1.3"
//   )
//  .to(
//     ".ball",
//     {
//       y:3,
//       rotateX: 20,
//       duration: 1,
//       ease: "linear",
//     },
//     "0.99"
//   )  .fromTo(
//     ".bat__2",
//     {

//     opacity:1,
//       ease: "Back.easeInOut",
//     },
//     {

//     opacity:0.5,
//       ease: "Back.easeInOut",
//       duration:0.5
//     },
//     "1.6"
//   )
//   .to(
//     ".ball",
//     {
//       y: -6,
//       rotateX: 20,
//       duration: 1.1,
//       ease: "linear",
//     },
//     "1.7"
//   )
//   .to(
//     ".bat__2",
//     {

//     opacity:1,
//       ease: "Back.easeInOut",
//     },

//     "2.2"
//   )
//    .to(
//      ".ball",
//      {
//        y: -5,
//        x: 4,
//        rotateX: 20,
//        duration: 1,
//        ease: "Back.easeInOut",
//      },
//      "0.6"
//    )

//   .to(
//     ".ball",
//     {
//       y: 3.2,
//       x: 12,
//       rotateX: 20,
//       duration: 1,
//       ease: "linear",
//     },
//     "1.28"
//   )
//   .to(
//     ".bat__2",
//     {
//       x: -3,

//       duration: 1,
//       ease: "Back.easeInOut",
//     },
//     "1.30"
//   )
//   .to(".ball", {
//     x: 24,
//     y: -4.8,

//     duration: 1,
//     ease: "linear",
//   })
//   .to(
//     ".bat__1",
//     {
//       x: 6,

//       duration: 0.5,
//       ease: "linear",
//     },
//     "2.1"
//   )
//   .to(
//     ".ball",
//     {
//       y: 0.4,
//       x: 33,

//       duration: 0.5,
//       ease: "linear",
//     },
//     "3.2"
//   )
//   .to(
//     ".ball",
//     {
//       y: 4,
//       x: 28,

//       duration: 0.5,
//       ease: "linear",
//     },
//     "3.8"
//   )

//   ;


window.onload = () => {
  // init the notification
  let notification = document.querySelectorAll(".notification");
  console.log(notification);
  notification.forEach((event) => {
    event.addEventListener("click", () => {
      let notSound = document.getElementsByClassName("NotificationSound");

      notSound[0].play();
    });
  });
};

// movieng Cursor

const ball = document.querySelector(".circle");

let mouseX = 1480;
let mouseY = 120;

let ballX = 0;
let ballY = 0;

let speed = 0.06;

function animate() {
  let distX = mouseX - ballX;
  let distY = mouseY - ballY;

  ballX = ballX + distX * speed;
  ballY = ballY + distY * speed;

  ball.style.left = ballX + "px";
  ball.style.top = ballY + "px";

  requestAnimationFrame(animate);
}
animate();

let menu = document.querySelector(".menu");
menu.addEventListener("mousemove", function (event) {
  mouseX = event.pageX;
  mouseY = event.pageY;
});
// menu.addEventListener("mouseleave", function (event) {
//   ball.style = `visibility: hidden; opacity:0; transition:all 0.3 ease-in-out;`;

// });
menu.addEventListener("mouseenter", function (event) {
  ball.style = `visibility: visible; opacity:1;  transition:all 0.3 ease-in-out;`;
});
menu.addEventListener("mouseleave", function (event) {
  ball.style = `visibility: hidden; opacity:0;  transition:all 0.3 ease-in-out;`;
});

let navLink = document.querySelectorAll(".cursor__hover ");

for (const i of navLink) {
  i.addEventListener("mouseenter", () => {
    ball.classList.add("circleActive");
    ball.classList.remove("circleRemove");
  });
  i.addEventListener("mouseleave", () => {
    ball.classList.add("circleRemove");
    ball.classList.remove("circleActive");
  });
}
// navLink.foreach((e) => {
//   e.addEventListener("mouseenter", () => {
//     console.log(e);
//     ball.classList.add("circleActive");
//   });
// });

let menuBtn = document.getElementsByClassName(".menuBtn");
let btnState= true;
menuBtn[0].addEventListener("click",()=>{
  btnState= !btnState;
 if (btnState === true) {
  ball.style = `display: none;`;
 }
 
})