import React, { useReducer, useState } from 'react';

type Todo = {
  id: number;
  text: string;
};

type State = {
  todos: Todo[];
};

type Action =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'REMOVE_TODO'; payload: number };

const initialState: State = {
  todos: [],
};

const emojiMap: { [key: string]: string } = {
  eat: '🍔',
  sleep: '🛏️',
  exercise: '🏋🏽',
  code: '💻',
  read: '📚',
  write: '✍️',
};

const todoReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        todos: [
          ...state.todos,
          { id: state.todos.length + 1, text: action.payload },
        ],
      };
    case 'REMOVE_TODO':
      return {
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    default:
      return state;
  }
};

const TodoList: React.FC = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [text, setText] = useState('');
  const unkwonEmoji = '🤷‍♂️';

  const handleAddTodo = (text: string) => {
    const mapppedText = emojiMap[text.toLowerCase()] || `${text} ${unkwonEmoji}`;
    if (mapppedText.trim()) {
      dispatch({ type: 'ADD_TODO', payload: mapppedText });
      setText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTodo(text);
    }
  };

  return (
    <div>
      <em>Made with useReducer</em>
      <h1>Emoji Todo List</h1>
    <datalist id="emoji-options">
      {Object.keys(emojiMap).map((key) => (
        <option key={key} value={key}>
        {emojiMap[key]} {key}
        </option>
      ))}
    </datalist>
    <input
      type='text'
      value={text}
      onKeyDown={handleKeyDown}
      onChange={(e) => {
        setText(e.target.value);
        if (Object.keys(emojiMap).includes(e.target.value.toLowerCase())) {
            handleAddTodo(e.target.value);
        }
      }}
      placeholder='Add a new todo'
      list="emoji-options"
    />
      <ul>
        {state.todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => dispatch({ type: 'REMOVE_TODO', payload: todo.id })}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
