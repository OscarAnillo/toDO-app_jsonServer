import { useState, useEffect } from "react";

import axios from "axios";

export const TodoComponent = () => {
  const [userInput, setUserInput] = useState("");
  const [dataList, setDataList] = useState([]);

  const changeHandler = (e) => {
    setUserInput(e.target.value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3005/posts")
      .then((res) => {
        setDataList(res.data);
      })
      .catch(console.log);
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!userInput) {
      alert("Please add a to do activity");
      return;
    }
    let newTodo = { toDo: userInput };
    axios
      .post("http://localhost:3005/posts", newTodo)
      .then((res) => {
        setDataList(dataList.concat(res.data));
        setUserInput("");
      })
      .catch(console.log);
  };

  const clickHandlerDelete = (id) => {
    axios.delete(`http://localhost:3005/posts/${id}`).then((res) => {
      console.log(res.data);
      const todos = dataList.filter((todo) => todo.id !== id);
      setDataList(todos);
    });
  };

  return (
    <div className="div-todo">
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Add a thing to do"
          value={userInput}
          onChange={changeHandler}
        />
        <button type="submit">Send</button>
      </form>
      {dataList.map((item) => (
        <div key={item.id} className="div-map">
          <li>{item.toDo}</li>
          <button onClick={() => clickHandlerDelete(item.id)}>x</button>
        </div>
      ))}
    </div>
  );
};
