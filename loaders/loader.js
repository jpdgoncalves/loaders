export default class Loader {

    constructor() {
        this.loadedResources = 0;
        this.totalResources = 0;

        //Misc to override
        this.loadEventName = "onload";
        this.errorEventName = "onerror";
        /**
         * @param {string} url
         * @returns The resource to load
         */
        this.createResource = (url) => {};

        //Event handlers to override
        /**
         * @param {string} url
         * @param {any} resource
         * @param {number} loadedResources
         * @param {number} totalResources
         */
        this.onprogress = (url, resource, loadedResources, totalResources) => {
            console.log(`Loaded ${url}. ${loadedResources} out of ${totalResources}`, resource);
        };
        this.oncomplete = () => {
            console.log(`Finished loading resources`);
        };
        /**
         * @param {string} url
         * @param {Event} event
         */
        this.onerror = (url, event) => {
            console.error(`Failed to load ${url}`);
            console.error(event);
        };
    }

    get loading() {
        return this.loadedResources !== this.totalResources;
    }

    /**
     * 
     * @param {string | string[]} urls 
     */
    load(urls) {
        if(urls instanceof Array) {
            for(const url of urls) {
                this._singleLoad(url);
            }
        } else {
            this._singleLoad(urls);
        }
    }

    /**
     * 
     * @param {string} url 
     */
    _singleLoad(url) {
        this.totalResources++;
        const resource = this.createResource(url);
        resource[this.loadEventName] = () => {this._onProgress(url, resource);}
        resource[this.errorEventName] = (event) => {this._onError(url, resource, event)};
    }

    _onProgress(url, resource) {
        this.loadedResources++;
        this._cleanListeners(resource);
        this.onprogress(url, resource, this.loadedResources, this.totalResources);
        if(!this.loading) {
            this._onComplete();
        }
    }

    _onComplete() {
        this.oncomplete();
    }

    _onError(url, resource, event) {
        this.totalResources--;
        this._cleanListeners(resource);
        this.onerror(url, event);
        if(!this.loading) {
            this._onComplete();
        }
    }

    _cleanListeners(resource) {
        resource[this.loadEventName] = undefined;
        resource[this.errorEventName] = undefined;
    }

}