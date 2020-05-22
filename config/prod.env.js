'use strict'
const target = process.env.MODE;
var obj;
if (target == 'product') {
    obj = {
        NODE_ENV: '"production"',
        URL: JSON.stringify({
            mobile: 'https://wxyilian.zwjk.com/'
        }),
    }
} else if (target == 'pre') {
    obj = {
        NODE_ENV: '"production"',
        URL: JSON.stringify({
            mobile: ''
        }),
    }
} else if (target == 'test') {
    obj = {
        NODE_ENV: '"production"',
        URL: JSON.stringify({
            mobile: 'http://testjgjkz.zwjk.com/'
        }),
    }
}

module.exports = obj