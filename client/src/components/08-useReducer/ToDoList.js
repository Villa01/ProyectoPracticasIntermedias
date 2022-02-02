

import React from 'react'
import { ToDoListItem } from './ToDoListItem'

export const ToDoList = ({ toDos, handleToggle, handleDelete }) => {
    console.log("efeee");
    console.log(toDos);
    console.log("efe222")

    return (
        <ul className='list-group list-group-flush'>
            {
                toDos.map((toDo, i) => (
                    <ToDoListItem
                        key={toDo.id}
                        toDo={toDo}
                        i={i}
                        handleDelete={handleDelete}
                        handleToggle={handleToggle}
                    />
                ))
            }
        </ul>
    )
}
