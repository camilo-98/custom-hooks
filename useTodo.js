import { useEffect, useReducer } from "react";
import { todoReducer } from '../08-useReducer/todoReducer';

const initialState = [
    /* {
        id: new Date().getTime(),
        description: 'Recolectar',
        done: false,
    },
    {
        id: new Date().getTime() + 10,
        description: 'Coger',
        done: false,
    }  */
];

const init = () => {
    return JSON.parse( localStorage.getItem('todos') || [] );
}


export const useTodo = () => {

    const [ todos, dispatchTodo ] =useReducer( todoReducer, initialState, init );

    useEffect(()=>{
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos])

    const handleNewTodo = ( todo ) => {
        const action = {
            type: '[TODO] add todo',
            payload: todo
        }

        dispatchTodo( action );
    }

    const handleDeleteTodo = ( id ) => {
        dispatchTodo({
            type: '[TODO] remove todo',
            payload: id,
        })
    }

    const handleToogleTodo = ( id ) => {
        dispatchTodo({
            type: '[TODO] toogle todo',
            payload: id,
        })
    }

    const todosCount = todos.length;

    const pendingTodosCount = todos.filter(todo=>!todo.done).length;

    return {
        todos,
        pendingTodosCount,
        todosCount,
        handleNewTodo,
        handleDeleteTodo,
        handleToogleTodo,

    }

}