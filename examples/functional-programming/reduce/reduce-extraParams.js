process.stdout.write("\u001b[2J\u001b[0;0H");

function reducer(accumulator, value, index, array) {
  var intermediaryValue = accumulator + value;

  // if is the last element of the array
  // let's return another thing
  if (index === array.length - 1) {
    return intermediaryValue / array.length;
  }

  return intermediaryValue;
}

var data = [1, 2, 3, 3, 4, 5, 3, 1];
var mean = data.reduce(reducer, 0);

console.log(mean);