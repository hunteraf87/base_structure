# Структура (на основе кодогенерации)

    const {Structure} = require('../dist');
    
    // Создание структуры
    const structure = new Structure(['name', 'age', 'prof']);
    // Создание структуры со значениями
    // const structure = new Structure(['name', 'age', 'prof'], ['Alex', 21, false]);
    
    // Установка значения
    structure.set('name', 'Alex');
    
    // Получение значения
    console.log('name: ', structure.get('name')); // 'Alex'
    
    structure.set('name', 'Bob');
    structure.set('age', 35);
    structure.set('prof', true);
    
    console.log('name: ', structure.get('name')); // 'Bob'
    console.log(structure.get('age')); // 35
    console.log(structure.get('prof')); // true