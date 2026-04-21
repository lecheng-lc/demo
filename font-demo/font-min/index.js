var Fontmin = require('fontmin');

var fontmin = new Fontmin()
    .src('*.ttf').use(Fontmin.glyph({
    text: 'Hello World 你好'
  }))
    .dest('build/font-min');

fontmin.run(function (err, files) {
    if (err) {
        throw err;
    }
});