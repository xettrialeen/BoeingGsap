window.onload = () => {
  // init the notification
  let notification = document.querySelectorAll(".notification");
  console.log(notification);
  notification.forEach((event) => {
    event.addEventListener("click", () => {
      let notSound = new Audio("./sound/click.mp3");
      notSound.play();
    });
  });
};


// movieng Cursor

// const ball = document.querySelector("#circle");

// let mouseX = 0;
// let mouseY = 0;

// let ballX = 0;
// let ballY = 0;

// let speed = 0.06;


// function animate(){
  
//   let distX = mouseX - ballX;
//   let distY = mouseY - ballY;
  
  
//   ballX = ballX + (distX * speed);
//   ballY = ballY + (distY * speed);
  
//   ball.style.left = ballX + "px";
//   ball.style.top = ballY + "px";
  
//   requestAnimationFrame(animate);
// }
// animate();

// document.addEventListener("mousemove", function(event){
//   mouseX = event.pageX;
//   mouseY = event.pageY;
// })