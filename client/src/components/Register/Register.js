import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./Register.module.css";
import Signup from "../Signup/Signup";
import Login from "../Login/Login";

import Art from "../../assets/Art.png";

function Register() {
    const [isSignup, setIsSignup] = useState(true); // Initial state is Signup

    return (
        <div>
            <div className={styles.container}>

                <div className={styles.left}>
                    <div className={styles.boxy1}>
                        <div className={styles.boxy2}>
                            <div className={styles.imageAndCircle}>
                                <div className={styles.circle}></div>
                                <img src={Art} alt="Circle Image" className={styles.image} />
                            </div>
                        </div>
                        <div className={styles.writing1}>Welcome aboard my friend</div>
                        <div className={styles.writing2}>Just a couple of clicks and we start</div>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.final_btn}>
                        {isSignup ? <Signup setIsSignup={setIsSignup}/> : <Login />}
                    </div>
                    <button
                        className={`${styles.login_btn} ${isSignup ? styles.signupButton : styles.loginButton}`}
                        onClick={() => setIsSignup(!isSignup)} // Toggle isSignup state
                    >
                        {isSignup ? 'Log in' : 'Register'} {/* Change button text dynamically */}
                    </button>

                </div>
            </div>
        </div>
    );
}

export default Register;
