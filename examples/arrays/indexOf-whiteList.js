var whiteList = ['.css','.js'];
var events = [
  {
    file: 'css/core.css'
  },
  {
    file: 'js/app.js'
  },
  {
    file: 'index.html'
  }
]

function getFile() {
  return function(event) {
    return event.file;
  }
}

function inWhiteList (file) {
  var ext = "." + file.split(".").pop();
  return whiteList.indexOf(ext) > -1;
}

var filtered = events.map( getFile() ).filter( inWhiteList );

console.log (filtered);
