# Динамический массив на основе вектора

    // Подключение
    const {DynamicArrayVector} = require('../dist');
    
    // Создание массива. В конструкторе указывает начальная емкость массива.
    const dynamicArray = new DynamicArrayVector();
    // const dynamicArray = new DynamicArrayVector(5);
    
    // Заполнение массива. При достижении массивом указанной емкости, емкость массив будет
    // увеличена в 2 раза
    for (let i = 1; i <= 10; i++) {
        dynamicArray.push(i) // Добавление элемента в конец
    }
    
    // Получение значения
    console.log(dynamicArray.get(5)) // 6
    // console.log(dynamicArray.get(11)) // Error
    
    // console.log(dynamicArray.length) // Длина массива
    // console.log(dynamicArray.capacity) // Емкость массива
    
    // Сам массив является итерируемым
    console.log([...dynamicArray]) 