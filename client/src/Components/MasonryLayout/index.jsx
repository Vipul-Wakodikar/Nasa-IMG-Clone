import React, { useEffect, useState } from "react";
import { addImageHeight } from "../../utils/utils";
import PhotoAlbum from "react-photo-album";
import Modal from "./PreviewModal";
import style from "./index.module.css";
import { useSelector } from "react-redux";
import AudioRender from "./AudioRender";
import notFound from "../../assets/Image404NotFound.jpg";

const MasonLayout = ({ url, popular }) => {
  const [recentData, setRecentData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [noResults, setNoResults] = useState(false);

  const mediaType = useSelector((state) => state.mediaType.value);
  const searchValue = useSelector((state) => state.data.value);

  const openCardModal = (data) => {
    setOpenModal(true);
    if (data !== modalData) {
      setModalData(data); // Update only if the data is different
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalData(null); // Reset modal data
  };

  const fetchData = async () => {
    const recent = await fetch(url);
    const recentJson = await recent.json();
    setRecentData(recentJson);
  };

  useEffect(() => {
    fetchData();
    setNoResults(false);
  }, [url, mediaType, searchValue]);

  function filterNonImageData() {
    // get the items array from the recentData object, or use an empty array if it is undefined
    const itemsArray = recentData?.collection?.items || [];

    if (recentData?.collection?.metadata?.total_hits === 0) {
      setNoResults(true);
    } else {
      setNoResults(false);
    }
    // filter the items array by removing the elements that have the same href value as their links[0].href value
    const hrefArray = itemsArray.map((item) => ({
      ...item,
      src:
        item.data[0].media_type === "audio"
          ? "https://images.nasa.gov/images/search_audio-icon.png?as=webp"
          : item.links[0].href || notFound,
    }));
    return hrefArray;
  }

  useEffect(() => {
    addImageHeight(filterNonImageData())
      .then((newArray) => {
        setDisplayData(newArray);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [recentData, url]);

  return (
    <>
      {noResults ? (
        <h1 className={style.noResults}>
          Based on your selections, no results were found.
        </h1>
      ) : (
        <>
          <PhotoAlbum
            layout="masonry"
            photos={displayData}
            renderPhoto={({ photo, wrapperStyle, renderDefaultPhoto }) => {
              return (
                <>
                  {photo.data[0].media_type !== "audio" ? (
                    <button
                      className={`${style.cardButtonStyle} ${
                        photo.src === "hide" && style.hideButton
                      }`}
                      onClick={() => {
                        if (
                          JSON.stringify(modalData) !== JSON.stringify(photo)
                        ) {
                          openCardModal(photo || null);
                        }
                      }}
                      style={popular ? {display: "none"} : wrapperStyle}
                    >
                      {/* {renderDefaultPhoto({ wrapped: true })} */}
                      {photo.data[0].media_type === "video" && (
                        <div
                          className={
                            photo.data[0].media_type === "video" &&
                            style.vidOverlay
                          }
                          style={wrapperStyle}
                        />
                      )}
                      {photo.src && (
                        <img
                          src={photo.src}
                          alt={photo.data[0].title || "Error"}
                          style={wrapperStyle}
                        />
                      )}
                    </button>
                  ) : (
                    <>
                      {((searchValue === "" && mediaType === "image") ||
                        mediaType.includes("audio")) && (
                        <AudioRender
                          photo={photo}
                          wrapperStyle={wrapperStyle}
                          keyId={photo.data[0].nasa_id}
                        />
                      )}
                    </>
                  )}
                </>
              );
            }}
          />
          {openModal && modalData && !mediaType.includes("audio") && (
            <Modal
              isOpen={openModal}
              data={modalData}
              onClose={handleCloseModal}
              appElement={document.getElementById("root")}
            />
          )}
        </>
      )}
    </>
  );
};

export default MasonLayout;
