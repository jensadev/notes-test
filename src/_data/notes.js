const Cache = require('@11ty/eleventy-cache-assets');

module.exports = async () => {
    try {
        let url = 'http://localhost:3000/notes';

        /* This returns a promise */
        return Cache(url, {
            duration: '1m',
            type: 'json'
        });
    } catch (e) {
        return {
            // my failure fallback data
        };
    }
};

