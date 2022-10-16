# Хеш таблица
    
    //Подключение
    const {HashMap} = require('../dist');
    
    // Создание хеш таблицы. В конструктор передается простое число начальной емкости.
    const map = new HashMap(3);
    // const map = new HashMap(12); // Error
    
    // Установка значений
    // В качестве ключей принимаеются строки и числа (или их комбинация)
    // При достижении 3 коллизий по одному значению таблица увеличивается в размере и происходит рехеширование
    // map.set(key, value);
    map.set('name', 'Albert');
    map.set('age', 35);
    map.set('skills', ['JS', 'PHP']);
    // map.set('<asdfe>', 'Albert 645') // Error
    
    // Получение значений
    // map.get(key)
    // console.log(map.get('name'))
    // console.log(map.get('age'))
    // console.log(map.get('skills'))
    // console.log(map.get('123')) // Error
    
    // Итераторы по ключам и значениям
    // console.log([...map.keys()])
    // console.log([...map.values()])

    // Текущая емкость таблицы 
    console.log(map.capacity)
