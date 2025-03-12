import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { addTodo, removeTodo } from '../features/todos/actions';
import { TodosState } from '../features/todos/reducers';

const TodoList: React.FC = () => {
  const [todoText, setTodoText] = useState('');
  const dispatch: AppDispatch = useDispatch<AppDispatch>();
  const todos = useSelector<RootState>((state: RootState) => state.todos) as TodosState;

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
      dispatch(addTodo(mappedText));
      setTodoText('');
    }
  };

  const handleRemoveTodo = (id: number) => {
    dispatch(removeTodo(id));
  };

  return (
    <div>
      <em>Made with Redux Toolkit</em>
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
          <li key={todo.id} onClick={() => handleRemoveTodo(todo.id)}>
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
