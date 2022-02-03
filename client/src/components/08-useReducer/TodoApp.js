import React, { useEffect, useReducer } from 'react';
import { toDoReducer } from './toDoReducer';
import { ToDoList } from './ToDoList';
import { AddToDoForm } from './AddToDoForm';
import './styles.css';



const baseUrl = 'http://localhost:5000';


const init = async () => {
    return [];
}


export const TodoApp = () => {
    // const [ toDos, dispatch ] = useReducer(toDoReducer, initialState);

    const [toDos, dispatch] = useReducer(toDoReducer, [], init);

    useEffect(async() => {

        await fetch(`${baseUrl}/getToDos`)
        .then(res => {
            console.log(res);
            return res.json();
        })
        .then(toDos => {
            console.log(toDos);
            dispatch({
                type: 'add',
                payload: toDos
            })
        }).catch(err => console.error)

    }, [])

    const handleDelete = (toDoId) => {

        fetch(`${baseUrl}/deleteToDo`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ toDoId }),
        }).then(resp => {
            return resp.json();
        }).then(() => {
            const action = {
                type: 'delete',
                payload: toDoId
            }

            dispatch(action);
        }).catch(err => {
            console.log(err);
        });

    }

    const handleAddToDo = async newToDo => {
        await fetch(`${baseUrl}/addToDo`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newToDo),
        }).then(resp => {
            console.log(resp);
        }).then(() => {
            dispatch({
                type: 'add',
                payload: newToDo
            });
            alert('Tarea agregada correctamente');
        }).catch(err => {
            console.log(err);
        });
    }


    const handleToggle = toDoId => {

        fetch(`${baseUrl}/updateToDo`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ toDoId }),
        }).then(resp => {
            return resp.json();
        }).then(() => {
            dispatch({
                type: 'toggle',
                payload: toDoId
            });
        }).catch(err => {
            console.log(err);
        });

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
                        handleAddToDo={handleAddToDo}
                    />
                </div>
            </div>

        </>
    )
}