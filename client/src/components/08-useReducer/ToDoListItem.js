

import React from 'react'

export const ToDoListItem = ({ toDo, i, handleDelete, handleToggle }) => {
    return (
        <li
            className='list-group-item'
        >
            <p
                className={`${toDo.done && 'complete'}`}
                onClick={() => handleToggle(toDo.id)}
            > {i + 1}. {toDo.desc}
            </p>

            <button
                className='btn btn-danger'
                onClick={() => handleDelete(toDo.id)}
            >Borrar</button>
        </li>
    )
}
