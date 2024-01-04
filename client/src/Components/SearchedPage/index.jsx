import React from "react";
import style from "./index.module.css";
import { useSelector, useDispatch } from "react-redux";
import { updateSearch } from "../../features/data/dataSlice";
import MasonLayout from "../MasonryLayout";

const SearchedPage = () => {

  const searchValue = useSelector((state) => state.data.value);
  const mediaType = useSelector((state) => state.mediaType.value);
  const dispatch = useDispatch();

  const PathRender = () => (
    <>
      <div className={style.rootCardContainer}>
        <p style={{ color: "white" }}>
          <a href="/" onClick={() => dispatch(updateSearch(""))}>Home</a> &gt;&gt; {searchValue}
        </p>
      </div>
    </>
  );

  return (
    <>
      <PathRender />
      <MasonLayout url={`https://images-api.nasa.gov/search?q=${searchValue}&media_type=${mediaType}`} />
    </>
  );
};

export default SearchedPage;
