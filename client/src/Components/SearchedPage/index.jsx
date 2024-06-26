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
        <p>
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
        {totalHits > 0 && (
          <p>
            Displaying page {pageNo} of {Math.ceil(totalHits / 100)}
          </p>
        )}
      </>
    );
  };

  useEffect(() => {setPageNo(1)}, [searchValue])

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

    function getSearchApiUrl(pageNo, mediaType, searchValue) {
      const baseUrl = import.meta.env.VITE_SEARCHED_DATA;
      return baseUrl
        .replace(':pageNo', pageNo)
        .replace(':mediaType', mediaType)
        .replace(':searchValue', searchValue);
    }

    return (
      <>
        <div>
          <div className={style.pageAndPathDetails}>
            <PathRender />
            <CurrentPageRender />
          </div>
          <MasonLayout
            url={getSearchApiUrl(pageNo, mediaType, searchValue)}
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
