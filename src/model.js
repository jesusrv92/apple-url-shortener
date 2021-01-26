import { nanoid } from 'nanoid'
import normalizeURL from 'normalize-url';

// CHANGE TO USE A DB FOR A PERSISTENT SOLUTION

class ShortURL {
    static cacheURL = new Map();
    static cacheID = new Map();

    constructor(url = '') {
        const normalized = normalizeURL(url);
        if (ShortURL.cacheURL.has(normalized)) {
            // check expiration
            this.url = normalized;
            this.id = ShortURL.getID(normalized)
            return;
        }
        this.url = normalized;

        const idLength = 10;
        let id = nanoid(idLength);
        while (ShortURL.cacheID.has(id)) {
            // check expiration
            id = nanoid(idLength);
        }
        this.id = id;

        ShortURL.addURL(this);
    }
    static addURL({ url, id }) {
        ShortURL.cacheURL.set(url, id);
        ShortURL.cacheID.set(id, url);
    }
    static getURL(id = '') {
        // check expiration
        return ShortURL.cacheID.get(id);
    }
    static getID(url = '') {
        // check expiration
        return ShortURL.cacheURL.get(url);
    }
}

export default ShortURL