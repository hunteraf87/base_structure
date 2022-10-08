const {Structure} = require('../dist');

const structure = new Structure(['name', 'age', 'prof']);

structure.set('name', 'Alex');

console.log('name: ', structure.get('name'));

structure.set('name', 'Bob');
structure.set('age', 35);
structure.set('prof', test);

console.log('name: ', structure.get('name'));
console.log(structure.get('age'));
console.log(structure.get('prof'));