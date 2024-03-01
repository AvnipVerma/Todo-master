import React, { useEffect, useState } from 'react';
import userIcon from "../../assets/user.png";
import lock from "../../assets/lock.png";
import eye from "../../assets/eye.png";
import styles from "./Settings.module.css";
import codesandbox from "../../assets/codesandbox.png";
import database from "../../assets/database.png";
import layout from "../../assets/layout.png";
import logoutImg from "../../assets/Logout.png";
import settings from "../../assets/settings.png";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import toast from 'react-hot-toast';
import axios from 'axios';
import { FRONTEND_URL } from '../../utils/utils';

function Settings() {
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false
  });
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [name, setName] = useState("");
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getLoggedInUserFromLocalStorage();
  }, []);

  const getLoggedInUserFromLocalStorage = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      setName(loggedInUser?.name);
      setUser(loggedInUser);
    }
  };

  const handleTogglePassword = (fieldName) => {
    if (fieldName === "old-password") {
      setShowPassword((prevShowPassword) => ({ ...prevShowPassword, oldPassword: !prevShowPassword.oldPassword }));
    } else if (fieldName === "new-password") {
      setShowPassword((prevShowPassword) => ({ ...prevShowPassword, newPassword: !prevShowPassword.newPassword }));
    }
  };

  const handleUpdate = async () => {
    try {
      // if (oldPassword.trim() !== "" && newPassword.trim() !== "") 
      setIsLoading(true);
      const response = await axios.post(`${FRONTEND_URL}/users/updatePassword`, { ...user, oldPassword: oldPassword, newPassword: newPassword });
      console.log("login response: ", response);
      if (response.data.success) {
        localStorage.removeItem("token");
        localStorage.removeItem("loggedInUser");
        toast.success("Logged out!");
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (

    <div className={styles.container}>

      <Navbar />


      <div className={styles.right}>
        <div className={styles.heading}>Settings</div>

        <div className={styles.rectangularBox}>
          <img src={userIcon} alt="User Icon" className={styles.icon} />
          <input type="text" value={name} placeholder="Name" className={styles.input}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={styles.rectangularBox}>
          <img src={lock} alt="Lock Icon" className={styles.icon} />
          <input
            type={showPassword.oldPassword ? "text" : "password"}
            placeholder="Old Password"
            className={styles.input}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <button className={styles.eyeButton} onClick={() => handleTogglePassword("old-password")}>
            <img src={eye} alt="Eye Icon" className={styles.eyeIcon} />
          </button>
        </div>

        <div className={styles.rectangularBox}>
          <img src={lock} alt="Lock Icon" className={styles.icon} />
          <input
            type={showPassword.newPassword ? "text" : "password"}
            placeholder="New Password"
            className={styles.input}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button className={styles.eyeButton} onClick={() => handleTogglePassword("new-password")}>
            <img src={eye} alt="Eye Icon" className={styles.eyeIcon} />
          </button>
        </div>

        <button className={styles.updateButton} disabled={isLoading} onClick={handleUpdate}>{isLoading ? "wait" : "UPDATE"}</button>
      </div>
    </div>
  );
}

export default Settings;
