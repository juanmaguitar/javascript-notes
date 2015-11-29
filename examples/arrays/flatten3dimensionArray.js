/*
exchanges // 1st level array
  |- exchange (item)
      |- name
      |- stocks // 2nd level array
          |- stock (item)
              |- symbol
              |- closes // 3rd level array
                  |- close (item)
                      |- date
                      |- price
*/

var exchanges = [
  {
    name: "NYSE",
    stocks: [
      {
        symbol: "XFX",
        closes: [
          { date: new Date(2014,11,24), price: 240.10 },
          { date: new Date(2014,11,23), price: 232.08 },
          { date: new Date(2014,11,22), price: 241.09 }
        ]
      },
      {
        symbol: "TNZ",
        closes: [
          { date: new Date(2014,11,24), price: 521.24 },
          { date: new Date(2014,11,23), price: 511.00 },
          { date: new Date(2014,11,22), price: 519.29 }
        ]
      },
    ]
  },
  {
    name: "TSX",
    stocks: [
      {
        symbol: "JXJ",
        closes: [
          { date: new Date(2014,11,24), price: 423.22 },
          { date: new Date(2014,11,23), price: 424.84 },
          { date: new Date(2014,11,22), price: 419.72 }
        ]
      },
      {
        symbol: "NYN",
        closes: [
          { date: new Date(2014,11,24), price: 16.82 },
          { date: new Date(2014,11,23), price: 16.12 },
          { date: new Date(2014,11,22), price: 15.77 }
        ]
      },
    ]
  }
];

Array.prototype.concatAll = function() {
  var results = [];

  this.forEach(function(subArray) {
    subArray.forEach(function(item) {
      results.push(item);
    });
  });

  return results;
};

//[1,2,3].map(function(num) { return num + 1; }) -> [2,3,4]
//[1,2].map(function(num) { return [num + 1, num + 2]; }) -> [[2,3],[3,4]]

function isDecember(date) { return date.getMonth() === 11; }
function is24th(date) { return date.getDate() === 24; }

// 3 dimensions array --> 2 concatAll

var christmasEveCloses =
  exchanges.
    map(function(exchange) {
      return exchange.stocks.
        map(function(stock) {
          return stock.closes.
            filter(function(close) {
              return isDecember(close.date) && is24th(close.date);
            }).
            map(function(close) {
              return {
                symbol: stock.symbol,
                price: close.price
              };
            });
        }).
        concatAll(); // filtered closed stocks concatenated per stock
    }).
    concatAll(); // filtered closed stocks concatenated per exchange

christmasEveCloses.forEach(function(christmasEveClose) {
  console.log(christmasEveClose);
});