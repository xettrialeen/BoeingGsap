// window.onload = () => {
//   // init the notification
//   let notification = document.querySelectorAll(".notification");
//   console.log(notification);
//   notification.forEach((event) => {
//     event.addEventListener("click", () => {
//       let notSound = document.getElementsByClassName("NotificationSound");

//       notSound[0].play();
//     });
//   });
// };

// // movieng Cursor

// const ball = document.querySelector(".circle");

// let mouseX = 1480;
// let mouseY = 120;

// let ballX = 0;
// let ballY = 0;

// let speed = 0.06;

// function animate() {
//   let distX = mouseX - ballX;
//   let distY = mouseY - ballY;

//   ballX = ballX + distX * speed;
//   ballY = ballY + distY * speed;

//   ball.style.left = ballX + "px";
//   ball.style.top = ballY + "px";

//   requestAnimationFrame(animate);
// }
// animate();

// let menu = document.querySelector(".menu");
// menu.addEventListener("mousemove", function (event) {
//   mouseX = event.pageX;
//   mouseY = event.pageY;
// });
// // menu.addEventListener("mouseleave", function (event) {
// //   ball.style = `visibility: hidden; opacity:0; transition:all 0.3 ease-in-out;`;

// // });
// menu.addEventListener("mouseenter", function (event) {
//   ball.style = `visibility: visible; opacity:1;  transition:all 0.3 ease-in-out;`;
// });
// menu.addEventListener("mouseleave", function (event) {
//   ball.style = `visibility: hidden; opacity:0;  transition:all 0.3 ease-in-out;`;
// });

// let navLink = document.querySelectorAll(".cursor__hover ");

// for (const i of navLink) {
//   i.addEventListener("mouseenter", () => {
//     ball.classList.add("circleActive");
//     ball.classList.remove("circleRemove");
//   });
//   i.addEventListener("mouseleave", () => {
//     ball.classList.add("circleRemove");
//     ball.classList.remove("circleActive");
//   });
// }
// // navLink.foreach((e) => {
// //   e.addEventListener("mouseenter", () => {
// //     console.log(e);
// //     ball.classList.add("circleActive");
// //   });
// // });

// let menuBtn = document.getElementsByClassName(".menuBtn");
// let btnState= true;
// menuBtn[0].addEventListener("click",()=>{
//   btnState= !btnState;
//  if (btnState === true) {
//   ball.style = `display: none;`;
//  }
 
// })