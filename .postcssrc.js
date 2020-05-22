// https://github.com/michael-ciniawsky/postcss-load-config
let num = 0
module.exports = {
    "plugins": {
        "postcss-import": {},
        "postcss-url": {},
        "postcss-aspect-ratio-mini": {},
        "postcss-write-svg": { utf8: false },
        "postcss-cssnext": {},
        "postcss-px-to-viewport": {
            viewportWidth: 375,
            viewportHeight: 667,
            unitPrecision: 5,
            viewportUnit: 'vw',
            selectorBlackList: ['.ignore', '.hairlines'],
            minPixelValue: 1,
            mediaQuery: false
        },
        "postcss-viewport-units": {
            filterRule: rule => {
                rule.selector.indexOf('::after') === -1 && rule.selector.indexOf('::before') === -1 && rule.selector.indexOf(':after') === -1 && rule.selector.indexOf(':before') === -1
            }
        },
        "cssnano": {
            // preset: "advanced",
            autoprefixer: false,
            "postcss-zindex": false
        }
    }
}