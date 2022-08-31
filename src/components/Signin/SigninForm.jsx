import React from "react";
import styles from "./style.module.css";
import Input from "../../ui/Input";
import useInput from "../../hooks/useInput";

const SignInForm = ({
  setUserEmail,
  setUserPassword,
  loadUsers,
  userExist,
}) => {
  const {
    value: email,
    hasError: emailHasError,
    isValid: emailIsValid,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput((value) => value.trim().includes("@"));
  const {
    value: password,
    hasError: passwordHasError,
    isValid: passwordIsValid,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = emailIsValid && passwordIsValid;

  const submitHandler = (e) => {
    e.preventDefault();
    loadUsers();
    resetEmail();
    resetPassword();
  };
  return (
    <div className={styles["outer-form"]}>
      <form className={styles.form} onSubmit={submitHandler}>
        <h2 className={styles["form-head"]}>Sign In</h2>
        <Input
          label="Email"
          name="email"
          value={email}
          onChange={(e) => {
            setUserEmail(e.target.value);
            emailChangeHandler(e);
          }}
          onBlur={emailBlurHandler}
          className={emailHasError === true ? styles.invalid : ""}
        />
        <span
          className={
            emailHasError === true ? styles["not-valid"] : styles.valid
          }
        >
          Enter a valid email.
        </span>
        <Input
          label="Password"
          name="password"
          value={password}
          type="password"
          onChange={(e) => {
            setUserPassword(e.target.value);
            passwordChangeHandler(e);
          }}
          onBlur={passwordBlurHandler}
          className={passwordHasError === true ? styles.invalid : ""}
        />
        <span
          className={
            passwordHasError === true ? styles["not-valid"] : styles.valid
          }
        >
          Enter a valid password.
        </span>
        <div>
          <button
            className={styles.button}
            disabled={formIsValid === false ? true : false}
          >
            Sign In
          </button>
        </div>

        <span
          className={
            formIsValid === false ? styles["form-valid"] : styles.valid
          }
        >
          Enter details to Login.
        </span>
        {userExist.length === 0 && <span>User not found!</span>}
      </form>
    </div>
  );
};

export default SignInForm;
