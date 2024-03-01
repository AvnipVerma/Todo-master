import React, { useContext, useEffect, useState } from "react";
import styles from "./Todo.module.css";
import collapse from "../../assets/collapse.png";
import plus from "../../assets/plus.png";
import toast from "react-hot-toast";
import pink from "../../assets/pink.png";
import green from "../../assets/green.png";
import blue from "../../assets/blue.png";
import Calendar from 'react-calendar';
import remo from "../../assets/remo.png";
import addition from "../../assets/addition.png";
import ToDosubCompo from "../../components/ToDosubCompo/ToDosubCompo";
import dots from "../../assets/dots.png";
import dropdown from "../../assets/dropdown.png";
import CreateTodo from "../CreateTodo/CreateTodo";
import TodoCard from "../TodoCard/TodoCard";

const Todo = ({ setAllTodos, allTodos, className }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [openedChecklists, setOpenedChecklists] = useState([]);

  const onClose = () => {
    setShowConfirmation(false);
  };

  // date: selectedDate.toLocaleDateString(),

  const openConfirmation = () => {
    setShowConfirmation(true);
  };

  const handleStatusClick = (value, todoId) => {
    setAllTodos(prev => prev.map((todo) => todo._id === todoId ? { ...todo, status: value } : todo));
    setOpenedChecklists(prev => prev.filter(id => id !== todoId))
  };

  return (
    <div className={`${styles.Container} ${className}`}>
      <div className={styles.header}>
        <div className={styles.Title}>To-do</div>

        <div className={styles.wrapboth}>
          <div className={styles.plus_box}>
            <div className={styles.sub_container}>
              <div className={styles.asset_box}>
                <button className={styles.plus} onClick={openConfirmation}>
                  <img src={plus} alt="img" className={styles.plus_btn} />
                </button>
              </div>
            </div>
            {showConfirmation && (
              <CreateTodo
                onClose={onClose}
                setAllTodos={setAllTodos} />
            )}
          </div>

          <button className={styles.imageButton} onClick={() => setOpenedChecklists([])}>
            <img src={collapse} alt="Image" className={styles.image} />
          </button>
        </div>
      </div>

      {allTodos?.map(todo => {
        return (
          todo?.status === "TO-DO" &&
          <div className={styles.toDoCardGap} key={todo?._id}>
            <TodoCard
              todo={todo}
              openedChecklists={openedChecklists}
              setOpenedChecklists={setOpenedChecklists}
              allTodos={allTodos}
              setAllTodos={setAllTodos}
              handleStatusClick={handleStatusClick}
            />
          </div>

        );
      })}

    </div>
  );
};

export default Todo;