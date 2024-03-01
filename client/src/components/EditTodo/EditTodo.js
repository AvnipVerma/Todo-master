import React, { useEffect, useState } from "react";
import Calendar from 'react-calendar';
import pink from "../../assets/pink.png";
import green from "../../assets/green.png";
import blue from "../../assets/blue.png";
import remo from "../../assets/remo.png";
import addition from "../../assets/addition.png";
import styles from './EditTodo.module.scss';
import { BackgroundBlur } from "../basic-components/BackgroundBlur";
import Moment from 'react-moment';
import { v4 as uuid } from "uuid";
import axios from 'axios';


import 'react-calendar/dist/Calendar.css';
import toast from "react-hot-toast";
import { FRONTEND_URL } from "../../utils/utils";

const EditTodo = ({ onClose, setAllTodos, todoId }) => {
    const [todo, setTodo] = useState({
        title: "",
        priority: "",
        checklist: [],
        dueDate: "",
    });
    const [openCalendar, setOpenCalendar] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getEditTodo();
    }, []);

    const getEditTodo = async () => {
        try {
            setIsLoading(true)
            const token = JSON.parse(localStorage.getItem('token'));
            // console.log("token: ", token);
            const response = await axios.get(`${FRONTEND_URL}/todo/getTodo/${todoId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                }
            );
            console.log("response: ", response);

            toast.success(response?.data?.message);
            setTodo(response?.data?.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDateChange = (date) => {
        const currentDate = new Date();
        // console.log("aaaaaaa", date)
        if (date > currentDate) {
            todo.dueDate = date.toUTCString();
        }

        setOpenCalendar(false);
    };

    const handleAddNewTask = () => {
        const newTask = {
            _id: uuid(),
            isCompleted: false,
            description: "",
        };

        const checklist = todo.checklist;
        checklist.push(newTask);

        setTodo(prev => ({ ...prev, checklist: checklist }));

    };

    const handleDeleteTaskBtn = (taskId) => {
        let checklist = todo.checklist;
        checklist = checklist?.filter(task => task._id != taskId);
        setTodo(prev => ({ ...prev, checklist: checklist }));
    };

    const handleChange = (e, taskId = null) => {
        const { name, value } = e.target;
        // console.log(name, value, 111111111);

        if (name === "title") {
            setTodo(prev => ({ ...prev, title: value }));
        }
        else {
            let checklist = todo.checklist;
            let currentTask = checklist?.find(task => task._id === taskId);

            if (name === "isCompleted") {
                currentTask[name] = !currentTask.isCompleted;
            } else if (name === "description") {
                currentTask[name] = value;
            }

            checklist = checklist.map(task => task._id === taskId ? currentTask : task);
            setTodo({ ...todo, checklist: checklist });
        }
    };

    const handlePriorityClick = (value) => {
        if (todo.priority !== value)
            setTodo({ ...todo, priority: value });
    };

    const handleSave = async () => {
        try {
            const token = JSON.parse(localStorage.getItem('token'));
            // console.log("token: ", token);
            const response = await axios.post(`${FRONTEND_URL}/todo/updateTodo`, todo,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                }
            );
            console.log("response: ", response);
            if (response?.data?.success) {
                setAllTodos(prev => [...prev, response?.data?.data]);
                toast.success(response?.data?.message);
            }
            onClose();
        } catch (error) {
            toast.error(error?.response?.data?.message);
            console.error(error);
        }
    };

    console.log("todo: ", todo);

    if(isLoading) return (
        <BackgroundBlur>
            <div className={styles.editTodoContainer}>
                Loading...
            </div>
        </BackgroundBlur>
    )

    return (
        <>
            <BackgroundBlur>
                <div className={styles.editTodoContainer}>
                    <div className={styles.header}>
                        <div className={styles.titleStarInline}>
                            <h2>Title</h2>
                            <span className={styles.redStar}>*</span>
                        </div>
                        <input
                            name="title"
                            type="text"
                            placeholder="Enter Task Title"
                            value={todo.title}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>

                    <div className={styles.priorityContainer}>
                        <div className={styles.titleStarInline}>
                            <h2 className={styles.heading}>Select Priority</h2>
                            <span className={styles.redStar}>*</span>
                        </div>
                        <button onClick={() => handlePriorityClick("high")} style={{ background: todo.priority === "high" ? "#EEECEC" : "" }}>
                            <img src={pink} alt="Pink" />
                            <h4>HIGH PRIORITY</h4>
                        </button>
                        <button onClick={() => handlePriorityClick("moderate")} style={{ background: todo.priority === "moderate" ? "#EEECEC" : "" }}>
                            <img src={blue} alt="Pink" />
                            <h4>MODERATE PRIORITY</h4>
                        </button>
                        <button onClick={() => handlePriorityClick("low")} style={{ background: todo.priority === "low" ? "#EEECEC" : "" }}>
                            <img src={green} alt="Pink" />
                            <h4>LOW PRIORITY</h4>
                        </button>
                    </div>

                    <div className={styles.checklistContainer}>
                        <div className={styles.checklistTaskWrapper}>
                            <div className={styles.titleStarInline}>
                                <h2>Checklist</h2>
                                <span className={styles.star2}>*</span>
                            </div>
                            <div className={styles.tasksContainer}>
                                {todo.checklist?.map((task, index) => {
                                    return (
                                        <div className={styles.task} key={index}>
                                            <div className={styles.checkboxInputContainer}>
                                                <input
                                                    name="isCompleted"
                                                    type="checkbox"
                                                    checked={task.isCompleted}
                                                    className={styles.checkbox}
                                                    onChange={(e) => handleChange(e, task._id)}
                                                />
                                                <input
                                                    name="description"
                                                    type="text"
                                                    placeholder="Task to be done"
                                                    className={styles.taskInput}
                                                    value={task.description}
                                                    onChange={(e) => handleChange(e, task._id)}
                                                />
                                            </div>
                                            <button className={styles.deleteBtn} onClick={() => handleDeleteTaskBtn(task._id)}>
                                                <img src={remo} alt="delete task button" />
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <button className={styles.addTaskBtn} onClick={() => handleAddNewTask()}>
                            <img src={addition} alt="addition" />
                            <h3> Add New</h3>
                        </button>
                    </div>

                    <div className={styles.footer}>
                        <button className={styles.dueDate} onClick={() => setOpenCalendar(true)}>
                            {todo.dueDate ? <Moment format="DD/MM/YYYY">{todo.dueDate}</Moment> : "Select Due Date"}
                        </button>
                        <div className={styles.saveAndCancel}>
                            <button className={styles.cancel} onClick={onClose}>Cancel</button>
                            <button className={styles.save} onClick={() => handleSave()}>Update</button>
                        </div>
                    </div>
                    {openCalendar &&
                        <BackgroundBlur>
                            <div className={styles.calendarWrapper}>
                                <Calendar
                                    onChange={(date) => handleDateChange(date)}
                                    value={todo.dueDate}
                                />
                            </div>
                        </BackgroundBlur>
                    }
                </div>
            </BackgroundBlur>
        </>
    );
};

export default EditTodo;