import React from "react";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";

const TodoList = ({todos, setTodos, CompletedTodos, setCompletedTodos}) => {
    return (
        <div className="container">
            <Droppable droppableId="TodosList">
                {(provided, snapshot) => (
                    <div 
                        className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <span className="todos__heading">Active Tasks</span>
                        {
                            todos.length > 0 && todos.map((todo, index) => {
                                return <SingleTodo 
                                    index={index} 
                                    todos={todos} 
                                    todo={todo}
                                    key={todo.id}
                                    setTodos={setTodos}
                                />
                            })
                        }
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <Droppable droppableId="TodosRemove">
                {(provided, snapshot) => (
                    <div 
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`todos ${snapshot.isDraggingOver ? "dragcomplete" : "remove" }`}
                    >
                        <span className="todos__heading">Completed Task</span>
                        {CompletedTodos.length >0 && CompletedTodos.map((todo, index) => (
                           <SingleTodo 
                            index={index}
                            todos={CompletedTodos}
                            todo={todo}
                            key={todo.id}
                            setTodos={setCompletedTodos}
                           />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}
export default TodoList;
