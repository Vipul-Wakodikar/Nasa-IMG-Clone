import React, { useState, useEffect } from "react";
import style from "./index.module.css";
import { useSelector, useDispatch } from "react-redux";
import { updateSearch } from "../../features/data/dataSlice";
import MasonLayout from "../MasonryLayout";
import MultiRangeSlider from "../../Containers/Slider";

const SearchedPage = () => {
  const [pageNo, setPageNo] = useState(1);
  const searchValue = useSelector((state) => state.data.value);
  const mediaType = useSelector((state) => state.mediaType.value);
  const totalHits = useSelector((state) => state.data.totalHits);
  const dispatch = useDispatch();

  const PathRender = () => (
    <>
      <div className={style.pathStyle}>
        <p style={{ color: "white", fontSize: "22px" }}>
          <a href="/" onClick={() => dispatch(updateSearch(""))}>
            Home
          </a>
          {"  "}
          &gt;&gt; {searchValue}
        </p>
      </div>
    </>
  );

  const CurrentPageRender = () => {
    useEffect(() => {
      if (pageNo > Math.ceil(totalHits / 100)) setPageNo(1);
    }, [pageNo, totalHits]);

    return (
      <>
        {totalHits && (
          <p style={{ color: "white", fontSize: "20px" }}>
            Displaying page {pageNo} of {Math.ceil(totalHits / 100)}
          </p>
        )}
      </>
    );
  };

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

  const RenderMasonLayout = () => {
    return (
      <>
        <div>
          <div style={{ marginLeft: "10%" }}>
            <PathRender />
            <CurrentPageRender />
          </div>
          <MasonLayout
            url={`https://images-api.nasa.gov/search?q=${searchValue}&page=${pageNo}&media_type=${mediaType}`}
          />
        </div>
      </>
    );
  };

  const PageNavigator = () => {
    totalHits === 0 && setPageNo(1);
    return (
      <>
        <div className={style.resultsPagination}>
          {pageNo > 1 && (
            <>
              <div className={`${style.alignCenter} ${style.pageRightAlign}`}>
                <button
                  className={style.paginationPrev}
                  onClick={() => setPageNo((prevState) => prevState - 1)}
                />
                <p className={style.paginationText}>Previous</p>
              </div>
            </>
          )}

          {pageNo < Math.ceil(totalHits / 100) && (
            <>
              <div className={`${style.alignCenter} ${style.pageLeftAlign}`}>
                <p className={style.paginationText}>Next</p>
                <button
                  onClick={() => setPageNo((prevState) => prevState + 1)}
                  className={style.paginationNext}
                />
              </div>
            </>
          )}
        </div>
        <div className={style.alignCenter}>
          <button
            className={style.backTop}
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
          >
            Navigate to top
          </button>
        </div>
      </>
    );
  };

  return (
    <>
      {/* <div className={style.searchedPage}>
        <RenderAside />
        <RenderMasonLayout />
      </div> */}
      <RenderMasonLayout />
      <PageNavigator />
    </>
  );
};

export default SearchedPage;
