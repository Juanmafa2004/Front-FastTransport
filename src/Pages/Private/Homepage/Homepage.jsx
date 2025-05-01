import React from "react";
import styles from "./Homepage.style.module.css";
import HomepageViewModel from "./Homepage.viewmodel";

const Homepage = () => {
  const { Increment, count } = HomepageViewModel();
  return (
    <div className={styles.content}>
      <h1>Página Homepage creada por @tauro/cli</h1>
      <button className={styles.button} onClick={Increment}>
        Número actual: {count}
      </button>
    </div>
  );
};

export default Homepage;
