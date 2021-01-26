import { nanoid } from 'nanoid'
import normalizeURL from 'normalize-url';

const oneday = 60 * 60 * 24 * 1000;
// CHANGE TO USE A DB FOR A PERSISTENT SOLUTION

class ShortURL {
    static cacheURL = new Map();
    static cacheID = new Map();

    constructor(url = '') {
        const normalized = normalizeURL(url);

        if (ShortURL.cacheURL.has(normalized)) {
            const urlObject = ShortURL.cacheURL.get(normalized);
            if (!ShortURL.checkExpiration(urlObject)) {
                urlObject.expire = Date.now() + oneday;
                return urlObject;
            }
        }

        const idLength = 10;
        let id = nanoid(idLength);

        while (ShortURL.cacheID.has(id)) {
            const urlObject = ShortURL.cacheID.get(id);
            if (!ShortURL.checkExpiration(urlObject)) {
                id = nanoid(idLength);
            }
        }

        this.url = normalized;
        this.id = id;
        this.expire = Date.now() + oneday
        ShortURL.addURL(this);
    }

    static addURL(urlObject = { url = '', id = '', expire = Date.now() }) {
        const { url, id } = urlObject
        ShortURL.cacheURL.set(url, urlObject);
        ShortURL.cacheID.set(id, urlObject);
    }

    static getURL(id = '') {
        const urlObject = ShortURL.cacheID.get(id);
        if (ShortURL.checkExpiration(urlObject) || !urlObject) {
            return null;
        }
        else {
            urlObject.expire = Date.now() + oneday;
            return ShortURL.cacheID.get(id).url;
        }
    }

    static getID(url = '') {
        const urlObject = ShortURL.cacheURL.get(url);
        if (ShortURL.checkExpiration(urlObject) || !urlObject) {
            return null;
        }
        else {
            urlObject.expire = Date.now() + oneday;
            return ShortURL.cacheURL.get(url).id;
        }
    }

    static checkExpiration(urlObject = { url = '', id = '', expire = Date.now() }) {
        if (urlObject.expire < Date.now) {
            ShortURL.cacheID.delete(urlObject.id);
            ShortURL.cacheURL.delete(urlObject.url);
            return true;
        }
        return false;
    }
}

export default ShortURL