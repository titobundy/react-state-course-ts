import { createReducer } from '@reduxjs/toolkit';
import { addTodo, removeTodo } from './actions';

export type Todo = {
  id: number;
  text: string;
};

export type TodosState = Todo[];

const initialState: TodosState = [];

const todoReducer = createReducer(initialState, (builder) =>{
    builder
        .addCase(addTodo, (state, action) => {
            state.push({ id: state.length + 1, text: action.payload });
        })
        .addCase(removeTodo, (state, action) => {
            return state.filter((todo) => todo.id !== action.payload);
        });
});

export default todoReducer;
