process.stdout.write("\u001b[2J\u001b[0;0H");

var data = [15, 30, 20];

var reducer = function(accumulator, item) {
  return accumulator + item;
};

var initialValue = 0;

var total = data.reduce(reducer, initialValue);

console.log("The sum is", total);