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
import TodoComponent from "./components/Todo";

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
    <div className="bg-slate-100 h-screen flex flex-col justify-center items-center">
      <h1 className="font-bold text-5xl uppercase text-gray-800 font-mono">
        Todo List
      </h1>
      <div className="my-4 p-2]">
        <form onSubmit={createTodo} className="space-x-1">
          <div className="flex border-b-2">
            <input
              className="border-none focus:ring-0 bg-slate-100 placeholder:text-gray-400"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="I need to do..."
            />
            <button className="">Add Todo</button>
          </div>
        </form>
      </div>
      <div>
        <ul className="">
          {todos.map((todo, index) => (
            <TodoComponent
              key={index}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
