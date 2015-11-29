function titleWord(w) {
  return w.charAt(0).toUpperCase() + w.slice(1);
}

function titleCase(string) {
  return string.split(' ').map(titleWord).join(' ');
}

console.log( titleCase('juanma garrido') );