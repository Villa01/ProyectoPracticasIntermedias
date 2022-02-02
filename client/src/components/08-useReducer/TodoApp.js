import React, { useEffect, useReducer } from 'react';
import { toDoReducer } from './toDoReducer';
import { ToDoList } from './ToDoList';
import { AddToDoForm } from './AddToDoForm';
import request from 'superagent';
import './styles.css';


// const initialState = [
//     {
//         id: new Date().getTime(),
//         desc: 'aprender React',
//         done: false
//     }
// ];

const baseUrl = 'http://localhost:5000';


const init = () => {
    // const todos = JSON.parse( localStorage.getItem('toDos') );
    // return todos ? todos : [];
    return [];

}


export const TodoApp = () => {
    // const [ toDos, dispatch ] = useReducer(toDoReducer, initialState);

    const [toDos, dispatch] = useReducer(toDoReducer, [], init);

    useEffect(() => {

        async function fetchToDos() {
            const response = await fetch(`${baseUrl}/getToDos`)
            response = await response.json();
            
            response.forEach(newToDo => {
                dispatch({
                    type: 'add',
                    payload: newToDo
                });
            });
        }

        fetchToDos();

    }, [toDos])

    const handleDelete = (toDoId) => {

        const action = {
            type: 'delete',
            payload: toDoId
        }

        dispatch(action);
    }

    const handleAddToDo = newToDo => {
        dispatch({
            type: 'add',
            payload: newToDo
        });

    }


    const handleToggle = toDoId => {
        dispatch({
            type: 'toggle',
            payload: toDoId
        })

    }

    return (
        <>
            <h1>TodoApp ({toDos.length})</h1>
            <hr />

            <div className='row'>
                <div className='col-7'>
                    <ToDoList
                        toDos={toDos}
                        handleDelete={handleDelete}
                        handleToggle={handleToggle}
                    />
                </div>
                <div className='col'>
                    <AddToDoForm
                        handleAddToDo = { handleAddToDo }
                    />
                </div>
            </div>

        </>
    )
}