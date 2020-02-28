import Loader from "./loader.js";

export class ImageLoader extends Loader {
    constructor() {
        super();

        //Overrides
        this.createResource = (url) => {
            const image = document.createElement("img");
            image.src = url;
            return image;
        }
    }
}

export class AudioLoader extends Loader {
    constructor() {
        super();

        //Overrides
        this.loadEventName = "onloadstart";
        this.createResource = (url) => {
            return new Audio(url);
        };
    }
}