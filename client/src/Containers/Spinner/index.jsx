import React from "react";
import style from "./index.module.css";
import Loadinger from "../../assets/Loading.webp";

const Spinner = () => {
  return (
    <>
      <div className={style.loadingGif}>
        <img src={Loadinger} alt="Loading..." width={100} height={100} />
      </div>
    </>
  );
};

export default Spinner;
