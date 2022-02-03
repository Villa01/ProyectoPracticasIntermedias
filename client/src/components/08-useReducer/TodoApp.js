import React, { useEffect, useReducer } from 'react';
import { toDoReducer } from './toDoReducer';
import { ToDoList } from './ToDoList';
import { AddToDoForm } from './AddToDoForm';
import './styles.css';



const baseUrl = 'http://localhost:5000';

export const TodoApp = () => {
    // const [ toDos, dispatch ] = useReducer(toDoReducer, initialState);

    const [toDos, dispatch] = useReducer(toDoReducer, []);

    useEffect(() => {

        function fetchToDos() {
            fetch(`${baseUrl}/getToDos`)
            .then( resp => {
                return resp.json();
            }).then( toDos => {
                toDos.forEach(newToDo => {
                    dispatch({
                        type: 'add',
                        payload: newToDo
                    });
                });
            });        
        }

        fetchToDos();

    }, []);

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
            dispatch({
                type: 'add',
                payload: newToDo
            });
            alert('Tarea agregada correctamente');
        }).catch(err => {
            console.log(err);
        });
    }


    const handleToggle =  toDo => {

        fetch(`${baseUrl}/updateToDo`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(toDo),
        }).then(resp => {
            return resp.json();
        }).then(() => {
            dispatch({
                type: 'toggle',
                payload: toDo.id
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