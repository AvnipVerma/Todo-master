import React, { useEffect, useState } from 'react';
import styles from "./Analytics.module.css";
import codesandbox from "../../assets/codesandbox.png";
import database from "../../assets/database.png";
import layout from "../../assets/layout.png";
import logoutImg from "../../assets/Logout.png";
import settings from "../../assets/settings.png";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import axios from 'axios';
import { FRONTEND_URL } from '../../utils/utils';

const Analytics = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    getAnalytics();
  }, []);

  const getAnalytics = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      const response = await axios.get(`${FRONTEND_URL}/todo/getAnalytics`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      );
      // console.log("response getAlltodos: ", response);
      let allTodos = response?.data?.data;
      let analyticData;
      if (allTodos)
        analyticData = getAnalyticsData(allTodos);

      setData(analyticData);
    } catch (error) {
      console.error(error);
    }
  };

  const getAnalyticsData = (todos) => {
    try {
      const obj = {
        backlog: 0,
        todo: 0,
        inProgress: 0,
        completed: 0,
        low: 0,
        moderate: 0,
        high: 0,
        dueDate: 0
      };

      todos.forEach(todo => {
        if (todo?.status === "BACKLOG") obj.backlog++;
        if (todo?.status === "TO-DO") obj.todo++;
        if (todo?.status === "PROGRESS") obj.inProgress++;
        if (todo?.status === "DONE") obj.completed++;
        if (todo?.priority === 'low') obj.low++;
        if (todo?.priority === 'high') obj.high++;
        if (todo?.priority === 'moderate') obj.moderate++;
        if (todo?.dueDate) obj.dueDate++;
      });

      return obj;
    } catch (error) {
      console.error(error);
    }
  };

  console.log("data: ", data);


  return (
    <div className={styles.container}>

      <Navbar />

      <div className={styles.right}>
        <div className={styles.analytics}>Analytics</div>
        <div className={styles.boxContainer}>
          <div className={styles.box}>
            <div className={styles.circleContainer}>

              <div className={styles.fieldWrapper}>
                <div className={styles.circle}>
                  <div className={styles.smallCircle}></div>
                  <div className={styles.circleText}>Backlog Tasks</div>
                </div>
                <span>{data?.backlog}</span>
              </div>
              <div className={styles.fieldWrapper}>
                <div className={styles.circle}>
                  <div className={styles.smallCircle}></div>
                  <div className={styles.circleText}>To-do Tasks</div>
                </div>
                <span>{data?.todo}</span>
              </div>
              <div className={styles.fieldWrapper}>
                <div className={styles.circle}>
                  <div className={styles.smallCircle}></div>
                  <div className={styles.circleText}>In-Progress Tasks</div>
                </div>
                <span>{data?.inProgress}</span>
              </div>
              <div className={styles.fieldWrapper}>
                <div className={styles.circle}>
                  <div className={styles.smallCircle}></div>
                  <div className={styles.circleText}>Completed Tasks</div>
                </div>
                <span>{data?.completed}</span>
              </div>

            </div>
          </div>

          <div className={styles.box}>
            <div className={styles.circleContainer}>

              <div className={styles.fieldWrapper}>
                <div className={styles.circle}>
                  <div className={styles.smallCircle}></div>
                  <div className={styles.circleText}>Low Priority</div>
                </div>
                <span>{data?.low}</span>
              </div>
              <div className={styles.fieldWrapper}>
                <div className={styles.circle}>
                  <div className={styles.smallCircle}></div>
                  <div className={styles.circleText}>Moderate Priority</div>
                </div>
                <span>{data?.moderate}</span>
              </div>
              <div className={styles.fieldWrapper}>
                <div className={styles.circle}>
                  <div className={styles.smallCircle}></div>
                  <div className={styles.circleText}>High Priority</div>
                </div>
                <span>{data?.high}</span>
              </div>
              <div className={styles.fieldWrapper}>
                <div className={styles.circle}>
                  <div className={styles.smallCircle}></div>
                  <div className={styles.circleText}>Due Date Tasks</div>
                </div>
                <span>{data?.dueDate}</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Analytics;
