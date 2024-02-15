import React from "react";
import style from "./index.module.css";
import ReactModal from "react-modal";
import notFound from "../../assets/Image404NotFound.jpg";
import Spinner from "../../Containers/Spinner";

const customStyles = {
  content: {
    backgroundColor: '#26282f',
    color: 'white',
  },
};

const HeaderModal = ({ isOpen, data, onClose, appElement }) => {
  if (!isOpen) return null;
  return (
    <ReactModal isOpen={isOpen} appElement={appElement} style={customStyles}>
      <div className={style.closeButtonPosition}>
        <button onClick={onClose} className={style.closeButton}>X</button>
      </div>
      <div className={style.modalContent}>
        {data ? (
          <>
            <div>
              <img src={data.hdurl || notFound} alt={data.title} className={style.hdImgStyle} loading="lazy" />
            </div>
            <div>
              <h3>{data.title}</h3>
              <p>Date Created: {data.date || "Not Found"}</p>
              <p>Description: {data.explanation || "Not Found"}</p>
              <p>Copy right: {data.copyright || "Not Available"}</p>
            </div>
          </>
        ) : (<Spinner />)}
      </div>
    </ReactModal>
  );
};

export default HeaderModal;
