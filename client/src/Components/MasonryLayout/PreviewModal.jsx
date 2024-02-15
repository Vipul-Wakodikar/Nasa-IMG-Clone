import React, { useEffect, useState } from "react";
import style from "./index.module.css";
import ReactModal from "react-modal";

const customStyles = {
  content: {
    backgroundColor: "#26282f",
    color: "white",
  },
};

const PreviewModal = ({ isOpen, data, onClose, appElement, key }) => {
  const [vidData, setVidData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      if (data && data.href) {
        const vidData = await fetch(data.href);
        const vidJson = await vidData.json();
        const previewMP4 = vidJson.find(
          (element) =>
            element.includes("orig.mp4") || element.includes("preview.mp4")
        );
        setVidData(previewMP4);
      }
    };
    fetchData();
  }, [data, data.href]); // Update only when data changes
  if (!isOpen) return null;

  const convertUrlsToLinks = (description) => {
    const urlRegex = /(https?:\/\/photojournal\.[^\s]+)/g;
    return description.replace(urlRegex, (url) => {
      return `<a href="${url}" target="_blank"  rel="noopener noreferrer">${url}</a>`;
    });
  };

  const DisplayData = () => (
    <>
      <div key={data.data[0].nasa_id}>
        <h3 style={{marginTop: "0"}}>{data.data[0].title}</h3>
        <p>Date Created: {data.data[0].date_created || "Not Found"}</p>
        <p>Nasa Id: {data.data[0].nasa_id || "Not Found"}</p>
        {data.data[0].keywords && <p>Keyword:</p>}
        <ul className={style.unList}>
          {data.data[0].keywords &&
            data.data[0].keywords.map((keyword) => (
              <li key={keyword} className={style.keyWordList}>
                {keyword}
                {data.data[0].keywords[data.data[0].keywords.length - 1] ===
                keyword
                  ? "."
                  : ","}{" "}
              </li> // Use keyword as unique key for keyword divs
            ))}
        </ul>
        <p
          dangerouslySetInnerHTML={{
            __html: `${convertUrlsToLinks(data.data[0].description) || "Not Found"}`,
          }}
        />
        {data.data[0].center && <p>Center: {data.data[0].center}</p>}
        {data.data[0].album && <p>Albums: {data.data[0].album}</p>}
        {data.data[0].location && <p>Location: {data.data[0].location}</p>}
        {data.data[0].photographer && <p>Photographer: {data.data[0].photographer}</p>}
      </div>
    </>
  );

  const RenderVideoData = () => (
    <>
      {vidData && (
        <div>
          <div className={style.videoContainer}>
            <video
              className={style.hdImgStyle}
              poster={data.links[0].href || "#"}
              controls
            >
              <source src={vidData} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <DisplayData />
        </div>
      )}
    </>
  );

  const RenderImageData = () => (
    <>
      {data && !vidData && (
        <>
          <div key={data.data[0].nasa_id} className={style.modalContent}>
            <img
              src={data.links[0].href || "#"}
              alt={data.data[0].title}
              className={style.hdImgStyle}
            />
            <DisplayData />
          </div>
        </>
      )}
    </>
  );

  return (
    <ReactModal
      isOpen={isOpen}
      appElement={appElement}
      key={key}
      style={customStyles}
    >
      <div className={style.closeButtonPosition}>
        <button onClick={onClose} className={style.closeButton}>X</button>
      </div>
      <RenderVideoData />
      <RenderImageData />
    </ReactModal>
  );
};

export default PreviewModal;
