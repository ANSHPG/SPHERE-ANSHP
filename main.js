// to get link of the host 
// npm run dev

import * as THREE from "three";
import "./style.css"
import gsap from "gsap"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

// scene 
const scene = new THREE.Scene()
// radius segment segments , more the segments more smooth the entity will be
const geometry = new THREE.SphereGeometry(3, 64, 64)
const material = new THREE.MeshStandardMaterial({
  // colors : {#00ff83 ,#e05802, #152552 , #d92b5c, #8739f9} 
  color: "#152552",
  roughness: 0.5
})
const mesh = new THREE.Mesh(geometry, material);
// mesh is the combination of geometry and material
scene.add(mesh)

// sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

// light
const light = new THREE.PointLight(0xffffff, 1, 150)
// color intensity distance
light.position.set(0, 10, 10)
light.intensity = 1.25
scene.add(light)

// camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
// filed of view  aspect ratio  near clipping - far clipping object
camera.position.z = 20
// the less the number the more close you are
scene.add(camera)


// render
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene, camera)

//controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 5

//Resize
window.addEventListener('resize', () => {
  // update sizes
  console.log(window.innerWidth)
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  // update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
})

const loop = () => {
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop);
}
loop()

//timeline
const tl = gsap.timeline({ defaults: { duration: 1 } })
tl.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 })
tl.fromTo("nav", { y: "-100%" }, { y: "0%" })
tl.fromTo(".title", { opacity: 0 }, { opacity: 1 })

//mouse Animation color
let mouseDown = false
let rgb = []
let cursorLink = document.querySelector(".inner-cursor")

window.addEventListener("mousedown", () => (mouseDown = true))
window.addEventListener("mouseup", () => (mouseDown = false))

window.addEventListener("mousemove", (e) => {
  if (mouseDown) {
    rgb = [Math.round((e.pageX / sizes.width) * 255),
    Math.round((e.pageY / sizes.height) * 255), 123]
    console.log(e);
    console.log(rgb);
  }
  //Animate
  let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
  gsap.to(mesh.material.color, {
    r: newColor.r,
    g: newColor.g,
    b: newColor.b
  })
})

//cursor
let innerCursor = document.querySelector('.inner-cursor');
let outerCursor = document.querySelector('.outer-cursor');

document.addEventListener('mousemove', controlCursor);

let x;
let y;
let decide = false;

function controlCursor(c) {
  if (decide) {
    x = c.clientX - 43;
    y = c.clientY - 25;
  }
  else {
    x = c.clientX - 10;
    y = c.clientY - 6;
  }
  console.log(c);
  // moveCursor(x, y)
}

function moveCursor(m, n) {
  let a = m;
  let b = n;
  console.log(m, n);

  innerCursor.style.left = `${a}px`;
  innerCursor.style.top = `${b}px`;
  outerCursor.style.left = `${a}px`;
  outerCursor.style.top = `${b}px`;

}

function changeCursorSize(value) {
  if (value) {
    innerCursor.classList.add("grow");
    decide = true;
  }
  else {
    innerCursor.classList.remove("grow");
    decide = false;
  }
}

function update() {
  window.requestAnimationFrame(update)
  moveCursor(x, y)
}
update();

// title
let link = document.querySelector(".title")
console.log(link);

link.addEventListener('mouseover', () => {
  changeCursorSize(true);
  innerCursor.classList.add("changeColor");
})

link.addEventListener('mouseleave', () => {
  changeCursorSize(false);
  innerCursor.classList.remove("changeColor");
})

//nav
let link1 = document.querySelector("nav")
console.log(link1);

link1.addEventListener('mouseover', () => {
  // innerCursor.classList.add("changeSize");
  changeCursorSize(true);
  innerCursor.classList.add("changeColor");
})

link1.addEventListener('mouseleave', () => {
  // innerCursor.classList.remove("changeSize");
  changeCursorSize(false);
  innerCursor.classList.remove("changeColor");
})

//canvas
canvas.addEventListener('mouseover', () => {
  innerCursor.classList.add("nomixblend");
})

canvas.addEventListener('mouseleave', () => {
  innerCursor.classList.remove("nomixblend");
})

// mouse down Ennlarge InnerCursoe Event
window.addEventListener("mousedown", () => {
  innerCursor.classList.add("changeSize");
})

window.addEventListener("mouseup", () => {
  innerCursor.classList.remove("changeSize");
})

// title - Spin
let spinChange = document.querySelector(".spin");

spinChange.addEventListener("mouseover", () => {
  link.style.color = "#0b2c87";
  spinChange.classList.add("spinColor");
})

spinChange.addEventListener("mouseleave", () => {
  link.style.color = "#ffffff";
  spinChange.classList.remove("spinColor");
})

