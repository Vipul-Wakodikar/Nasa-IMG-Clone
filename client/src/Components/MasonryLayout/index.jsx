import React, { useEffect, useState } from "react";
import { addImageHeight } from "../../utils/utils";
import PhotoAlbum from "react-photo-album";
import Modal from "./PreviewModal";
import style from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import AudioRender from "./AudioRender";
import notFound from "../../assets/Image404NotFound.jpg";
import { updateTotalHits } from "../../features/data/dataSlice";
import Spinner from "../../Containers/Spinner";
import LoadingMason from "../../Containers/LoadingCSS";

const MasonLayout = ({ url, popular, hideLoader }) => {
  const [recentData, setRecentData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [noResults, setNoResults] = useState(false);
  const [errors, setError] = useState();
  
  const mediaType = useSelector((state) => state.mediaType.value);
  const searchValue = useSelector((state) => state.data.value);
  const dispatch = useDispatch();

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
    try {
      const recent = await fetch(url);
      if (!recent.ok) {
        setError(`Failed to fetch data. Status: ${recent.status}`);
        throw new Error(`Failed to fetch data. Status: ${recent.status}`);
      }
      const recentJson = await recent.json();
      setRecentData(recentJson);
    } catch (error) {
      setError(error);
    }
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
      src: item.data[0].media_type.includes("audio")
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
    const newDatas = recentData?.collection?.metadata?.total_hits;
    newDatas && dispatch(updateTotalHits(newDatas));
    noResults && dispatch(updateTotalHits(0));
  }, [recentData, url, noResults]);

  const filterHideSrc = displayData.filter((display) => display.src !== "hide");

  const RenderPhotoAlbum = () => {
    
    const AdjustColums = () => {
      if (window.innerWidth > 992) return 4;
      else if (window.innerWidth < 992 && window.innerWidth > 479) return 3;
      else return 2;
    };

    return (
      <>
        {errors ? (
          <>{errors}</>
        ) : (
          <>
            <PhotoAlbum
              layout="masonry"
              photos={filterHideSrc}
              columns={AdjustColums}
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
                        style={popular ? { display: "none" } : wrapperStyle}
                      >
                        {/* {renderDefaultPhoto({ wrapped: true })} */}
                        {photo.data[0].media_type.includes("video") && (
                          <div
                            className={
                              photo.data[0].media_type.includes("video") &&
                              style.vidOverlay
                            }
                            style={wrapperStyle}
                          />
                        )}
                        {photo.src && (
                          <img
                            src={photo.src}
                            alt={photo.data[0].title || "Error"}
                            style={{
                              ...wrapperStyle,
                              marginBottom: "12px !important",
                            }}
                            loading="lazy"
                          />
                        )}
                      </button>
                    ) : (
                      <>
                        {((searchValue === "" && mediaType === "image") ||
                          mediaType.includes("audio")) && (
                          <AudioRender
                            photo={photo}
                            wrapperStyle={{
                              ...wrapperStyle,
                              marginBottom: "12px !important",
                            }}
                            keyId={photo.data[0].nasa_id}
                          />
                        )}
                      </>
                    )}
                  </>
                );
              }}
            />
            {openModal && modalData && (
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

  return (
    <>
      {filterHideSrc.length === 0 && !noResults && !hideLoader ? (
        <>
          {/* <Spinner /> */}
          <LoadingMason />
        </>
      ) : noResults ? (
        <h1 className={style.noResults}>
          Based on your selections, no results were found.
        </h1>
      ) : (
        <>
          <div className={style.masonMargin}>
            <RenderPhotoAlbum />
          </div>
        </>
      )}
    </>
  );
};

export default MasonLayout;
