import { useState } from 'react';
import { useTodoStore } from '../store/useTodoStore';


const TodoList = () => {
  const [todoText, setTodoText] = useState('');
  const { todos, addTodo, removeTodo } = useTodoStore((state) => state);

  const emojiMap: { [key: string]: string } = {
    eat: '🍔',
    sleep: '🛏️',
    exercise: '🏋🏽',
    code: '💻',
    read: '📚',
    write: '✍️',
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  const handleAddTodo = () => {
    const unkwonEmoji = '🤷‍♂️';
    const mappedText =
      emojiMap[todoText?.toLowerCase()] || `${todoText} ${unkwonEmoji}`;
    if (mappedText.trim()) {
        addTodo(mappedText);
        setTodoText('');
    }
  };

  const handleRemoveTodo = (id: number) => {
    removeTodo(id);
  };

  return (
    <div>
      <em>Made with Zustand</em>
      <h1>Emoji Todo List</h1>
    <input
      type='text'
      value={todoText}
      onChange={(e) => setTodoText(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder='Add a new todo'
    />
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => handleRemoveTodo(todo.id)}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
