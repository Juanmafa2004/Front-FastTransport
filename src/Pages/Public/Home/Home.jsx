import React from "react";
import styles from "./Home.style.module.css";
import { LogoTauro } from "@Assets";

const Home = () => {
  return (
    <div className={styles.content}>
      <div>
        <p>
          Template de la arquitectura utilizada para la creación de aplicaciones
        </p>
        <p>por parte de Tauro Dev</p>
      </div>
    </div>
  );
};

export default Home;
