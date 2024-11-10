gsap.registerPlugin(ScrollTrigger);

// Locomotive Scroll Setup
function locomotive() {
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });

  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
}

locomotive();

// Canvas Setup
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render();
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Array of specific image names instead of sequence
const imagePaths = [
  "me.jpeg",
  "IMG_1808.jpeg",
  "background image .jpeg",
  "Screenshot 2024-10-31 at 19.30.18.png",
  "django.svg",
  // Add other specific image names here as needed
];

// Setup for Image Sequence
const frameCount = imagePaths.length;
const images = [];
const imageSeq = { frame: 1 };

// Load images by specific names
imagePaths.forEach((imageName, i) => {
  const img = new Image();
  img.src = `images/${imageName}`;
  images.push(img);
});

images[1].onload = render;

images[1].onload = render;

function render() {
  if (images[imageSeq.frame]) {
    scaleImage(images[imageSeq.frame], context);
  }
}

function scaleImage(img, ctx) {
  const canvas = ctx.canvas;
  const hRatio = canvas.width / img.width;
  const vRatio = canvas.height / img.height;
  const ratio = Math.max(hRatio, vRatio);
  const centerShift_x = (canvas.width - img.width * ratio) / 2;
  const centerShift_y = (canvas.height - img.height * ratio) / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, img.width, img.height, centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
}

// Pin Sections
["#page1", "#page2", "#page3"].forEach((selector) => {
  gsap.to(selector, {
    scrollTrigger: {
      trigger: selector,
      start: "top top",
      end: "bottom top",
      pin: true,
      scroller: "#main",
    },
  });
});

