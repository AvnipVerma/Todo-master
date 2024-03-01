import React, { useState, useContext } from 'react';
import emailIcon from "../../assets/email.png";
import eyeIcon from "../../assets/eye.png";
import lockIcon from "../../assets/lock.png";
import styles from "./Login.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik"; // Import Formik components
import * as Yup from "yup"; // Import Yup for validation schema
import { FRONTEND_URL } from '../../utils/utils';
import axios from "axios";
import toast from "react-hot-toast";
import { UserContext } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';


function Login() {
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();
  const { setIsLoggedIn, setLoggedInUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  // Define initial form values
  const initialValues = {
    email: "",
    password: "",
  };

  // Define validation schema using Yup
  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,4}$/, "Invalid email address"
      )
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required"),
  });

  // Handle login form submission
  const handleLogin = async (values) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${FRONTEND_URL}/users/login`, values);
      console.log("login response: ", response);
      localStorage.setItem("token", JSON.stringify(response.data.jwtToken));
      // localStorage.setItem("token", response.data.jwtToken);
      toast.success(response.data.message);
      setLoggedInUser(response.data.user);
      localStorage.setItem("loggedInUser", JSON.stringify(response.data.user));
      // localStorage.setItem("loggedInUser", response.data.user);
      setIsLoggedIn(true);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle password visibility
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginSchema}
      onSubmit={handleLogin}
    >
      <Form>
        <div className={styles.container}>
          <div className={styles.heading}>Login</div>
          <div className={styles.inputGroup}>

            <div className={styles.formitFieldWrapper}>
              <div className={styles.inputWrapper}>
                <img src={emailIcon} alt="Email" className={styles.icon} />
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={styles.input}
                />
              </div>
              <ErrorMessage name="email" component="div" className={styles.error} />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.formitFieldWrapper}>
              <div className={styles.inputWrapper}>
                <img src={lockIcon} alt="Password" className={styles.icon} />
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className={styles.input}
                />
                <img
                  src={eyeIcon}
                  alt="Toggle Password Visibility"
                  className={styles.eyeIcon}
                  onClick={handleTogglePasswordVisibility}
                />
              </div>
              <ErrorMessage name="password" component="div" className={styles.error} />
            </div>
          </div>
          {isLoading ?
            <button type="button" className={styles.loginButton} disabled={true}>Wait...</button> :
            <button type="submit" className={styles.loginButton}>Log in</button>
          }
          <div className={styles.noAccountText}>Have no Account yet?</div>
        </div>
      </Form>
    </Formik>
  );
}

export default Login;
