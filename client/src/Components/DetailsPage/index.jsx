import React, { useEffect, useState } from "react";
import style from "./index.module.css";
import LoadingMason from "../../Containers/LoadingCSS";

const DetailsPage = () => {
  const [displayData, setDisplayData] = useState([]);
  const [imageData, setImageData] = useState([]);
  const [errors, setErrors] = useState(false);

  function getCurrentUrlId() {
    const url = window.location.pathname;
    const urlParts = url.split("/");
    const detailsIndex = urlParts.findIndex((part) => part === "details");

    if (detailsIndex !== -1) {
      return urlParts[detailsIndex + 1];
    } else {
      console.warn('URL does not contain "details/"');
      return null;
    }
  }

  const nasa_id = getCurrentUrlId();

  function getSearchApiUrl(id) {
    const baseUrl = import.meta.env.VITE_SEARCHED_DETAILS;
    return baseUrl.replace(":nasa_id", id);
  }

  const PathRender = () => (
    <>
      <div className={style.pathStyle}>
        <p>
          <a href="/" onClick={() => dispatch(updateSearch(""))}>
            Home
          </a>
          {"  "}
          &gt;&gt; {displayData && displayData["AVAIL:Title"]}
        </p>
      </div>
    </>
  );

  const convertUrlsToLinks = (description) => {
    const urlRegex = /(https?:\/\/photojournal\.[^\s]+)/g;
    return description.replace(urlRegex, (url) => {
      return `<a href="${url}" target="_blank"  rel="noopener noreferrer">${url}</a>`;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchURL = await fetch(getSearchApiUrl(nasa_id));
        const metaData = await fetchURL.json();
        const newUrl = await fetch(metaData.location);
        const newData = await newUrl.json();
        const fetchImageUrl = await fetch(
          `https://images-api.nasa.gov/asset/${nasa_id}`
        );
        const imageDataUrl = await fetchImageUrl.json();
        const arrImgData = await imageDataUrl.collection.items;
        const origImageData = await arrImgData.find(
          (image) =>
            image.href.includes("orig.") || image.href.includes("128k.")
        );
        setImageData(origImageData);

        setDisplayData(newData);
      } catch (error) {
        setErrors(true);
      }
    };
    fetchData();
  }, []);

  const RenderData = ({ renderedData }) => {
    const ShowCommonData = () => (
      <>
        <div>
          <h3 style={{ marginTop: "0" }}>
            {displayData && displayData["AVAIL:Title"]}
          </h3>
          <p>
            Date Created:{" "}
            {(displayData && displayData["AVAIL:DateCreated"]) || "Not Found"}
          </p>
          <p>
            Nasa Id:{" "}
            {(displayData && displayData["AVAIL:NASAID"]) || "Not Found"}
          </p>
          {displayData && displayData["AVAIL:Keywords"] && <p>Keyword:</p>}
          <ul className={style.unList}>
            {displayData &&
              displayData["AVAIL:Keywords"] &&
              displayData &&
              displayData["AVAIL:Keywords"].map((keyword) => (
                <li key={keyword} className={style.keyWordList}>
                  {keyword}
                  {displayData &&
                  displayData["AVAIL:Keywords"][
                    displayData && displayData["AVAIL:Keywords"].length - 1
                  ] === keyword
                    ? "."
                    : ","}{" "}
                </li>
              ))}
          </ul>
          <p
            dangerouslySetInnerHTML={{
              __html: `${
                convertUrlsToLinks(
                  displayData && displayData["AVAIL:Description"]
                ) || "Not Found"
              }`,
            }}
          />
          {displayData && displayData["AVAIL:Center"] && (
            <p>Center: {displayData["AVAIL:Center"] || "Not found"}</p>
          )}
          {displayData && displayData["AVAIL:Album"] && (
            <p>Album: {displayData["AVAIL:Album"][0] || "Not found"}</p>
          )}
          {displayData && displayData["AVAIL:Location"] && (
            <p>Location: {displayData["AVAIL:Location"] || "Not found"}</p>
          )}
          {displayData && displayData["AVAIL:Photographer"] && (
            <p>Photographer: {displayData["AVAIL:Photographer" || "Not found"]}</p>
          )}
        </div>
      </>
    );

    return (
      <>
        {renderedData === "image" && (
          <>
            <div className={style.modalContent}>
              <img
                src={imageData.href || "#"}
                alt={displayData && displayData["AVAIL:Title"]}
                className={style.hdImgStyle}
              />
              <ShowCommonData />
            </div>
          </>
        )}
        {renderedData === "video" && (
          <>
            <div className={style.modalContent}>
              <div className={style.videoContainer}>
                <video className={style.hdImgStyle} poster={"#"} controls>
                  <source src={imageData.href || "#"} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <ShowCommonData />
            </div>
          </>
        )}
        {renderedData === "audio" && (
          <>
            <div className={style.modalContent}>
              <audio className={style.audioWidth} controls>
                <source src={imageData.href || "#"} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
              <ShowCommonData />
            </div>
          </>
        )}
      </>
    );
  };

  return (
    <>
      {errors ? (
        <div>Asset not found</div>
      ) : (
        <>
          <PathRender />
          {displayData && displayData.length === 0 && <LoadingMason />}
          <RenderData
            renderedData={displayData && displayData["AVAIL:MediaType"]}
          />
        </>
      )}
    </>
  );
};

export default DetailsPage;
