import fs from 'fs'

process.stdout.write("\u001b[2J\u001b[0;0H");

var output = fs.readFileSync('data.txt', 'utf8')
  .trim()
  .split('\n')
  .map(line => line.split('|'))
  .reduce((customers, line) => {
    customers[line[0]] = customers[line[0]] || [];
    customers[line[0]].push({
      name: line[1],
      price: line[2],
      qunatity: line[3]
    })
    return customers
  },{})

console.log ('output', JSON.stringify(output, null, 2) );


/*
{
  'mark johansson' : [
    { name: 'waffle iron',  price: '80',    quantity: '2' },
    { name: 'blender',      price: '200',   quantity: '1' },
    { name: 'knife',        price: '10',    quantity: '4' }
  ],
  'Nikita Smith' : [
    { name: 'waffle iron',  price: '80',    quantity: '1' },
    { name: 'knife',        price: '200',   quantity: '2' },
    { name: 'pot',          price: '10',    quantity: '3' }
  ]
}
*/


//console.log (data);