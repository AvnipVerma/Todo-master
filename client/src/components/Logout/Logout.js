import React from 'react';
import styles from "./Logout.module.css";

const Logout = ({ onClose }) => {
    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
                <div className={styles.heading}>Logout</div>
                <div className={styles.message}>Are you sure you want to logout?</div>
                <div className={styles.buttons}>
                    <button className={styles.confirmButton} onClick={onClose}>Logout</button>
                    <button className={styles.cancelButton} onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default Logout;
