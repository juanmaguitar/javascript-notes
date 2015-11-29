process.stdout.write("\u001b[2J\u001b[0;0H");

// import _ from 'lodash'

let dragons = [
  { name: 'fluffykins',   element: 'lightning'  },
  { name: 'noomi',        element: 'lightning'  },
  { name: 'karo',         element: 'fire'  },
  { name: 'doomer',       element: 'timewarp'  }
]

/*
let hasElement =
  _.curry((element, obj) => obj.element === element) // now returns a function and not a result

let lightningDragons =
  dragons.filter(hasElement('lightning'))
*/


let hasElement =
  (element, obj) => obj.element === element

let lightningDragons =
  dragons.filter(x => hasElement('lightning', x))


console.log(lightningDragons)