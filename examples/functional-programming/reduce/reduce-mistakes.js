process.stdout.write("\u001b[2J\u001b[0;0H");

var data = ["vote1", "vote2", "vote1", "vote2"];
function reducer(accumulator, value) {
  if (accumulator[value]) {
    accumulator[value] = accumulator[value] + 1;
  } else {
    accumulator[value] = 1;
  }
  // RULE 1: Always return the accumulator!!
  return accumulator;
}

// RULE 1: Always pass an initial value of the accumulator !!
var tally = data.reduce(reducer, {});

// var tally = data.reduce(reducer);

console.log(tally);