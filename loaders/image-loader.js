export default class ImageLoader {

    /**
     * 
     * @param {string[]} imageUrls 
     */
    constructor(imageUrls) {
        this.loadedImages = 0;
        this.totalImages = imageUrls.length;
        /**
         * @type {HTMLImageElement[]}
         */
        this.images = [];
        this.promise = Promise.all(
            imageUrls.map((imageUrl) => {
                return this._loadSingleImage(imageUrl)
            })
        ).then((images) => {
            this.images = images;
            this._onComplete(images);
            return Promise.resolve(images);
        })
        .catch((imageUrl) => {
            this._onError(imageUrl);
        });
        /**
         * @param {string} imageUrl
         * @param {number} loadedImages
         * @param {number} totalImages
         */
        this.onupdate = (imageUrl, loadedImages, totalImages) => {
            console.log(`Loaded image ${imageUrl}. ${loadedImages} out of ${totalImages}`);
        };
        /**
         * @param {string} imageUrl
         */
        this.onerror = (imageUrl) => {
            console.error(`Failed to load ${imageUrl}`);
        }
        /**
         * @param {HTMLImagesElement} images
         */
        this.oncomplete = (images) => {
            console.log("Finished loading images", images);
        }
    }

    /**
     * 
     * @param {string} imageUrl 
     */
    _loadSingleImage(imageUrl) {
        return new Promise(
            (resolve, reject) => {
                const image = new Image();
                image.src = imageUrl;
                image.addEventListener(
                    "load",
                    () => {
                        this._onUpdate(imageUrl);
                        resolve(image);
                    },
                    {once: true}
                );

                image.addEventListener(
                    "error",
                    () => {
                        reject(imageUrl);
                    }
                );
            }
        );
    }

    /**
     * 
     * @param {string} imageUrl 
     */
    _onUpdate(imageUrl) {
        this.loadedImages++;
        this.onupdate(imageUrl, this.loadedImages, this.totalImages);
    }

    /**
     * 
     * @param {string} imageUrl 
     */
    _onError(imageUrl) {
        this.onerror(imageUrl);
    }

    /**
     * 
     * @param {HTMLImageElement[]} images 
     */
    _onComplete(images) {
        this.oncomplete(images);
    }

}