import { getDocs, collection, addDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db, auth } from "../../util/firebase";
import { onAuthStateChanged } from "firebase/auth";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [todo, setTodo] = useState();
  const [todos, setTodos] = useState([]);
  const todoCollectionRef = collection(db, "todos");

  const getListOfTodos = async () => {
    const data = await getDocs(todoCollectionRef);
    const todos = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    console.log({ todos });
    setTodos(todos);
  };

  const addTodo = async (e) => {
    e.preventDefault();
    await addDoc(todoCollectionRef, {
      name: todo,
      uid: auth?.currentUser?.uid,
    });
    getListOfTodos();
  };

  useEffect(() => {
    getListOfTodos();

    const listener = onAuthStateChanged(auth, async (user) => {
      setIsAuthenticated(Boolean(user));
    });

    return () => {
      listener();
    };
  }, []);

  return (
    <div>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Add todo
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={addTodo}>
              <div>
                <label
                  htmlFor="todo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Todo
                </label>
                <div className="mt-2">
                  <input
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                    id="todo"
                    name="todo"
                    type="todo"
                    autoComplete="current-todo"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add todo
                </button>
              </div>
            </form>
            <br />
            <h1>Todos</h1>
            <ul className="divide-y divide-gray-200">
              {isAuthenticated &&
                todos
                  .filter((todo) => todo.uid === auth.currentUser.uid)
                  .map((todo) => {
                    return (
                      <li
                        key={todo.id}
                        className="relative bg-white py-5 px-4 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 hover:bg-gray-50"
                      >
                        <div className="flex justify-between space-x-3">
                          <div className="min-w-0 flex-1">
                            <a href="#" className="block focus:outline-none">
                              <span
                                className="absolute inset-0"
                                aria-hidden="true"
                              />
                              <p className="truncate text-sm font-medium text-gray-900">
                                {todo.name}
                              </p>
                            </a>
                          </div>
                        </div>
                      </li>
                    );
                  })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
