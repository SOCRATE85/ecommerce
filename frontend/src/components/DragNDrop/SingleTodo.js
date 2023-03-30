import React, {useEffect, useState, useRef} from "react";
import { Edit, Delete, Done } from '@mui/icons-material';
import {Draggable} from 'react-beautiful-dnd';

const SingleTodo = ({index, todo, todos, setTodos}) => {
    const [edit, setEdit] = useState(false);
    const [editTodo, setEditTodo] = useState(todo.todo);

    const inputRef = useRef();
    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);

    const handleEdit = (e, id) => {
        e.preventDefault();
        setTodos(
            todos.map((todo) => (todo.id === id) ? {...todo, todo: editTodo}: todo)
        );
        setEdit(false);
    }

    const handleDone = (id) => {
        setTodos(
            todos.map((todo) => {
                return todo.id === id ? { ...todo, isDone: !todo.isDone} : todo;
            })
        );
    }

    const handleDelete = (id) => {
        setTodos(todos.filter((todo)=>todo.id !== id));
    }

    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {(provided, snapshot) => (
                <form
                    onSubmit={(e) => handleEdit(e, todo.id)}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
                >
                    {
                        edit ? (
                            <>
                              <input 
                                type={"text"}
                                value={editTodo}
                                onChange={(e) => setEditTodo(e.target.value)}
                                className="todos__single--text"
                                ref={inputRef}
                              />
                            </>
                        ) : <>{
                            todo.isDone ? 
                            <s className="todos__single--text">1{todo.todo}2</s> 
                            : <span className="todos__single--text">{todo.todo}</span>
                        }</>
                    }
                    <div>
                        <span className="icon" onClick={() => {
                            if(!edit && !todo.isDone) {
                                setEdit(!edit);
                            }
                            }
                        }
                        >
                            <Edit/>
                        </span>
                        <span className="icon" onClick={() => handleDelete(todo.id)}>
                            <Delete />
                        </span>
                        <span className="icon" onClick={() => handleDone(todo.id)}>
                            <Done />
                        </span>
                    </div>
                </form>
            )}
        </Draggable>
    );
}
export default SingleTodo;
