import React, { useContext, useEffect, useState } from "react";
import styles from "./DashboardLeft.module.css";
import Backlog from "../Backlog/Backlog";
import Todo from "../Todo/Todo";
import Done from "../Done/Done";
import Inprogress from "../../components/Inprogress/Inprogress";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { UserContext } from "../../contexts/UserContext";
import { FRONTEND_URL } from "../../utils/utils";
import axios from "axios";

function DashboardLeft() {

  const [selectedOption, setSelectedOption] = useState('thisWeek');
  const currentDateTime = getCurrentDateTime();
  const [allTodos, setAllTodos] = useState([]); //store filtered todos
  const [allInitialTodos, setAllInitialTodos] = useState([]); //store all initial todos at time of fetching todos
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { isLoggedIn, loggedInUser } = useContext(UserContext);

  // console.log("dashboard user: ", user);
  console.log("allTodos: ", allTodos);

  useEffect(() => {
    getLoggedInUserFromLocalStorage();
    getAllTodos();
  }, []);

  useEffect(() => {
    handleFilterFetch();
  }, [selectedOption]);

  const handleFilterFetch = async () => {
    const updatedTodos = await getAllTodosForFilter();
    // let filteredTodos = getFilteredTodos(allInitialTodos);
    let filteredTodos = getFilteredTodos(updatedTodos);
    setAllTodos(filteredTodos);
  };

  const getLoggedInUserFromLocalStorage = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    setUser(loggedInUser);
  };

  const getAllTodos = async () => {
    try {
      setIsLoading(true);
      const token = JSON.parse(localStorage.getItem('token'));
      const response = await axios.get(`${FRONTEND_URL}/todo/getTodos`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      );
      // console.log("response getAlltodos: ", response);
      let allTodos = response?.data?.data;
      // setAllInitialTodos(allTodos);
      let filteredTodos = getFilteredTodos(allTodos);
      setAllTodos(filteredTodos);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getAllTodosForFilter = async () => {
    try {
      setIsLoading(true);
      const token = JSON.parse(localStorage.getItem('token'));
      const response = await axios.get(`${FRONTEND_URL}/todo/getTodos`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      );
      // console.log("response getAlltodos: ", response);
      let allTodos = response?.data?.data;

      return allTodos;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  function getCurrentDateTime() {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.toLocaleString('default', { month: 'short' });
    const year = currentDate.getFullYear();
    let daySuffix;
    if (day >= 11 && day <= 13) {
      daySuffix = 'th';
    } else {
      switch (day % 10) {
        case 1:
          daySuffix = 'st';
          break;
        case 2:
          daySuffix = 'nd';
          break;
        case 3:
          daySuffix = 'rd';
          break;
        default:
          daySuffix = 'th';
          break;
      }
    }
    return `${day}${daySuffix} ${month}, ${year}`;
  }

  const handleFilterSelect = (option) => {
    setSelectedOption(option);
  };

  const getFilteredTodos = (allTodos) => {
    try {
      let filteredTodos = [];
      if (selectedOption === "thisWeek") {
        filteredTodos = allTodos.filter(todo => {
          if (todo?.dueDate === "") return true;
          else if (isThisWeekTodo(todo?.createdAt)) return true;
          // else if (isThisWeekDueDate(todo?.createdAt)) return true;
          else return false;
        });
      }
      else if (selectedOption === "today") {
        filteredTodos = allTodos.filter(todo => {
          if (todo?.dueDate === "") return true;
          else if (isTodayTodo(todo?.createdAt)) return true;
          // else if (isTodayDueDate(todo?.createdAt)) return true;
          else return false;
        });
      }
      else if (selectedOption === "thisMonth") {
        filteredTodos = allTodos.filter(todo => {
          if (todo?.dueDate === "") return true;
          else if (isThisMonthTodo(todo?.createdAt)) return true;
          // else if (isThisMonthDueDate(todo?.createdAt)) return true;
          else return false;
        });
      }

      return filteredTodos;
    } catch (error) {
      console.error(error);
    }
  };

  const isTodayTodo = (dueDate) => {
    let parsedDueDate = new Date(dueDate);
    let currentDate = new Date();
    let past24HoursDate = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);
    if (parsedDueDate > past24HoursDate && parsedDueDate <= currentDate) {
      return true;
    }
    return false;
  };

  const isThisWeekTodo = (dueDate) => {
    let parsedDueDate = new Date(dueDate);
    let currentDate = new Date();
    let pastWeekDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    if (parsedDueDate > pastWeekDate && parsedDueDate <= currentDate) {
      return true;
    }
    return false;
  };

  const isThisMonthTodo = (dueDate) => {
    let parsedDueDate = new Date(dueDate);
    let currentDate = new Date();
    let pastMonthDate = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);
    if (parsedDueDate > pastMonthDate && parsedDueDate <= currentDate) {
      return true;
    }
    return false;
  };

  const isTodayDueDate = (dueDate) => {
    let parsedDueDate = new Date(dueDate);
    let currentDate = new Date();
    let next24HoursDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
    if (parsedDueDate < next24HoursDate && parsedDueDate >= currentDate) {
      return true;
    }
    return false;
  };

  const isThisWeekDueDate = (dueDate) => {
    let parsedDueDate = new Date(dueDate);
    let currentDate = new Date();
    let nextWeekDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    if (parsedDueDate <= nextWeekDate && parsedDueDate >= currentDate) {
      return true;
    }
    return false;
  };

  const isThisMonthDueDate = (dueDate) => {
    let parsedDueDate = new Date(dueDate);
    let currentDate = new Date();
    let nextMonthDate = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000);
    if (parsedDueDate <= nextMonthDate && parsedDueDate >= currentDate) {
      return true;
    }
    return false;
  };

  if (isLoading) return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.right}>Loading...</div>
    </div>
  );

  return (
    <div className={styles.container}>

      <Navbar />

      <div className={styles.right}>
        <div className={styles.row_1}>
          <div className={styles.col_1}>


            <div className={styles.heading}>Welcome! {user?.name} </div>
            <div className={styles.heading2}>Board</div>
          </div>

          <div>

            <div className={styles.col_2}>
              <div className={styles.date}>{currentDateTime}</div>

              <div className={`${styles.filterDropdown} ${styles.dropdown}`}>
                <select value={selectedOption} onChange={(e) => handleFilterSelect(e.target.value)}>
                  <option value="today">&nbsp;&nbsp;Today&nbsp;&nbsp;</option>
                  <option value="thisWeek">&nbsp;&nbsp;This Week&nbsp;&nbsp;</option>
                  <option value="thisMonth">&nbsp;&nbsp;This Month&nbsp;&nbsp;</option>
                </select>
              </div>

            </div>

          </div>

        </div>
        <div className={styles.scrollWrapper}>
          <div className={styles.row_2}>

            <div className={styles.scrolling}>
              <Backlog
                className={styles.childWidth}
                setAllTodos={setAllTodos}
                allTodos={allTodos}
              />
              <Todo
                className={styles.childWidth}
                setAllTodos={setAllTodos}
                allTodos={allTodos}
              />
              <Inprogress
                className={styles.childWidth}
                setAllTodos={setAllTodos}
                allTodos={allTodos}
              />
              <Done
                className={styles.childWidth}
                setAllTodos={setAllTodos}
                allTodos={allTodos}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardLeft;
