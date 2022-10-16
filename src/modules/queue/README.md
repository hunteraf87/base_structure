# Очереди

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