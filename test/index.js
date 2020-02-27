import AudioLoader from "../loaders/audio-loader.js";
import ImageLoader from "../loaders/image-loader.js";

console.log("Working");

const audioLoader = new AudioLoader([
    "audio/1-09 Happy Towns.mp3",
    "audio/3-15 Enemy Appearance.mp3"
]);

const imageLoader = new ImageLoader([
    "images/frame1.jpg",
    "images/frame2.png",
    "images/frame3.png"
]);