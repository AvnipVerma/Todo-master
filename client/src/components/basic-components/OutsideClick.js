import React, { useEffect, useRef } from "react";

export default function OutsideClickHandler({ children, handleClose }) {
    const wrapperRef = useRef(null);
  
    function handleClickOutside(event) {
      // console.log("event: ", event)
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target) &&
        handleClose
      )
        handleClose();
    }

    // console.log("wrapperRef: ", wrapperRef)
  
    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [wrapperRef]);
  
    return <div className="" ref={wrapperRef}>{children}</div>;
  }