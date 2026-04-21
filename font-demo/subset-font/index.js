const subsetFont = require('subset-font');
const fs = require('fs');

const font = fs.readFileSync('./AliPuHui.woff2');

subsetFont(font, 'Hello 你好', {
  targetFormat: 'woff2'
}).then(result => {
  fs.writeFileSync('build/AliPuHui.woff2', result);
});