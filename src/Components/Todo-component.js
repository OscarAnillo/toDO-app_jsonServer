import { useState } from "react";

export const TodoComponent = () => {
  const [userInput, setUserInput] = useState("");
  const [dataList, setDataList] = useState([]);

  const changeHandler = (e) => {
    setUserInput(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!userInput) {
      alert("Please a to do activity");
      return;
    }
    setDataList([...dataList, { id: dataList.length, toDo: userInput }]);
    setUserInput("");
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
        </div>
      ))}
    </div>
  );
};
