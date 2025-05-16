import React from "react";
import styles from "./Homepage.style.module.css";
import HomepageViewModel from "./Homepage.viewmodel";
import { FastTransportMain } from "@Assets";

const Homepage = () => {
  // const { Increment, count } = HomepageViewModel();
  return (
    <div className=" flex-1 p-5">
      <div className="bg-white rounded-t-[20px] min-h-[93vh] flex flex-col">
        <div className="w-full flex flex-col justify-center items-center mt-3">
          <div className="w-[90%] h-auto flex justify-center items-center  bg-[#cdcdcd]">
            <img
              src={FastTransportMain}
              className="max-w-[30%]  "
              alt="Fast Transport Main"
            />
          </div>
          <div>
            <h1 className="font-bold text-xl mt-3 text-center">
              Fast Transport
            </h1>
            <p className="text-center mt-2 px-4">
              En <strong>Fast Transport</strong> conectamos industrias y
              comercios a través de un servicio de transporte de mercancías
              ágil, seguro y puntual. Movemos tus productos desde los centros de
              distribución hasta el punto de entrega. <br /> <br />
              <em>Tu confianza, nuestro compromiso diario.</em>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
