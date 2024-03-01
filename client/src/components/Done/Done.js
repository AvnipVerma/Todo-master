import React, { useState } from "react";
import styles from "./Done.module.css";
import collapse from "../../assets/collapse.png";
import TodoCard from "../TodoCard/TodoCard";

const Done = ({ setAllTodos, allTodos, className }) => {
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
        <div className={styles.Title}>Done</div>
        <button className={styles.imageButton} onClick={() => setOpenedChecklists([])}>
          <img src={collapse} alt="Image" className={styles.image} />
        </button>
      </div>
      <div className={styles.content}>
        {/* Content goes here */}
      </div>

      {allTodos?.map(todo => {
        return (
          todo?.status === "DONE" &&
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

export default Done;
