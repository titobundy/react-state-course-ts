import { createAction } from "@reduxjs/toolkit";

export const addTodo = createAction<string>("todos/add");
export const removeTodo = createAction<number>("todos/remove");