import React from "react";
import styles from './BasicComponents.module.scss'
import OutsideClickHandler from "./OutsideClick";

export const BackgroundBlur = ({children}) => {
    return (
      <div className={styles.blurBackground}>
        {/* <OutsideClickHandler> */}
        {children}
        {/* </OutsideClickHandler> */}
      </div>
    )
}