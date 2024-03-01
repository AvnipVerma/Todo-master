import React, { useContext, useState } from "react";
import database from "../../assets/database.png";
import layout from "../../assets/layout.png";
import logoutImg from "../../assets/Logout.png";
import settings from "../../assets/settings.png";
import codesandbox from "../../assets/codesandbox.png";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import toast from "react-hot-toast";


function Navbar() {
    const [showConfirmation, setShowConfirmation] = useState(false);

    const { setIsLoggedIn } = useContext(UserContext);

    const loc = useLocation();
    const [selectedItem, setSelectedItem] = useState(loc.pathname.replace("/", ""));  //to get route from url in search bar and set initial value so that selected nav item have background style

    const navigate = useNavigate();

    // console.log("selectedItem: ", selectedItem);

    const handleMenuClick = (value) => {
        if (value === "dashboard") {
            setSelectedItem(value);
            navigate("/dashboard");
        } else if (value === "analytics") {
            setSelectedItem(value);
            navigate("/analytics");
        } else if (value === "settings") {
            setSelectedItem(value);
            navigate("/settings");
        }
    };

    const handleLogout = () => {

        setShowConfirmation(true);

    };

    const handleConfirmYes = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("loggedInUser");
        setIsLoggedIn(false);
        navigate('/');
        toast.success("Logged out!");
        setShowConfirmation(false);
    };

    const handleConfirmNo = () => {

        setShowConfirmation(false);

    };


    return (
        <div className={styles.left}>
            <div className={styles.upper_box}>
                <div className={styles.first_container}>
                    <div className={styles.asset_box}>
                        <img src={codesandbox} alt="Pro Manage Logo" className={styles.image}
                        />
                    </div>
                    <div className={styles.nav_title1}>Pro Manage</div>
                </div>
                <div className={styles.second_container}>
                    <div className={`${styles.sub_container} ${selectedItem === "dashboard" ? "navBold" : "navNormal"}`} onClick={(e) => handleMenuClick("dashboard")} >
                        <div className={styles.asset_box}>
                            <img
                                src={layout}
                                alt="Pro Manage Logo"
                                className={styles.image}
                            />
                        </div>
                        <button className={`${styles.settings_nav} ${selectedItem === "dashboard" ? "navBold" : "navNormal"}`} >Board</button>
                    </div>

                    <div className={`${styles.sub_container} ${selectedItem === "analytics" ? "navBold" : "navNormal"}`} onClick={(e) => handleMenuClick("analytics")}>
                        <div className={styles.asset_box}>
                            <img
                                src={database}
                                alt="Pro Manage Logo"
                                className={styles.image}
                            />
                        </div>
                        <button className={`${styles.settings_nav} ${selectedItem === "analytics" ? "navBold" : "navNormal"}`} >Analytics</button>
                    </div>

                    <div className={`${styles.sub_container} ${selectedItem === "settings" ? "navBold" : "navNormal"}`} onClick={(e) => handleMenuClick("settings")}>
                        <div className={styles.asset_box}>
                            <img
                                src={settings}
                                alt="Pro Manage Logo"
                                className={styles.image}
                            />
                        </div>
                        <button className={`${styles.settings_nav} ${selectedItem === "settings" ? "navBold" : "navNormal"}`}>Settings</button>
                    </div>
                </div>
            </div>
            <div className={styles.lower_box}>
                <div className={styles.sub_container}>
                    <div className={styles.asset_box}>
                        <img src={logoutImg} alt="Pro Manage Logo" className={styles.image69} />
                    </div>
                    <button className={styles.nav_text} onClick={handleLogout}>Logout</button>
                </div>
                {showConfirmation && (
                    <div className={styles.confirmation}>
                        <div className={styles.background}>
                            <div className={styles.head1}>Are you sure you want to Logout?</div>
                            <button className={styles.btn11} onClick={handleConfirmYes}>Yes, Logout</button>
                            <button className={styles.btn12} onClick={handleConfirmNo}>Cancel</button>
                        </div>
                    </div>
                )}
            </div>

        </div>



    );
}

export default Navbar;