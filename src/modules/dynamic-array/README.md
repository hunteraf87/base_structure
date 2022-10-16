# Динамический массив на основе связанного списка массивов

    // Подключение
    const {DynamicArray} = require('../dist');
    
    // Создание массива. В конструкторе можно указать емкость чанка массива. По умолчанию 10
    const dynamicArray = new DynamicArray(5);
    // const dynamicArray = new DynamicArray();
    
    // console.log('length: ', dynamicArray.length) // Длина массива
    // console.log('capacityChunk: ', dynamicArray.capacityChunk) // емкость чанка массива
    // console.log('is empty: ', dynamicArray.isEmpty) // Проверка на пустоту
    
    for (let i = 1; i <= 12; i++) {
        dynamicArray.push(i) // Добавление элемента в конец
    }
    
    // console.log('pop: ', dynamicArray.pop()) // Удалить последний элемент и вернуть его значение
    
    // dynamicArray.set(11, 123) // Установка значения элемента по индексу
    
    // dynamicArray.unshift(789); // Добавление элемента в начало массива
     
    // console.log(dynamicArray.shift()) // Удалить первый элемент массиа и вернуть его значение
    
    // Удаление и добавление элементов в массиве
    // splice(idx, countDelete, insertArray)
    // idx - индекс с которого производится действие
    // countDelete - количество удаляемых элементов
    // insertArray - массив добавляемых элементов
    // dynamicArray.splice(3, 0, [313,314,315])
    // dynamicArray.splice(3, 3, [313,314,315])
    // dynamicArray.splice(3, 3)
    // dynamicArray.splice(3, 3, [313,314,315,316,317])
    // dynamicArray.splice(3, 5, [313,314,315])
    
    // console.log(`get ${1}: `, dynamicArray.get(1)) // Получение элемента по индексу
    // console.log(`get ${111}: `, dynamicArray.get(111)) // Error