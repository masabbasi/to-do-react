import React from "react";
import { useState } from "react";
import { BiMessageAdd } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { MdDone, MdDoneAll } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";

const Form = () => {
  const [inputValue, setInputValue] = useState({
    todo: "",
  });

  const [todo, setToDo] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    setToDo([...todo, inputValue]);
		setInputValue({
			todo:""
		})
  };

  const onChangeHandler = (input) => {
		if (input.target.value.trim() !== ""){
			setInputValue({
				[input.target.name]: input.target.value.trim(),
				id: todo.length,
				completed: false,
			});
		}
  };

	const completedHandler = (id)=>{
	const updateToDo = todo.map((todo)=>{
		if (todo.id===id) {
			return {
				...todo,
				completed:!todo.completed,
			}
		}
		return todo;
	})
	setToDo(updateToDo);
	}

	const deleteHandler = (id)=>{
		const updateToDo = todo.filter((todo)=>todo.id !== id)

		setToDo(updateToDo)
	}

  return (
    <>
      <form action="#" className="flex items-center m-2" onSubmit={submitHandler}>
        <input
          onChange={onChangeHandler}
          name="todo"
          type="text"
          value={inputValue.todo}
          className="w-72 bg-orange-400 p-2 m-1 rounded text-slate-950 font-bold"
        />
        <button
          type="submit"
          className="w-9 h-9 rounded p-2 text-3xl flex justify-center items-center text-slate-100 bg-orange-400"
        >
          <BiMessageAdd />
        </button>
      </form>
			<div className="flex justify-center items-center flex-col">
			{todo.map((todo) => {
        return (
					<div className={`w-72 ${todo.completed ? "bg-green-400" : "bg-slate-500"} flex justify-between items-center m-1 p-2 rounded`}>
            <div className="flex justify-center items-center text-white">{todo.todo}</div>
            <div className="flex justify-center items-center">
							{todo.completed ? <MdDoneAll onClick={()=>{completedHandler(todo.id)}} className="mx-1 text-white text-sm" /> : <MdDone onClick={()=>{completedHandler(todo.id)}} className="mx-1 text-white text-sm" />
							}
              <AiFillEdit className="mx-1 text-white text-sm" />
              <FaTrash onClick={()=>{deleteHandler(todo.id)}} className="mx-1 text-white text-sm" />
            </div>
          </div>
        );
      })}
			</div>
    </>
  );
};

export default Form;
