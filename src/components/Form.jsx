import React, { useCallback } from "react";
import { useState } from "react";
import { BiMessageAdd } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { MdDone, MdDoneAll, MdOutlineUpdate } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";

const Form = () => {
  const [inputValue, setInputValue] = useState({
    todo: "",
  });

	const [updateTodoValue,setUpdateTodoValue] = useState({
		todo:"",
	})

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
				edit:false,
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

	const editTodoHandler = (id) =>{
		const updateToDo = todo.map((todo)=>{
			if (todo.id===id) {
				return {
					...todo,
					edit:true,
				}
			}
			return todo;
		})
		setToDo(updateToDo);
	}

	const updateValueHandler = (input)=>{
		if (input.target.value.trim() !== ""){
			setUpdateTodoValue({
				todo: input.target.value.trim(),
			});
		}
	}

	const updateValue = (id) =>{
		console.log(updateTodoValue);
		const updateToDo = todo.map((todo)=>{
			if (todo.id===id) {
				return {
					...todo,
					todo: updateTodoValue.todo,
					edit:false,
				}
			}
			return todo;
		})
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
					placeholder="Enter ToDo..."
          className="w-72 bg-orange-400 p-2 m-1 rounded text-slate-200 font-bold placeholder-slate-50"
        />
        <button
          type="submit"
          className="w-10 h-10 rounded p-2 text-xl flex justify-center items-center text-slate-100 bg-orange-400 hover:bg-orange-500 hover:text-2xl transition-all duration-300"
        >
          <BiMessageAdd />
        </button>
      </form>
			<div className="flex justify-center items-center flex-col">
			{todo.map((todo) => {
        return (
					<div key={todo.id} className={`w-72 ${todo.completed ? "bg-green-400" : "bg-slate-500"} flex justify-between items-center m-1 p-2 rounded`}>
            <div className="flex justify-center items-center text-white">{todo.todo}</div>
            <div className="flex justify-center items-center">
							{todo.completed ? <MdDoneAll onClick={()=>{completedHandler(todo.id)}} className="mx-1 text-white text-sm" /> : <MdDone onClick={()=>{completedHandler(todo.id)}} className="mx-1 text-white text-sm" />
							}
							<FaTrash onClick={()=>{deleteHandler(todo.id)}} className="mx-1 text-white text-sm" />
              <AiFillEdit onClick={()=>{editTodoHandler(todo.id)}} className="mx-1 text-white text-sm"/> {todo.edit?<>
								<input
								onChange={updateValueHandler}
								name="updateTodoValue"
								type="text"
								value={updateTodoValue.todo}
								placeholder="Update ToDo..."
								className="w-36 bg-orange-400 p-2 m-1 rounded text-slate-200 text-sm font-bold placeholder-slate-50"
							/><button 
							onClick={()=>{updateValue(todo.id)}}
							className="w-9 h-9 rounded p-2 text-xl flex justify-center items-center text-slate-100 bg-orange-400 hover:bg-orange-500 hover:text-2xl transition-all duration-300"
						>
							<MdOutlineUpdate />
						</button>
						</>
								:null}
            </div>
          </div>
        );
      })}
			</div>
    </>
  );
};

export default Form;