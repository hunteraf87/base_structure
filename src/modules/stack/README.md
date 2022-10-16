
# Лимитированный стек

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