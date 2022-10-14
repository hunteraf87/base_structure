# Базовые структуры данных

## Связанный список

    const {LinkedList} = require('../dist')

    const list = new LinkedList(); // Создание списка
    
    console.log('is empty', list.isEmpty()) // Проверка на пустоту
    
    list.add(1) // Добавление элемента
    list.add(2)
    list.add(3)

    // Обращение к элементам списка. У элементов доступны геттеры next и prev
    // first и last первый и последний элементы списка
    console.log(list.first.value) // 1
    console.log(list.last.value) // 3
    console.log(list.first.next.value) // 2
    console.log(list.first.next.prev.value) // 1

    // Поиск элемента
    const find2 = list.find(2); // LinkedListItem
    // console.log('find no strict 2: ', list.find('2', false)) // LinkedListItem
    // console.log('find 5: ', list.find(5)) // null

    // Вставка элемента перед другим элементом/знечением
    // list.insertBefore(1.5, find2)
    // list.insertBefore(1.5, 2)
    // list.insertBefore(0.5, list.first)

    // Вставка элемента после другого элемента/значения
    // list.insertAfter(2.25, find2)
    // list.insertAfter(2.25, 2)
    // list.insertAfter(3.25, list.last)
    
    // Удаление элемента/значения
    // list.delete(3.25)
    // list.delete(list.first)

    // list.items итератор по элемента с начала списка
    // list.reverseItems итератор по элемента с конца списка
    // list.values итератор по значениям с начала списка
    // list.reverseValues итератор по значениям с конца списка

## Простая очередь на основе списка

    const {SimpleQueue} = require('../dist')

    const queue = new SimpleQueue();  // Создание очереди
    
    // Добавление элемента
    queue.push(1);
    queue.push(2);
    queue.push(3);
    
    // Геттер head получает значение очереди для извлечения
    // console.log(queue.head) // 1

    // Извлечение значения из очереди
    // console.log(queue.shift()) // 1
    // console.log(queue.shift()) // 2
    // console.log(queue.shift()) // 3
    // console.log(queue.shift()) // Exception
    
    // queue.values итератор по значениям

## Двухстороння очередь

    const {DoubleQueue} = require('../dist')

    const queue = new DoubleQueue(); // Создание очереди

    // Добавление элемента в конец очереди
    queue.push(1);
    queue.push(2);
    queue.push(3);

    // Геттер head получает значение очереди с начала
    console.log(queue.head) // 1
    // Геттер back получает значение очереди с конца
    console.log(queue.back) // 3

    queue.unshift(0); // Вставка элемента в начало очереди
    console.log(queue.shift()) // 0 Извлечение элемента из начала очереди
    console.log(queue.pop()) // 3 Извлечение элемента из коца очереди
    // console.log(queue.shift()) // 1 
    // console.log(queue.shift()) // 2
    // console.log(queue.shift()) // Exception
    
    // queue.values итератор по значениям

## Лимитированный стек

    const {LimitedStack} = require("../dist");
    
    const stack = new LimitedStack(3); // Создание стека с лимитом
    
    // Значение головы стэка
    // console.log(stack.head) // null
    
    // Добавление элементов
    stack.push(1);
    // console.log(stack.head) // 1
    stack.push(2);
    stack.push(3);
    // stack.push(4); // Error - stack overflow
    
    // console.log(stack.count) // 3 Количество элементов в стеке
    // console.log(stack.limit) // 3 Лимит стека
    
    // Извлечение элемента
    console.log(stack.take()) // 3
    // console.log(stack.take()) // 2
    // console.log(stack.take()) // 1
    // console.log(stack.take()) // Error - stack is empty
    
    // stack.values итератор по значениям

## Структура (на основе кодогенерации)

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

## Динамический массив на основе связанного списка массивов

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

## Динамический массив на основе вектора

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

