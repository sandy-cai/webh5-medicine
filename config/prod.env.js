'use strict'
const target = process.env.MODE;
var obj;
if (target == 'product') {
    obj = {
        NODE_ENV: '"production"',
        URL: JSON.stringify({
            mobile: 'http://111.231.218.245:8033/'
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
            mobile: 'http://111.231.218.245:8033/'
        }),
    }
}

module.exports = obj