import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type Todo = {
    id: number;
    text: string;
}

type TodoStore = {
    todos: Todo[];
    addTodo: (text: string) => void;
    removeTodo: (id: number) => void;
}

export const useTodoStore = create<TodoStore>()(devtools((set) => ({
    todos: [],
    addTodo: (text) => set(state => ({ todos: [...state.todos, { id: state.todos.length + 1, text }] })),
    removeTodo: (id) => set(state => ({ todos: state.todos.filter(todo => todo.id !== id) })),
})));