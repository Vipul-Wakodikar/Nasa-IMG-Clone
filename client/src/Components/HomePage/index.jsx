import React, { Suspense, useState } from "react";
const MasonLayout = React.lazy(() => import("../MasonryLayout"));
import style from "./index.module.css";
import Spinner from "../../Containers/Spinner";

const HomePage = () => {
  const [isPopular, setIsPopular] = useState(false);

  const TrendingButtons = () => (
    <div className={style.buttonContainer}>
      <button
        onClick={() => setIsPopular(false)}
        className={!isPopular ? style.activeButton : ""}
      >
        Newest Uploads
      </button>
      <button
        onClick={() => setIsPopular(true)}
        className={isPopular ? style.activeButton : ""}
      >
        Trending & Popular
      </button>
    </div>
  );

  return (
    <>
      <TrendingButtons />
      <Suspense fallback={<Spinner />}>
        <MasonLayout
          url={import.meta.env.VITE_APOD_POPULAR}
          popular={!isPopular}
        />
        <MasonLayout
          url={import.meta.env.VITE_APOD_RECENT}
          popular={isPopular}
        />
      </Suspense>
    </>
  );
};

export default HomePage;
