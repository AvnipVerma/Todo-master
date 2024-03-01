import React, { useContext, useEffect, useState } from "react";
import styles from "./Backlog.module.css";
import collapse from "../../assets/collapse.png";
import TodoCard from "../TodoCard/TodoCard";

const Backlog = ({ setAllTodos, allTodos, className }) => {
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
    <div className={`${styles.backlogContainer} ${className}`}>
      <div className={styles.header}>
        <div className={styles.backlogTitle}>Backlog</div>

        <button className={styles.imageButton} onClick={() => setOpenedChecklists([])}>
          <img src={collapse} alt="Image" className={styles.image} />
        </button>
      </div>

      <div className={styles.content}>
      </div>

      {allTodos?.map(todo => {
        return (
          todo?.status === "BACKLOG" &&
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

export default Backlog;
