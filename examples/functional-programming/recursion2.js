process.stdout.write("\u001b[2J\u001b[0;0H");

let categories = [
  { id: 'animals', 'parent': null },
  { id: 'mammals', 'parent': 'animals' },
  { id: 'cats', 'parent': 'mammals' },
  { id: 'dogs', 'parent': 'mammals' },
  { id: 'chihuaha', 'parent': 'dogs' },
  { id: 'labrador', 'parent': 'dogs' },
  { id: 'persian', 'parent': 'cats' },
  { id: 'siamese', 'parent': 'cats' }
]

let makeTree = (categories, parent) => {
  let node = {}
  categories
    .filter(c => c.parent === parent)
    .forEach(c =>
      node[c.id] = makeTree(categories,c.id))
  return node
}

console.log(
  JSON.stringify(
    makeTree(categories,null)
    ,null, 2)
)

/*
{
  animals: {
    mammals: {
      dogs: {
        chihuaha: null
        labrador: null
      },
      cats: {
        persian: null,
        siamese: null
      }
    }
  }
}
*/