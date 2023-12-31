import React, { useState } from "react";
import MasonLayout from "../MasonryLayout";
import style from "./index.module.css";

const HomePage = () => {
  const [isPopular, setIsPopular] = useState(false);

  const TrendingButtons = () => (
    <div className={style.buttonContainer}>
      <button
        onClick={() => setIsPopular(false)}
        className={!isPopular && style.activeButton}
        autoFocus
      >
        Newest Uploads
      </button>
      <button
        onClick={() => setIsPopular(true)}
        className={isPopular && style.activeButton}
      >
        Trending & Popular
      </button>
    </div>
  );

  return (
    <>
      <TrendingButtons />
      {/* {isPopular ? (
        <MasonLayout url="https://images-assets.nasa.gov/popular.json" />
      ) : (
        <>
          <MasonLayout url="https://images-assets.nasa.gov/recent.json" />
        </>
      )} */}
      <MasonLayout url="https://images-assets.nasa.gov/popular.json" popular = {isPopular} />
      <MasonLayout url="https://images-assets.nasa.gov/recent.json" popular = {!isPopular} />
    </>
  );
};

export default HomePage;
