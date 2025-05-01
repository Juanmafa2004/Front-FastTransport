import React from "react";
import styles from "./Register.style.module.css";
import RegisterViewModel from "./Register.viewmodel";

const Register = () => {
  const { Increment, count } = RegisterViewModel();
  return (
    <div className={styles.content}>
      <h1>Página Register creada por @tauro/cli</h1>
      <button className={styles.button} onClick={Increment}>
        Número actual: {count}
      </button>
    </div>
  );
};

export default Register;
