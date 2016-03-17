
var UglifyJS = require('uglify-js');
var fs = require('fs');

var result = UglifyJS.minify('./vectors-fd.js', {
  outSourceMap: 'vectors-fd.js.map',
  mangle: true,
  compress: {
    sequences: true,
    dead_code: true,
    conditionals: true,
    booleans: true,
    unused: true,
    if_return: true,
    join_vars: true,
    drop_console: true
  }
});

fs.writeFileSync('./dist/vectors-fd.min.js', result.code);
fs.writeFileSync('./dist/vectors-fd.min.js.map', result.map);
