process.stdout.write("\u001b[2J\u001b[0;0H");

// ------------------------------------------

var data = [1, 2, 3];
var doubled = data.reduce(function(acc, value) {
  acc.push(value * 2);
  return acc;
}, []);

var doubleMapped = data.map(function(item) {
  return item * 2;
});

console.log(doubled);
console.log(doubleMapped)

// ------------------------------------------

var data2 = [1, 2, 3, 4, 5, 6];
var evens = data2.reduce(function(acc, value) {
  if (value % 2 === 0) {
    acc.push(value);
  }

  return acc;
}, []);

var evenFiltered = data2.filter(function(item) {
  return (item % 2 === 0);
});

console.log(evens);
console.log(evenFiltered);

// ------------------------------------------

var filterMapped = data2.
  filter(function(value) {
    return value % 2 === 0;
  })
  .map(function(value) {
    return value * 2;
  });

console.log(filterMapped);

// ------------------------------------------

var bigData = [];
for (var i = 0; i < 1000000; i++) {
  bigData[i] = i;
}

console.time('bigData');
var filterMappedBigData = bigData.filter(function(value) {
  return value % 2 === 0;
}).map(function(value) {
  return value * 2;
});
console.timeEnd('bigData');

console.time('bigDataReduce');
var reducedBigData = bigData.reduce(function(acc, value) {
  if (value % 2 === 0) {
    acc.push(value * 2);
  }
  return acc;
}, []);
console.timeEnd('bigDataReduce');