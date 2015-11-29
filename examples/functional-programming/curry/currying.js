
process.stdout.write("\u001b[2J\u001b[0;0H");

let dragon =
  name =>
    size =>
      element =>
         name + ' is a ' +
        size + ' dragon that breathes ' +
        element + '!'

let fluffykinsDragon = dragon('fluffykins');
let tinyDragon = fluffykinsDragon('tiny');

console.log( dragon('fluffykins')('tiny')('lightning') )
console.log( fluffykinsDragon('tiny')('lightning') )
console.log( tinyDragon('lightning') )

/*
let dragon = (name, size, element) =>
  name + ' is a ' +
  size + ' dragon that breathes ' +
  element + '!'

console.log(dragon('fluffykins', 'tiny', 'lightning'))
*/