import React, { useState, useEffect } from "react";
import style from "./index.module.css";
import HeaderModal from "./HeaderModal";
import { useSelector, useDispatch } from "react-redux";
import { updateSearch } from "../../features/data/dataSlice";
import { setMediaType } from "../../features/data/mediaTypeSlice";
import NasaLogo from "../../Containers/Logo";
import Spinner from "../../Containers/Spinner";
import {useNavigate} from 'react-router-dom'

const Header2 = () => {
  const [cardData, setCardData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null); // Store data for modal
  const [searchData, setSearchData] = useState("random");

  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.data.value);
  const mediaTypes = useSelector((state) => state.mediaType.value);
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const api_url = await fetch(import.meta.env.VITE_APOD_API);
      if (!api_url.ok) {
        throw new Error(`Failed to fetch data. Status: ${api_url.status}`);
      }
      const jsonData = await api_url.json();
      // Update cardData with the actual fetched data
      setCardData(jsonData);
    } catch (error) {
      // Set cardData to "FAILED" if an error occurs during the fetch request
      setCardData("FAILED");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (cardData !== null) setModalData(cardData);
  }, [cardData]);

  const openCardModal = (data) => {
    setOpenModal(true);
    setModalData(data); // Store clicked card data
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalData(null); // Reset modal data
  };

  const CheckboxMediaButtons = () => {
    const handleMediaChange = (selectedMediaType) => {
      const selectedMediaTypes = mediaTypes.split(",");
      const index = selectedMediaTypes.indexOf(selectedMediaType);

      if (index !== -1) {
        // Remove the selected media type if already present
        selectedMediaTypes.splice(index, 1);
      } else {
        // Add the selected media type if not present
        selectedMediaTypes.push(selectedMediaType);
      }

      const newMediaType = selectedMediaTypes.join(",");
      dispatch(setMediaType({ mediaType: newMediaType }));
    };

    return (
      <div className={style.mediaType}>
        <label>
          <input
            type="checkbox"
            value="image"
            checked={mediaTypes.includes("image")}
            onChange={() => handleMediaChange("image")}
          />
          Image
        </label>

        <label>
          <input
            type="checkbox"
            value="video"
            checked={mediaTypes.includes("video")}
            onChange={() => handleMediaChange("video")}
          />
          Video
        </label>

        <label>
          <input
            type="checkbox"
            value="audio"
            checked={mediaTypes.includes("audio")}
            onChange={() => handleMediaChange("audio")}
          />
          Audio
        </label>
      </div>
    );
  };

  const RenderLogoInfo = () => (
    <div className={style.nasaLogo}>
      <div>
        <NasaLogo />
      </div>
      <div>NASA Image and Video Library</div>
    </div>
  );

  return (
    <>
      <header className={`${style.header} ${style.headerBackground}`}>
        <div>
          <div className={style.searchBar}>
            <div className={style.searchGlow}>
              <input
                type="text"
                id="searchInput"
                onChange={(e) => setSearchData(e.target.value)}
                defaultValue={searchValue}
                placeholder="Search..."
                className={style.searchInput}
                onKeyDown={(e) => {
                  if (e.key === "Enter") dispatch(updateSearch(searchData));
                }}
              />
              <button
                onClick={() => {navigate('/'); dispatch(updateSearch(searchData))}}
                style={{ width: "25%" }}
                className={style.searchButton}
                aria-label="Search"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  width="24"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className={style.headerContent}>
            <button
              onClick={() => openCardModal(cardData)}
              className={style.mediaType}
              disabled={cardData && cardData.length === 0}
            >
              {
                cardData && cardData.length === 0 ? ("Loading ...") : ("Picture of the day")
              }
            </button>
            <CheckboxMediaButtons />
          </div>
        </div>
        <HeaderModal
          isOpen={openModal}
          data={modalData} // Use stored modal data
          onClose={handleCloseModal}
          appElement={document.getElementById("root")}
        />
      </header>
    </>
  );
};

export default Header2;
