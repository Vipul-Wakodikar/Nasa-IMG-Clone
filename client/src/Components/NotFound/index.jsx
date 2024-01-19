import React from "react";
import reactLogo from "../../assets/NotFound.png";
import style from "./index.module.css";

const NotFound = () => {
  return (
    <>
      {/* <div
        className={style.imagePosition}
      >
        <div className={style.skimOverlay} />
        <img
          src={reactLogo}
          style={{
            objectFit: "cover",
            width: "90vw",
            height: "90vh",
            overflow: "hidden",
          }}
        />
        <div className={style.notFoundText}>
          <h1>404 Not Found</h1>
        </div>
        <div className={style.notFoundText}>
        <p>The cosmic object you were looking for has disappeared beyond the event horizon.</p>
        </div>
      </div> */}
      <section>
        <div>
          <div className={style.skimOverlay} />
          <img
            className={style.mediaBackground}
            src="https://www.nasa.gov/wp-content/themes/nasa/assets/images/404-bg.jpg"
            alt="404"
          ></img>
          <div className={style.notFoundText} style={{ position: "absolute" }}>
            <h1>404 Not Found</h1>
          </div>
          <div className={style.notFoundText} style={{ position: "absolute" }}>
            <p>
              The cosmic object you were looking for has disappeared beyond the
              event horizon.
            </p>
          </div>
          <div className={style.notFoundText}><p>
              The cosmic object you were looking for has disappeared beyond the
              event horizon.
            </p></div>
            <div className={style.notFoundText}><p>
              The cosmic object you were looking for has disappeared beyond the
              event horizon.
            </p></div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
