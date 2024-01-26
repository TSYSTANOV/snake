let width = 200;
let height = 200;
let size = 10;
let iterator = 3;

let speed = 300;
let div = document.createElement("div");
div.className = "text";
div.style.cssText = `

  background-color: blanchedalmond;
  width: ${width}px;
  height: ${height}px;
  position: relative;
  margin: 40px;
  display: flex;
  flex-wrap: wrap;
}`;
document.querySelector("body").append(div);

for (let i = 1; i <= width + height; i++) {
  let div2 = document.createElement("div");
  div2.style.cssText = `
  width:${(width + height) / ((width + height) / size)}px;
  height:${(width + height) / ((width + height) / size)}px;`;
  div2.className = "test";
  div.append(div2);
}

function randomNumb() {
  let numb;
  numb = parseFloat(`${Math.round(Math.random() * 20)}0`);
  if (numb === width || numb === 0) {
    numb = parseFloat(`${Math.round(Math.random() * 20)}0`);
  }
  return numb;
}

function CreateEl(top, left) {
  this.width = `${size}px`;
  this.height = `${size}px`;
  this.position = "absolute";
  this.backgroundColor = "red";
  this.top = top;
  this.left = left;
  this.appleVis = function () {
    if (document.querySelector("apple")) {
      document.querySelector("apple").remove();
    }
    let el = document.createElement("div");
    el.classList.add("apple");
    el.style.top = `${randomNumb()}px`;
    el.style.left = `${randomNumb()}px`;
    el.style.width = this.width;
    el.style.height = this.height;
    el.style.position = this.position;
    document.querySelector(".text").append(el);
  };
  this.vis = function (param) {
    let indexTop = 0;
    let indexLeft = 0;
    let el = document.createElement("div");
    el.classList.add("cuba");
    el.style.top = `${this.top}px`;
    el.style.left = `${this.left + indexLeft}px`;
    el.style.width = this.width;
    el.style.height = this.height;
    el.style.position = this.position;
    document.querySelector(".text").append(el);
    indexTop += size;
    indexLeft += size;
    return { top: parseFloat(el.style.top), left: parseFloat(el.style.left) };
  };

  this.visible = function () {
    let indexTop = 0;
    let indexLeft = 0;

    for (let i = 0; i < iterator; i++) {
      let el = document.createElement("div");
      el.classList.add("cuba");
      el.style.top = `${this.top}px`;
      el.style.left = `${this.left + indexLeft}px`;
      el.style.width = this.width;
      el.style.height = this.height;
      el.style.position = this.position;
      document.querySelector(".text").append(el);
      indexTop += size;
      indexLeft += size;
    }
  };
  this.removeEl = function () {
    document.querySelector(".cuba").remove();
  };
  this.rightMet = function () {
    document.querySelector(".cuba").remove();
    this.top = this.top;
    this.left = this.left < height ? this.left + size : height - size;
  };
  this.leftMet = function () {
    document.querySelector(".cuba").remove();
    this.top = this.top;
    this.left = this.left >= 0 ? this.left - size : 0;
  };
  this.topMet = function () {
    document.querySelector(".cuba").remove();
    this.top = this.top >= 0 ? this.top - size : 0;
    this.left = this.left;
  };
  this.downMet = function () {
    document.querySelector(".cuba").remove();
    this.top = this.top < width ? this.top + size : width;
    this.left = this.left;
  };
  this.checkCollizion = function (id) {
    if (this.top < 0 || this.top >= width) {
      alert("GAME OVER");
      clearInterval(id);
    }
    if (this.left < 0 || this.left >= height) {
      alert("GAME OVER");
      clearInterval(id);
    }
  };
  this.checkAppleEat = function () {
    let apple = document.querySelector(".apple");
    let w = parseFloat(apple.style.top);
    let h = parseFloat(apple.style.left);
    if (this.top === w && this.left === h) {
      console.log("EAT APPLE");
      document.querySelector(".apple").remove();
      speed -= 20;
      a.appleVis();
      a.vis();
    }
  };
  this.checkSnakeArrow = function (id) {
    let arr = document.querySelectorAll(".cuba");

    for (let i = 0; i < arr.length - 1; i++) {
      let t = parseFloat(arr[i].style.top);
      let l = parseFloat(arr[i].style.left);

      if (t === id.top && l === id.left) {
        alert("GAME OVER");
      }
    }
  };
}
let a = new CreateEl(size, size);
a.visible();
a.appleVis();
let alfa;
alfa = setInterval(() => {
  a.rightMet();
  a.vis();
  a.checkCollizion(alfa);
}, speed);
let prevKey;
document.addEventListener("keydown", () => {
  console.log(event);
  if (event.key === "ArrowRight" && prevKey !== "ArrowLeft") {
    clearInterval(alfa);
    prevKey = "ArrowRight";
    alfa = setInterval(() => {
      a.rightMet();
      let beta = a.vis();
      a.checkSnakeArrow(beta);
      a.checkAppleEat();
      a.checkCollizion(alfa);
    }, speed);
  }
  if (event.key === "ArrowLeft" && prevKey !== "ArrowRight") {
    clearInterval(alfa);
    prevKey = "ArrowLeft";
    alfa = setInterval(() => {
      a.leftMet();
      let beta = a.vis();
      a.checkSnakeArrow(beta);
      a.checkAppleEat();
      a.checkCollizion(alfa);
    }, speed);
  }
  if (event.key === "ArrowDown" && prevKey !== "ArrowUp") {
    clearInterval(alfa);
    prevKey = "ArrowDown";
    alfa = setInterval(() => {
      a.downMet();
      let beta = a.vis();
      a.checkSnakeArrow(beta);
      a.checkAppleEat();
      a.checkCollizion(alfa);
    }, speed);
  }
  if (event.key === "ArrowUp" && prevKey !== "ArrowDown") {
    clearInterval(alfa);
    prevKey = "ArrowUp";
    alfa = setInterval(() => {
      a.topMet();
      let beta = a.vis();
      a.checkSnakeArrow(beta);
      a.checkAppleEat();
      a.checkCollizion(alfa);
    }, speed);
  }
});
