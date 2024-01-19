import React from "react";
import MultiRangeSlider from "../../Containers/Slider/index";
import MasonLayout from "../MasonryLayout";
import style from "./index.module.css";

const RenderAside = () => {
  return (
    <>
      <aside>
        <div className={style.asideDimensions}>
          <p className={style.infoText}>Narrow by year</p>
          <div className={style.rangeSlider}>
            <MultiRangeSlider
              min={1920}
              max={2024}
              onChange={({ min, max }) =>
                console.log(`min = ${min}, max = ${max}`)
              }
            />
          </div>
        </div>
      </aside>
    </>
  );
};
const Test = () => {
  return (
    <>
    {/* <MultiRangeSlider
              min={1920}
              max={2024}
              onChange={({ min, max }) =>
                console.log(`min = ${min}, max = ${max}`)
              }
            /> */}
      <div className={style.searchedPage}>
        <RenderAside />
        <MasonLayout
          url={
            "https://images-api.nasa.gov/search?q=earth&media_type=image,video,audio"
          }
        />
      </div>
    </>
  );
};

export default Test;
