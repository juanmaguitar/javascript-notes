process.stdout.write("\u001b[2J\u001b[0;0H");

var data = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

/*
var flattenedData = data
  .reduce(function(acc, value) {
    return acc.concat(value);
  }, []);
*/

/* ---- Flat Array ---- */

var flattenedData = data
      .reduce( (acc, value) => acc.concat(value), [] )

console.log ( flattenedData );

/* ---- Flat Map ---- */

var input = [
  {
    title: "Batman Begins",
    year: 2005,
    cast: [
      "Christian Bale",
      "Michael Caine",
      "Liam Neeson",
      "Katie Holmes",
      "Gary Oldman",
      "Cillian Murphy"
    ]
  },
  {
    title: "The Dark Knight",
    year: 2008,
    cast: [
      "Christian Bale",
      "Heath Ledger",
      "Aaron Eckhart",
      "Michael Caine",
      "Maggie Gyllenhal",
      "Gary Oldman",
      "Morgan Freeman"
    ]
  },
  {
    title: "The Dark Knight Rises",
    year: 2012,
    cast: [
      "Christian Bale",
      "Gary Oldman",
      "Tom Hardy",
      "Joseph Gordon-Levitt",
      "Anne Hathaway",
      "Marion Cotillard",
      "Morgan Freeman",
      "Michael Caine"
    ]
  }
];


var stars = input
  .reduce(function(acc, value) {
    value.cast.forEach(function(star) {
      if (acc.indexOf(star) === -1) {
        acc.push(star);
      }
    });
  return acc;
}, []);

console.log(stars);

var data = [1, 2, 3, 4, "5"];
var sum = data.reduceRight(function(acc, value, index) {
  console.log(index);
  return acc + value;
}, 0);

console.log(sum);
