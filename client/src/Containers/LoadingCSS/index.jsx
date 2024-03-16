import React from "react";
import style from "./index.module.css";

const LoadingMason = () => {
  return (
    <div className={style.centerLoader}>
      <div className={style.loader}>
        <div className={style.box1} />
        <div className={style.box2} />
        <div className={style.box3} />
      </div>
    </div>
  );
};

export default LoadingMason;
