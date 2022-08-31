import React from "react";
import styles from "./Input.module.css";

const Input = ({
  label,
  value,
  type = "text",
  name,
  className = "",
  onChange = () => {},
  onBlur = () => {},
}) => {
  return (
    <>
      <div>
        <label>{label}</label>
        <div className={styles["margin-y"]}>
          <input
            className={`${className} ${styles.input}`}
            type={type}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
          />
        </div>
      </div>
    </>
  );
};

export default Input;
