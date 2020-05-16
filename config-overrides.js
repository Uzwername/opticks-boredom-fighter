// Thanks @jjenzz
// https://github.com/facebook/create-react-app/issues/5118#issuecomment-464025389
const path = require('path');

module.exports = function override(config) {
    config.resolve = {
        ...config.resolve,
        alias: { '@': path.resolve(__dirname, 'src') },
    };
    
    return config;
};