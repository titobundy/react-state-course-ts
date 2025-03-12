import { createReducer } from '@reduxjs/toolkit';
import { addTodo, removeTodo } from './actions';

type Todo = {
  id: number;
  text: string;
};

type TodosState = Todo[];

const initialState: TodosState = [];

const todoReducer = createReducer(initialState, (builder) =>{
    builder
        .addCase(addTodo, (state, action) => {
            state.push({ id: state.length + 1, text: action.payload });
        })
        .addCase(removeTodo, (state, action) => {
            state = state.filter((todo) => todo.id !== action.payload);
        });
});

export default todoReducer;
