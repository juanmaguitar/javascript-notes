process.stdout.write("\u001b[2J\u001b[0;0H");

var orders = [
  { amount: 250 },
  { amount: 400 },
  { amount: 100 },
  { amount: 325 },
]

var totalAmount = orders.reduce((sum, order) => sum + order.amount,0)

/*
var totalAmount = orders.reduce(function(sum, order) {
  return sum + order.amount;
},0)
*/

/*
var totalAmount = 0
for (var i = 0; i < orders.length; i++) {
  totalAmount += orders[i].amount;
}
*/

console.log(totalAmount);