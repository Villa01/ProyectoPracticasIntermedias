import React from 'react'

import { useForm } from '../../hooks/useForm';

export const AddToDoForm = ({ handleAddToDo }) => {

    const [formValues, handleInputChange, reset] = useForm({
        description: ''
    });

    const { description } = formValues;

    const handleSubmit = e => {
        e.preventDefault();

        if (description.trim().length <= 1) {
            return;
        }

        const newToDo = {
            id: new Date().getTime(),
            desc: description,
            done: false
        }

        handleAddToDo( newToDo );
        reset();

    }

    return (
        <>
            <h4>Agregar TODO</h4>
            <hr />

            <form
                onSubmit={handleSubmit}
            >
                <input
                    autoComplete='off'
                    className='form-control'
                    name='description'
                    placeholder='Descripcion'
                    type="text"
                    value={description}
                    onChange={handleInputChange}
                />
                <button
                    type='submit'
                    className='btn btn-outline-primary mt-1'
                >
                    Agregar
                </button>
            </form>
        </>
    )
}
