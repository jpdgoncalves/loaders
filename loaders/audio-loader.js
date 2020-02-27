export default class AudioLoader {

    /**
     * 
     * @param {string[]} audioUrls 
     */
    constructor(audioUrls) {
        this.loadedAudios = 0;
        this.totalAudios = audioUrls.length;
        /**
         * @type {HTMLAudioElement[]}
         */
        this.audios = [];
        this.promise = Promise.all(
            audioUrls.map((audioUrl) => {
                return this._loadSingleAudio(audioUrl)
            })
        ).then((audios) => {
            this.audios = audios;
            this._onComplete(audios);
            return Promise.resolve(audios);
        })
        .catch((audioUrl) => {
            this._onError(audioUrl);
        });
        /**
         * @param {string} audioUrl
         * @param {number} loadedAudios
         * @param {number} totalAudios
         */
        this.onupdate = (audioUrl, loadedAudios, totalAudios) => {
            console.log(`Loaded audio ${audioUrl}. ${loadedAudios} out of ${totalAudios}`);
        };
        /**
         * @param {string} audioUrl
         */
        this.onerror = (audioUrl) => {
            console.error(`Failed to load ${audioUrl}`);
        }
        /**
         * @param {HTMLAudioElement} audios
         */
        this.oncomplete = (audios) => {
            console.log("Finished loading audios", audios);
        }
    }

    /**
     * 
     * @param {string} audioUrl 
     */
    _loadSingleAudio(audioUrl) {
        return new Promise(
            (resolve, reject) => {
                const audio = new Audio(audioUrl);
                audio.addEventListener(
                    "canplaythrough",
                    () => {
                        this._onUpdate(audioUrl);
                        resolve(audio);
                    },
                    {once: true}
                );

                audio.addEventListener(
                    "error",
                    (event) => {
                        reject(audioUrl);
                    }
                );
            }
        );
    }

    /**
     * 
     * @param {string} audioUrl 
     */
    _onUpdate(audioUrl) {
        this.loadedAudios++;
        this.onupdate(audioUrl, this.loadedAudios, this.totalAudios);
    }

    /**
     * 
     * @param {string} audioUrl 
     */
    _onError(audioUrl) {
        this.onerror(audioUrl);
    }

    /**
     * 
     * @param {HTMLAudioElement[]} audios 
     */
    _onComplete(audios) {
        this.oncomplete(audios);
    }

}