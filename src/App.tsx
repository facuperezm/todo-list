import React from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const App = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [input, setInput] = React.useState("");

  React.useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr: Todo[] = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({
          id: doc.id,
          text: doc.data().text,
          completed: doc.data().completed,
        });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  // creating a todo
  const createTodo = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (input === "") {
      alert("Please enter a valid todo");
      return;
    }
    await addDoc(collection(db, "todos"), {
      text: input,
      completed: false,
    });
    setInput("");
  };

  // update a todo
  const toggleComplete = async (todo: Todo): Promise<void> => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };

  // delete a todo
  const deleteTodo = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <form onSubmit={createTodo}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Add Todo"
          />
          <button>Add Todo</button>
        </form>
      </div>
      <div>
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              <div>
                <input
                  onChange={() => toggleComplete(todo)}
                  type="checkbox"
                  checked={todo.completed}
                />
                <p onClick={() => toggleComplete(todo)}>{todo.text}</p>
              </div>
              <button onClick={() => deleteTodo(todo.id)}>Delete Todo</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
