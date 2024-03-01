import React, { useContext, useState } from 'react';
import styles from "./Signup.module.css";
import userIcon from "../../assets/user.png";
import emailIcon from "../../assets/email.png";
import eye from "../../assets/eye.png";
import lockIcon from "../../assets/lock.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { FRONTEND_URL } from '../../utils/utils';
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
// import 'react-hot-toast/dist/react-hot-toast.css';

import { UserContext } from '../../contexts/UserContext';

function Signup({setIsSignup}) {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  });

  const handleTogglePassword = (fieldName) => {
    if (fieldName === "password") {
      setShowPassword((prevShowPassword) => ({ ...prevShowPassword, password: !prevShowPassword.password }));
    } else if (fieldName === "confirmPassword") {
      setShowPassword((prevShowPassword) => ({ ...prevShowPassword, confirmPassword: !prevShowPassword.confirmPassword }));
    }
  };

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name should be minimum 3 characters long")
      .max(30, "Name should be less than or equal to 30 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password should be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSignup = async (values, { setSubmitting }) => {
    try {
      // console.log("values: ", values);
      setIsLoading(true);
      const response = await axios.post(`${FRONTEND_URL}/users/signup`, values);
      console.log("response: ", response);
      // localStorage.setItem("token", JSON.stringify(response.data.jwtToken));
      toast.success(response.data.message);
      // setIsLoggedIn(true);
      setIsSignup(false)
      // navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (

    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={handleSignup}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className={styles.container}>
            <div className={styles.register_heading}>Register</div>
            <div className={styles.inputContainer}>
              <div className={styles.formitFieldWrapper}>
                <div className={styles.inputWrapper}>
                  <img src={userIcon} alt="User Icon" />
                  <Field type="text" name="name" placeholder="Name" />
                </div>
                <ErrorMessage name="name" component="div" className={styles.error} />
              </div>

              <div className={styles.formitFieldWrapper}>
                <div className={styles.inputWrapper}>
                  <img src={emailIcon} alt="Email Icon" />
                  <Field type="email" name="email" placeholder="Email" />
                </div>
                <ErrorMessage name="email" component="div" className={styles.error} />
              </div>

              <div className={styles.formitFieldWrapper}>
                <div className={styles.inputWrapper}>
                  <img src={lockIcon} alt="Password Icon" />
                  <Field type={showPassword.password ? "text" : "password"} name="password" placeholder="Password" />
                  <img src={eye} alt='eye-icon' className={styles.eyeicon} onClick={() => handleTogglePassword("password")} />
                </div>
                <ErrorMessage name="password" component="div" className={styles.error} />
              </div>

              <div className={styles.formitFieldWrapper}>
                <div className={styles.inputWrapper}>
                  <img src={lockIcon} alt="Confirm Password Icon" />
                  <Field type={showPassword.confirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" />
                  <img src={eye} alt='eye-icon' className={styles.eyeicon} onClick={() => handleTogglePassword("confirmPassword")} />
                </div>
                <ErrorMessage name="confirmPassword" component="div" className={styles.error} />
              </div>
            </div>
            <button type="submit" className={styles.registerButton} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Register"}
            </button>
            <p>Have an account?</p>
          </div>
        </Form>
      )}
    </Formik>

  );
}

export default Signup;
