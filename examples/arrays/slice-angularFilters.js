var person = {
  name: 'juanma-garrido'
};

var filters = {
  deslugify : function(x) { return x.replace('-',' '); },
  uppercase : function(x) { return x.toUpperCase(); }
}

function trimWord(word) {
  return word.trim();
}

function applyFilters(prev,next) {
  if (filters[next]) {
    //return filters[next].call(null,prev);
    return filters[next](prev);
  }
  return prev;
}

var input = 'name | deslugify | uppercase'; // JUANMA GARRIDO

var sections = input.split('|').map(trimWord)
var ref = person[sections[0]]
var output = sections
              .slice(1)
              .reduce(applyFilters, ref);

console.log (output);
