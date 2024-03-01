import React, { useEffect, useState } from "react";
import Pink from '../../assets/pink.png';
import Green from '../../assets/green.png';
import Blue from '../../assets/blue.png';
import DropUp from '../../assets/dropUp.png';
import DropDown from '../../assets/dropdown.png';
import { BackgroundBlur } from "../basic-components/BackgroundBlur";
import axios from "axios";
import { FRONTEND_URL } from "../../utils/utils";
import toast from "react-hot-toast";
import EditTodo from "../EditTodo/EditTodo";
import styles from './PublicPage.module.scss';
import { BsThreeDots } from "react-icons/bs";
import Moment from "react-moment";
import OutsideClickHandler from "../basic-components/OutsideClick";
import { useParams } from "react-router-dom";
import codesandbox from "../../assets/codesandbox.png";


const PublicPage = () => {
  const [todo, setTodo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    if (id)
      fetchTodo();
  }, [id]);

  const fetchTodo = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${FRONTEND_URL}/todo/getTodo/${id}`);
      console.log("response: ", response);

      toast.success(response?.data?.message);
      if (response?.data?.data)
        setTodo(response?.data?.data);
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const isDatePassed = (dueDate) => {
    dueDate = new Date(dueDate);
    let currentDate = new Date();
    console.log("dueDate: ", dueDate, "currentDate: ", currentDate);
    if (dueDate > currentDate) {
      return false;
    }
    return true;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!todo) {
    return <div>NO DATA</div>;
  }

  return (
    <>
      <div className={styles.todoCardContainer}>
        <div className={styles.header}>
          <img src={codesandbox} alt="app logo img" />
          <h1>Pro Manage</h1>
        </div>
        <div className={styles.todoSectionContainer}>
          <div className={styles.todoSectionWrapper}>
            <div className={styles.colorAndPriority}>
              {todo?.priority === "low" ?
                <>
                  <img src={Green} alt="green dot" />
                  <span>LOW PRIORITY</span>
                </> :
                todo?.priority === "moderate" ?
                  <>
                    <img src={Blue} alt="blue dot" />
                    <span>MODERATE PRIORITY</span>
                  </> :
                  <>
                    <img src={Pink} alt="high dot" />
                    <span>HIGH PRIORITY</span>
                  </>
              }
            </div>


            <h1>{todo?.title}</h1>

            <div className={styles.checklistSectionContainer}>
              <div className={styles.checklistHeader}>
                <h4>Checklist ({todo?.checklist?.length ? `${todo?.checklist?.filter(task => task?.isCompleted)?.length}/${todo?.checklist?.length}` : 0 / 0})</h4>
              </div>

              <div className={styles.tasksContainer}>
                {todo?.checklist?.map((task, index) => {
                  return (
                    <div className={styles.task} key={index}>
                      <div className={styles.checkboxInputContainer}>
                        <input
                          name="isCompleted"
                          type="checkbox"
                          checked={task?.isCompleted}
                          className={styles.checkbox}
                          disabled={true}
                        />
                        <p className={styles.taskInput}>{task?.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {
              todo?.dueDate &&
              <div className={styles.footer}>
                <span>Due Date</span>
                <button className={`${styles.date} ${styles.dateRedBackground}`}><Moment format="MMM Do">{todo?.dueDate}</Moment></button>
              </div>
            }

          </div>
        </div>
      </div>
    </>
  );
};

export default PublicPage;