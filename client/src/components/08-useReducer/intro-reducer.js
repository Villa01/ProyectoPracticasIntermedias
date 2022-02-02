

const initialState = [
    {   
        id: 1,
        desc: 'Comprar pan',
        done: false
    }
];

const toDoReducer = ( state = initialState, action) => {

    if ( action?.type === 'agregar'){
        return [...state, action.payload];
    }
}
let toDos = toDoReducer();

const newTodo = {   
    id: 2,
    desc: 'Guardar pan',
    done: false
}

const action = {
    type: 'agregar',
    payload: newTodo // Normalmente se le llama payload
}

toDos = toDoReducer( toDos, action );

console.log(toDos);