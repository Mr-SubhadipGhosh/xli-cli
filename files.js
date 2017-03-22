var fs = require('fs');
var path = require('path');

module.exports = {
  getCurrentDirectoryBase: function () {
    return path.basename(process.cwd());
  },

  createFile(name, content) {
    var stream = fs.createWriteStream(name);
    stream.once('open', function (fd) {
      stream.write(content);
      stream.end();
    });
  }

};